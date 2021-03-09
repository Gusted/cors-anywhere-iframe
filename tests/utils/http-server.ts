import {createServer} from 'http';
import {getHandler} from '../../src/cors-anywhere-iframe';
import httpProxy from 'http-proxy';
import type {ServerOptions} from 'http-proxy';
import type {CorsAnywhereOptions} from '../../index';
import type {IncomingMessage, ServerResponse, Server} from 'http';

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


export function createProxyServer(options: Partial<CorsAnywhereOptions>, port: number, proxyOptions?: Partial<ServerOptions>) {
    let server: Server;
    let handler: (req: IncomingMessage, res: ServerResponse) => void;

    if (proxyOptions) {
        const newProxyServer = httpProxy.createServer(proxyOptions);
        newProxyServer.on('error', (err, _, res) => {
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
        handler = getHandler(options, newProxyServer);
    } else {
        handler = getHandler(options, proxyServer);
    }

    function start() {
        server = createServer((req, res) => {
            req.url = req.url.slice(1);
            handler(req, res);
        }).listen(port);
        server.on('error', (err) => {
            console.log(err);
        });

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
