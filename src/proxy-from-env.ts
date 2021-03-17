const DEFAULT_PORTS = {
    ftp: 21,
    gopher: 70,
    http: 80,
    https: 443,
    ws: 80,
    wss: 443,
};

export function getProxyForUrl(url: string): string {
    const parsedUrl = new URL(url);
    let {protocol, host} = parsedUrl;
    const port = parsedUrl.port;

    if (!host || !protocol) {
        return null;
    }
    protocol = protocol.split(':', 1)[0];

    host = host.replace(/:\d*$/, '');
    const parsedPort = parseInt(port) || DEFAULT_PORTS[protocol] || 0;
    if (!shouldProxy(host, parsedPort)) {
        return null;
    }

    let proxy = getEnv('npm_config_' + protocol + '_proxy') ||
        getEnv(protocol + '_proxy') ||
        getEnv('npm_config_proxy') ||
        getEnv('all_proxy');
    if (proxy && proxy.indexOf('://') === -1) {
        proxy = protocol + '://' + proxy;
    }
    return proxy;
}

/**
 * Determines whether a given URL should be proxied.
 */
function shouldProxy(hostname: string, port: number): boolean {
    const NO_PROXY =
    (getEnv('npm_config_no_proxy') || getEnv('no_proxy')).toLowerCase();
    if (!NO_PROXY) {
        return true;
    }
    if (NO_PROXY === '*') {
        return false;
    }

    return NO_PROXY.split(/[\s,]/).every((proxy) => {
        if (!proxy) {
            return true; // Skip zero-length hosts.
        }
        const parsedProxy = proxy.match(/^(.+):(\d+)$/);
        let parsedProxyHostname = parsedProxy ? parsedProxy[1] : proxy;
        const parsedProxyPort = parsedProxy ? parseInt(parsedProxy[2]) : 0;
        if (parsedProxyPort && parsedProxyPort !== port) {
            return true;
        }

        if (!/^[*.]/.test(parsedProxyHostname)) {
            return hostname !== parsedProxyHostname;
        }

        if (parsedProxyHostname.charAt(0) === '*') {
            parsedProxyHostname = parsedProxyHostname.slice(1);
        }
        return !hostname.endsWith(parsedProxyHostname);
    });
}

/**
 * Get the value for an environment variable.
 */
function getEnv(key: string): string {
    return process.env[key.toLowerCase()] || process.env[key.toUpperCase()] || '';
}
