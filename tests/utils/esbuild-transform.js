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
            target: 'es2020',
            banner: '"use strict";',
            minifySyntax: true,
        });
        return {
            code: result.code,
            map: ''
        };
    }
};
