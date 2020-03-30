import CONSTANTS from "./consts.js";

const ENVIRONMENT = CONSTANTS.ENVIRONMENT;
const LOCAL = ENVIRONMENT.LOCAL;
const INTEGRATION = ENVIRONMENT.INTEGRATION;
const PRODUCTION = ENVIRONMENT.PRODUCTION;

const ENV_PROPERTIES = {
  [LOCAL]: {
    PROTOCOL: "http",
    SUBDOMAIN: "local",
    PORT: ":3100"
  },
  [INTEGRATION]: {
    PROTOCOL: "https",
    SUBDOMAIN: "integration",
    PORT: "",
    SEARCH: {
      SUBDOMAIN: "integration.search",
      PROTOCOL: "http"
    }
  },
  [PRODUCTION]: {
    PROTOCOL: "https",
    SUBDOMAIN: "www",
    PORT: "",
    SEARCH: {
      SUBDOMAIN: "search",
      PROTOCOL: "https"
    }
  }
};

const isUrlSearchPage = url => {
  const fromURL = new URL(url);

  return fromURL.host.includes("search");
};

const newEnvironment = (fromEnv, toEnv, url) => {
  const fromURL = new URL(url);
  const fromParams = fromURL.searchParams.toString();
  const isSearchPage = isUrlSearchPage(url);
  const envProperties = ENV_PROPERTIES[toEnv];

  const targetProtocol = isSearchPage
    ? envProperties.SEARCH.PROTOCOL
    : envProperties.PROTOCOL;
  const targetSubdomain = isSearchPage
    ? envProperties.SEARCH.SUBDOMAIN
    : envProperties.SUBDOMAIN;
  const targetPort = envProperties.PORT;
  const targetPathname = fromURL.pathname;
  const targetParams = fromParams === "" ? "" : `?${fromParams}`;

  return `${targetProtocol}://${targetSubdomain}.findmypast.co.uk${targetPort}${targetPathname}${targetParams}`;
};

export default newEnvironment;
