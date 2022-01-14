import dotenv from 'dotenv'
import BigCommerce from "node-bigcommerce"
import readline from 'readline'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
import writeCsv from './lib/write-csv.js'
import generateCodes from './lib/generate-codes.js'

dotenv.config()

function writeProgress(n, total) {
    readline.cursorTo(process.stdout, 0)
    process.stdout.write(`Created ${n} of ${total} codes...`)
}

async function generateCoupons(codes) {
    try {
        const { 
            API_TOKEN,
            STORE_HASH,
            PROMOTION_ID
        } = process.env

        const CLIENT_ID = '' // No longer required by BC

        if( !API_TOKEN || !STORE_HASH || !QUANTITY || !PROMOTION_ID ) {
            console.error(`Missing one of the following, check the environment variables: API_TOKEN, STORE_HASH, QUANTITY, PROMOTION_ID`)
            return
        }

        const bigCommerce = new BigCommerce({
            clientId: CLIENT_ID,
            accessToken: API_TOKEN,
            storeHash: STORE_HASH,
            apiVersion: 'v3'
        })

        const __filename = fileURLToPath(import.meta.url)
        const __dirname = dirname(__filename)
        const couponsFile = join(__dirname, 'results', `coupons-${Date.now()}.csv`)
        
        const promotionRes = await bigCommerce.get(`/promotions/${PROMOTION_ID}`)
        
        if (!promotionRes.data) {
            console.error(`No promotion retrieved from BigCommerce. Check the PROMOTION_ID environment variable`)
            return
        }

        if (promotionRes.data.redemption_type !== "COUPON") {
            console.error(`Promotion is not a coupon. Ensure the promotion with id ${PROMOTION_ID} in store ${STORE_HASH} is a coupon promotion.`)
            return
        }

        const couponCodes = []
        let i = 1

        for (const code of codes) {
            const codeRes = await bigCommerce.post(`/promotions/${PROMOTION_ID}/codes`, {
                "code": code,
                "max_uses": 1,
                "max_uses_per_customer": 1
            })

            if (!codeRes.data || !codeRes.data.id ) {
                console.error(`Error generating a coupon with the code ${code}`)
                return
            }

            couponCodes.push(code)

            writeCsv(couponCodes, couponsFile)
            writeProgress(i, QUANTITY)
            i++
        }
        process.stdout.write(`\r\nComplete!\r\nCoupon codes written to ${couponsFile}\r\n\r\n`)
    } catch (err) {
        console.error(err)
        return
    }
}

const { 
    QUANTITY,
    CODE_LENGTH
} = process.env

if( QUANTITY && QUANTITY > 0
 && CODE_LENGTH && CODE_LENGTH >= 6 && CODE_LENGTH <= 50 ) {
    generateCoupons(generateCodes(QUANTITY, CODE_LENGTH))
    }
else (console.error('Missing or invalid QUANTITY and/or CODE_LENGTH. Check environment variables. CODE_LENGTH must be at least 6 and at most 50.'))