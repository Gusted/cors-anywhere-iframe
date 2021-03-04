//@ts-check
const {build} = require('esbuild');

async function bundleJS({release}) {
    await build({
        entryPoints: ['src/cors-anywhere-iframe.ts'],
        bundle: true,
        charset: 'utf8',
        banner: '"use strict";',
        platform: 'node',
        outfile: 'dist/cors-anywhere-iframe.js',
        external: ['http-proxy', 'proxy-from-env'],
        minifySyntax: release,
    });
}

module.exports = bundleJS;
