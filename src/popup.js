import currentEnvironment from "./environment-handler/current-environment.js";
import CONSTANTS from "./environment-handler/consts.js";

chrome.tabs.getSelected(tab => {
  const currentEnv = currentEnvironment(tab.url);

  const productionButton = document.getElementById("production");
  const integrationButton = document.getElementById("integration");
  const localButton = document.getElementById("local");

  if (currentEnv === CONSTANTS.ENVIRONMENT.LOCAL) {
    localButton.classList.toggle("active");
  } else if (currentEnv === CONSTANTS.ENVIRONMENT.INTEGRATION) {
    integrationButton.classList.toggle("active");
  } else if (currentEnv === CONSTANTS.ENVIRONMENT.PRODUCTION) {
    productionButton.classList.toggle("active");
  }
});

// let changeColor = document.getElementById("changeColor");

// changeColor.onclick = function(element) {
//   let color = element.target.value;
//   chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//     chrome.tabs.executeScript(tabs[0].id, {
//       code: 'document.body.style.backgroundColor = "' + color + '";'
//     });
//   });
// };

// chrome.storage.sync.get("color", function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute("value", data.color);
// });
