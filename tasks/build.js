const bundleJS = require('./bundle-js');
const typeCheck = require('./type-check');

async function main() {
    const isRelease = process.argv.splice(2).includes('--release');
    await typeCheck();
    await bundleJS({release: isRelease});
}

main();
