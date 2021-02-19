const {build} = require('esbuild');



async function main() {
    await build({
        entryPoints: ['src/cors-anywhere-iframe.ts'],
        bundle: true,
        charset: 'utf8',
        banner: '"use strict"',
        platform: 'node',
        outfile: 'cors-anywhere-iframe.js',
        external: ['http-proxy','proxy-from-env']
    })
}

main();