// @ts-check
const {transformSync} = require('esbuild');

module.exports = {
    /**
     * @param {string} content Typescript code to be transformed
     */
    process(content) {
        const result = transformSync(content, {
            loader: 'ts',
            format: 'cjs',
            target: 'es2019',
            sourcemap: 'external',
            banner: '"use strict";',
        });
        return {
            code: result.code,
            map: result.map ? {
                ...JSON.parse(result.map),
                sourcesContent: null,
            } : ''
        };
    }
};
