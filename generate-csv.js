import dotenv from 'dotenv'
import generateCodes from "./lib/generate-codes.js"
import writeCsv from "./lib/write-csv.js"
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'

dotenv.config()

const { QUANTITY, CODE_LENGTH } = process.env

if( QUANTITY && CODE_LENGTH) {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)
    const resultsFile = join(__dirname, 'results', `codes-${Date.now()}.csv`)
    const codes = generateCodes(QUANTITY, CODE_LENGTH)

    writeCsv(codes, resultsFile)
    process.stdout.write(`Generated ${codes.length} codes and saved them to ${resultsFile}\r\n\r\n`)
} else
    console.error('Missing QUANTITY and/or CODE_LENGTH. Check environment variables')