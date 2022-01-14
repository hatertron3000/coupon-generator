import fs from 'fs'


export default function writeCsv(codes, resultsFile) {
    fs.open(resultsFile, 'w', (err, file) => {
        if(err) {
            console.error(err)
            return
        }

        let csv = 'code\r\n'
        codes.forEach(code => {
            csv += `${code}\r\n`
        })

        fs.writeFileSync(resultsFile, csv)
        return
    })
}