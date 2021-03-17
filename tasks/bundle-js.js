// @ts-check
const {build} = require('esbuild');

async function bundleJS({release}) {
    await build({
        entryPoints: ['src/cors-anywhere-iframe.ts'],
        bundle: true,
        charset: 'utf8',
        banner: {js: '"use strict";'},
        platform: 'node',
        outfile: 'dist/cors-anywhere-iframe.js',
        external: ['http-proxy'],
        minifySyntax: release,
    });
}

module.exports = bundleJS;
