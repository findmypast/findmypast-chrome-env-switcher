const { ENVIRONMENT } = require("./consts");

const currentEnvironment = url => {
  if (url.includes("local")) {
    return ENVIRONMENT.LOCAL;
  } else if (url.includes("integration")) {
    return ENVIRONMENT.INTEGRATION;
  } else {
    return ENVIRONMENT.PRODUCTION;
  }
};

module.exports = currentEnvironment;
