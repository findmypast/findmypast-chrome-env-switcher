import CONSTANTS from "./consts";

const ENVIRONMENT = CONSTANTS.ENVIRONMENT;
const LOCAL = ENVIRONMENT.LOCAL;
const INTEGRATION = ENVIRONMENT.INTEGRATION;
const PRODUCTION = ENVIRONMENT.PRODUCTION;

const currentEnvironment = url => {
  if (url.includes("local")) {
    return ENVIRONMENT.LOCAL;
  } else if (url.includes("integration")) {
    return ENVIRONMENT.INTEGRATION;
  } else {
    return ENVIRONMENT.PRODUCTION;
  }
};

export default currentEnvironment;
