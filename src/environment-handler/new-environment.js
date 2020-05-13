import CONSTANTS from "./consts";

import getUrlProperties from './get-url-properties';
import writeNewUrl from './write-new-url';

const newEnvironment = (fromEnv, toEnv, url) => {
  const fromURL = new URL(url);

  const pathname = fromURL.pathname;
  const searchParams = fromURL.search;

  const {
    isSearchPage,
    topLevelDomain,
  } = getUrlProperties(fromURL.origin)

  return writeNewUrl({
    environment: toEnv,
    isSearchPage,
    topLevelDomain,
    pathname,
    searchParams
  })

};

export default newEnvironment;
