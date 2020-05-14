import CONSTANTS from "./consts.js";

import getUrlProperties from './get-url-properties.js';
import writeNewUrl from './write-new-url.js';

const newEnvironment = (targetEnv, currentUrl) => {
  const url = new URL(currentUrl);

  const pathname = url.pathname;
  const searchParams = url.search;

  const {
    isSearchPage,
    topLevelDomain,
  } = getUrlProperties(url.origin);
  // TODO should the responsibility for the path lie here 
  // or in getUrlProperties

  return writeNewUrl({
    environment: targetEnv,
    isSearchPage,
    topLevelDomain,
    pathname,
    searchParams
  })

};

export default newEnvironment;
