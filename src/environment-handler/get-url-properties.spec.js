import getUrlProperties, { extractFindmypastUrlPropertiesByRegex } from "./get-url-properties";
import CONSTANTS from "./consts.js";

const ENVIRONMENT = CONSTANTS.ENVIRONMENT;
const LOCALE = CONSTANTS.LOCALE;

const PROD_URL = 'https://findmypast.co.uk/test';
const WWW_URL = 'https://www.findmypast.co.uk/test';
const INT_URL = 'https://integration.findmypast.co.uk/test';
const PROD_SAFE_URL = 'https://search.findmypast.co.uk/test';
const INT_SAFE_URL = 'http://integration.search.findmypast.co.uk/test';

describe("get-url-properties", () => {

    describe("getUrlProperties", () => {
        it("is able to correctly identify the properties for a local findmypast URL", () => {
            const localLandingPage = 'http://local.findmypast.co.uk:3100/test';
            const expected = {
                environment: ENVIRONMENT.LOCAL,
                isSearchPage: false,
                topLevelDomain: LOCALE.UK
            }
            const result = getUrlProperties(localLandingPage);
            expect(result).toEqual(expected)

        })
        it("is able to correctly identify the properties for an integration findmypast URL", () => {
            const localLandingPage = 'https://integration.findmypast.co.uk/test';
            const expected = {
                environment: ENVIRONMENT.INTEGRATION,
                isSearchPage: false,
                topLevelDomain: LOCALE.UK
            }
            const result = getUrlProperties(localLandingPage);
            expect(result).toEqual(expected)

        })
        it("is able to correctly identify the properties for a production findmypast URL with www", () => {
            const productionLandingPageWithWww = 'https://www.findmypast.ie/test';
            const expected = {
                environment: ENVIRONMENT.PRODUCTION,
                isSearchPage: false,
                topLevelDomain: LOCALE.IE
            }
            const result = getUrlProperties(productionLandingPageWithWww);
            expect(result).toEqual(expected)

        })
        it("is able to correctly identify the properties for a production findmypast URL without www", () => {
            const productionLandingPageNoWww = 'https://findmypast.com/test';
            const expected = {
                environment: ENVIRONMENT.PRODUCTION,
                isSearchPage: false,
                topLevelDomain: LOCALE.US
            }
            const result = getUrlProperties(productionLandingPageNoWww);
            expect(result).toEqual(expected)

        })
        it("is able to correctly identify the properties for an integration SAFE URL", () => {
            const integrationSafeLandingPage = 'http://integration.search.findmypast.co.uk/test';
            const expected = {
                environment: ENVIRONMENT.INTEGRATION,
                isSearchPage: true,
                topLevelDomain: LOCALE.UK
            }
            const result = getUrlProperties(integrationSafeLandingPage);
            expect(result).toEqual(expected)

        })
        it("is able to correctly identify the properties for a production SAFE URL", () => {
            const productionSafeLandingPage = 'https://search.findmypast.co.uk/test';
            const expected = {
                environment: ENVIRONMENT.PRODUCTION,
                isSearchPage: true,
                topLevelDomain: LOCALE.UK
            }
            const result = getUrlProperties(productionSafeLandingPage);
            expect(result).toEqual(expected)

        })
    })

    describe("extractFindmypastUrlPropertiesByRegex", () => {
        it("is able to extract the protocol", () => {
            const values = [
                { param: 'https://findmypast.com', expected: 'https' },
                { param: 'http://findmypast.com', expected: 'http' }
            ]
            values.forEach(({ param, expected }) => {
                const result = extractFindmypastUrlPropertiesByRegex(param);
                expect(result.protocol).toEqual(expected)
            })

        });
        it("is able to extract the environment", () => {
            const values = [
                { param: 'https://findmypast.com', expected: undefined },
                { param: 'https://www.findmypast.com', expected: 'www' },
                { param: 'https://integration.findmypast.com', expected: 'integration' },
                { param: 'https://local.findmypast.com', expected: 'local' },
                { param: 'https://search.findmypast.com', expected: undefined },
                { param: 'https://integration.search.findmypast.com', expected: 'integration' },
            ]
            values.forEach(({ param, expected }) => {
                const result = extractFindmypastUrlPropertiesByRegex(param);
                expect(result.envSubdomain).toEqual(expected)
            })
        });
        it("is able to extract the search subdomain", () => {
            const values = [
                { param: 'https://findmypast.com', expected: undefined },
                { param: 'https://www.findmypast.com', expected: undefined },
                { param: 'https://search.findmypast.com', expected: 'search' },
                { param: 'https://integration.search.findmypast.com', expected: 'search' },
            ]
            values.forEach(({ param, expected }) => {
                const result = extractFindmypastUrlPropertiesByRegex(param);
                expect(result.searchSubdomain).toEqual(expected)
            })
        });
        it("is able to extract the top-level-domain", () => {
            const values = [
                { param: 'https://findmypast.com', expected: 'com' },
                { param: 'https://www.findmypast.co.uk', expected: 'co.uk' },
            ]
            values.forEach(({ param, expected }) => {
                const result = extractFindmypastUrlPropertiesByRegex(param);
                expect(result.topLevelDomain).toEqual(expected)
            })
        });
        it("is able to extract the port number", () => {
            const values = [
                { param: 'https://findmypast.com', expected: undefined },
                { param: 'https://local.findmypast.com:3100', expected: '3100' },
            ]
            values.forEach(({ param, expected }) => {
                const result = extractFindmypastUrlPropertiesByRegex(param);
                expect(result.port).toEqual(expected)
            })
        });
        it("is able to extract the end of the URL", () => {
            const values = [
                { param: 'https://findmypast.com', expected: undefined },
                { param: 'https://findmypast.com/test', expected: '/test' },
                { param: 'https://findmypast.com/search?param=one', expected: '/search?param=one' },
                { param: 'https://findmypast.com/test#section', expected: '/test#section' },
            ]
            values.forEach(({ param, expected }) => {
                const result = extractFindmypastUrlPropertiesByRegex(param);
                expect(result.urlTail).toEqual(expected)
            })
        });

    });



});
