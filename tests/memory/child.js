const http = require('http');
const httpProxy = require('http-proxy');
const cors_anywhere = require('../../dist/cors-anywhere-iframe');
// When this module is loaded, CORS Anywhere is started.
// Then, a request is generated to warm up the server (just in case).
// Then the base URL of CORS Anywhere is sent to the parent process.
// ...
// When the parent process is done, it sends an empty message to this child
// process, which in turn records the change in used heap space.
// The difference in heap space is finally sent back to the parent process.
// ...
// The parent process should then kill this child.

const proxyServer = httpProxy.createServer();
proxyServer.on('error', (err, _, res) => {
    if (res.headersSent) {
        if (!res.writableEnded) {
            res.end();
        }
        return;
    }
    const headerNames = res.getHeaderNames ? res.getHeaderNames() : Object.keys(res.getHeaders() || {});
    headerNames.forEach((name) => res.removeHeader(name));
    // Use the unfamous teapot HTTP code.
    // To determine the error type inside the test message.
    res.writeHead(418, {'Access-Control-Allow-Origin': '*'});
    res.end('Not found because of proxy error: ' + err);
});

function createRawProxyServer() {
    const handler = cors_anywhere.getHandler({}, proxyServer);
    const server = http.createServer((req, res) => {
        req.url = req.url.slice(1);
        handler(req, res);
    });
    return server;
}

process.on('uncaughtException', (e) => {
    console.error('Uncaught exception in child process: ' + e);
    console.error(e.stack);
    process.exit(-1);
});

let server;

const onExit = () => {
    proxyServer.removeAllListeners('error');
    proxyServer.close();
    server.close();
};
process.on('SIGINT', onExit);
process.on('exit', onExit);

// Invoke memoryUsage() without using its result to make sure that any internal
// datastructures that supports memoryUsage() is initialized and won't pollute
// the memory usage measurement later on.
process.memoryUsage();

let heapUsedStart = 0;
function getMemoryUsage(callback) {
    // Note: Requires --expose-gc
    // 5 is the minimum amount of gc() calls before calling gc() again does not
    // reduce memory any more.
    let i = 5;
    while (i--) {
        global.gc();
    }
    callback(process.memoryUsage().heapUsed / 1024 / 1024);
}

server = process.argv.indexOf('use-http-instead-of-cors-anywhere') >= 0 ? http.createServer((_, res) => {
    res.end();
}) : createRawProxyServer();

server.listen(3001, '0.0.0.0', () =>{
    // Perform 1 request to warm up.
    http.get({
        hostname: '0.0.0.0',
        port: server.address().port,
        path: '/http://invalid:99999',
        agent: false,
    }, () => {
        notifyParent();
    });

    function notifyParent() {
        getMemoryUsage((usage) => {
            heapUsedStart = usage;
            process.send('http://0.0.0.0:' + server.address().port + '/');
        });
    }
});

process.once('message', () => {
    getMemoryUsage((heapUsedEnd) => {
        const delta = heapUsedEnd - heapUsedStart;
        process.send(delta);
    });
});

