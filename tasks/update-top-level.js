// @ts-check
const {get} = require('https');
const {writeFile} = require('fs');
const path = require('path');
const {TextDecoder} = require('util');

const textdecoder = new TextDecoder();
get('https://data.iana.org/TLD/tlds-alpha-by-domain.txt', (res) => {
    /**
     * @type Buffer[];
     */
    const chunks = [];
    res.on('data', (chunk) => chunks.push(chunk));
    res.on('end', () => {
        let rawText = textdecoder.decode(Buffer.concat(chunks));
        const rawData = rawText.trim().split('\n');
        const updateMessage = `// ${rawData.shift()}`;
        rawText = `/\\.(?:${rawData.join('|')})$/i`;
        const data = `// Based on http://data.iana.org/TLD/tlds-alpha-by-domain.txt\n\n${updateMessage}\nexport default ${rawText};\n`;
        writeFile(path.join(process.cwd(), 'src/regexp-top-level-domain.ts'), data, {encoding: 'utf8'}, (err) => {
            err && console.warn(err);
        });
    });

}).on('error', (error) => console.error('Error: ' + error.message));
