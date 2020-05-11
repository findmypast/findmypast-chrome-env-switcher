import currentEnvironment from "./environment-handler/current-environment.js";
import newEnvironment from "./environment-handler/new-environment.js";

import { ENVIRONMENT } from "./environment-handler/consts.js";

const button = (env) => document.getElementById(env);

const buttonClick = (from, to, tab) => () => {
  const newUrl = newEnvironment(from, to, tab.url);

  chrome.tabs.update(tab.id, { url: newUrl });
};

chrome.tabs.getSelected(tab => {
  const currentEnv = currentEnvironment(tab.url);

  button(currentEnv).classList.toggle("active");

  button(ENVIRONMENT.LOCAL).onclick = buttonClick(
    currentEnv,
    ENVIRONMENT.LOCAL,
    tab
  );
  button(ENVIRONMENT.INTEGRATION).onclick = buttonClick(
    currentEnv,
    ENVIRONMENT.INTEGRATION,
    tab
  );
  button(ENVIRONMENT.PRODUCTION).onclick = buttonClick(
    currentEnv,
    ENVIRONMENT.PRODUCTION,
    tab
  );
});
