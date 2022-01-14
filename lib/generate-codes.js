const makeCode = (length, codes) => {
    var result           = ''
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    var charactersLength = characters.length
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    // Do not return duplicate codes
    if (codes.includes(result))
        return makeCode(length, codes)

    return result
}

export default function generateCodes(quantity, length) {     
    const codes = []

    for (let i = 0; i < quantity; i++) {
        const code = makeCode(length, codes)
        codes.push(code)
    }

    return codes
}


