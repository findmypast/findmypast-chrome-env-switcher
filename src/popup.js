import newEnvironment from "./environment-handler/new-environment.js";

import { ENVIRONMENT } from "./environment-handler/consts.js";

const button = (env) => document.getElementById(env);

const buttonClick = (target, tab) => () => {
  const newUrl = newEnvironment(target, tab.url);
  chrome.tabs.update(tab.id, { url: newUrl });
};

chrome.tabs.getSelected(tab => {
  const {
    environment: currentEnv
  } = getUrlProperties(tab.url);

  button(currentEnv).classList.toggle("active");

  button(ENVIRONMENT.LOCAL).onclick = buttonClick(
    ENVIRONMENT.LOCAL,
    tab
  );
  button(ENVIRONMENT.INTEGRATION).onclick = buttonClick(
    ENVIRONMENT.INTEGRATION,
    tab
  );
  button(ENVIRONMENT.PRODUCTION).onclick = buttonClick(
    ENVIRONMENT.PRODUCTION,
    tab
  );
});
