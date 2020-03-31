import currentEnvironment from "./environment-handler/current-environment.js";
import newEnvironment from "./environment-handler/new-environment.js";

import CONSTANTS from "./environment-handler/consts.js";

const productionButton = document.getElementById("production");
const integrationButton = document.getElementById("integration");
const localButton = document.getElementById("local");

const buttonClick = (from, to, tab) => () => {
  const newUrl = newEnvironment(from, to, tab.url);

  chrome.tabs.update(tab.id, { url: newUrl });
};

chrome.tabs.getSelected(tab => {
  const currentEnv = currentEnvironment(tab.url);

  if (currentEnv === CONSTANTS.ENVIRONMENT.LOCAL) {
    localButton.classList.toggle("active");
  } else if (currentEnv === CONSTANTS.ENVIRONMENT.INTEGRATION) {
    integrationButton.classList.toggle("active");
  } else if (currentEnv === CONSTANTS.ENVIRONMENT.PRODUCTION) {
    productionButton.classList.toggle("active");
  }

  localButton.onclick = buttonClick(
    currentEnv,
    CONSTANTS.ENVIRONMENT.LOCAL,
    tab
  );
  integrationButton.onclick = buttonClick(
    currentEnv,
    CONSTANTS.ENVIRONMENT.INTEGRATION,
    tab
  );
  productionButton.onclick = buttonClick(
    currentEnv,
    CONSTANTS.ENVIRONMENT.PRODUCTION,
    tab
  );
});
