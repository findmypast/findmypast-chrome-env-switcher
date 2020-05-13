import CONSTANTS from "./consts";

const ENVIRONMENT = CONSTANTS.ENVIRONMENT;
const DOMAIN = CONSTANTS.DOMAIN;
const LOCAL = ENVIRONMENT.LOCAL;
const INTEGRATION = ENVIRONMENT.INTEGRATION;
const PRODUCTION = ENVIRONMENT.PRODUCTION;


const ENV_PROPERTIES = {
    [DOMAIN.SEARCH]: {
        [ENVIRONMENT.INTEGRATION]: {
            protocol: "http",
            subdomain: "integration.search"
        },
        [ENVIRONMENT.PRODUCTION]: {
            protocol: "https",
            subdomain: "search"
        }
    },
    [DOMAIN.WWW]: {
        [ENVIRONMENT.LOCAL]: {
            protocol: "http",
            subdomain: "local",
            port: "3100"
        },
        [ENVIRONMENT.INTEGRATION]: {
            protocol: "https",
            subdomain: "integration"
        },
        [ENVIRONMENT.PRODUCTION]: {
            protocol: "https",
            subdomain: "www"
        }
    }
}

export default function writeNewUrl({
    environment,
    isSearchPage,
    topLevelDomain,
    pathname = '',
    searchParams = ''
}) {

    const properties = isSearchPage ? ENV_PROPERTIES[DOMAIN.SEARCH] : ENV_PROPERTIES[DOMAIN.WWW];
    const { protocol, subdomain, port } = properties[environment];

    let host = writeHostname(subdomain, 'findmypast', topLevelDomain);
    if (port) {
        host += `:${port}`;
    }

    return `${protocol}://${host}${pathname}${searchParams}`;
}

export function writeHostname(...params) {
    return params.filter(val => val).join('.')
}