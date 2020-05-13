import CONSTANTS from "./consts";

import getUrlProperties from './get-url-properties';
import writeNewUrl from './write-new-url';

const isUrlSearchPage = url => {
  const fromURL = new URL(url);

  return fromURL.host.includes("search");
};

const newEnvironment = (fromEnv, toEnv, url) => {
  const fromURL = new URL(url);

  const pathname = fromURL.pathname;
  const searchParams = fromURL.search;

  const isSearchPage = isUrlSearchPage(url);

  return writeNewUrl({
    environment: toEnv,
    isSearchPage,
    topLevelDomain: 'co.uk',
    pathname,
    searchParams
  })

};

export default newEnvironment;
