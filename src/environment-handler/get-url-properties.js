
import CONSTANTS from './consts';

const { ENVIRONMENT } = CONSTANTS;

const PROTOCOL_GROUP = "((?<protocol>https?):\/\/)?";

const ENV_SUBDOMAIN_GROUP = "(?<envSubdomain>local|integration|www)\\.";
const SEARCH_SUBDOMAIN_GROUP = "(?<searchSubdomain>search)\\.";
const TOP_LEVEL_DOMAIN_GROUP = "\\.(?<topLevelDomain>[a-z\\.]+)";
const DOMAIN_GROUPS = `(${ENV_SUBDOMAIN_GROUP})?(${SEARCH_SUBDOMAIN_GROUP})?findmypast${TOP_LEVEL_DOMAIN_GROUP}`;

const PORT_GROUP = "(:(?<port>\\d+))?";
const PATHNAME_AND_PARAMS_GROUP = "(?<urlTail>\\/.+)?";

const findmypastUrlRegex = new RegExp(`${PROTOCOL_GROUP}${DOMAIN_GROUPS}${PORT_GROUP}${PATHNAME_AND_PARAMS_GROUP}`);

export function extractFindmypastUrlPropertiesByRegex(url) {
    if (findmypastUrlRegex.test(url)) {
        const matches = url.match(findmypastUrlRegex);
        return matches.groups;
    } else {
        throw new Error('Sorry, the extension does not cover this type of URL.')
    }
}

export default function getUrlProperties(url) {

    const properties = extractFindmypastUrlPropertiesByRegex(url);
    const { envSubdomain = '', searchSubdomain, topLevelDomain } = properties;

    const environment = ENVIRONMENT[envSubdomain.toUpperCase()] || ENVIRONMENT.PRODUCTION;
    const isSearchPage = !!searchSubdomain;

    return {
        environment,
        isSearchPage,
        topLevelDomain
    }
}

