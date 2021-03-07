import type {Server} from 'http';
import {createServer} from 'http';
import {getHandler} from '../../src/cors-anywhere-iframe';
import httpProxy from 'http-proxy';
import type {corsAnywhereRequestStateOptions} from 'node:http';

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
    res.writeHead(404, {'Access-Control-Allow-Origin': '*'});
    res.end('Not found because of proxy error: ' + err);
});


export function createProxyServer(options: Partial<corsAnywhereRequestStateOptions>, port: number) {
    let server: Server;

    function start() {
        server = createServer(getHandler(options, proxyServer)).listen(port);
    }

    function close() {
        if (!server) {
            return;
        }
        server.close((err) => {
            if (err) {
                console.error(err);
            }
            server = null;
        });
    }

    process.on('exit', close);
    process.on('SIGINT', close);

    start();

    return {
        close,
        url: `http://0.0.0.0:${port}`,
        server,
    };
}
