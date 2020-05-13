import CONSTANTS from "./consts.js";
import writeNewUrl, { writeHostname } from "./write-new-url.js";

const ENVIRONMENT = CONSTANTS.ENVIRONMENT;
const LOCALE = CONSTANTS.LOCALE;
const LOCAL = ENVIRONMENT.LOCAL;
const INTEGRATION = ENVIRONMENT.INTEGRATION;
const PRODUCTION = ENVIRONMENT.PRODUCTION;

describe("write-new-url", () => {
    describe("is able to write a normal findmypast URL", () => {
        const wwwParams = {
            isSearchPage: false,
            topLevelDomain: LOCALE.UK,
            pathname: '/this/is/a/test',
            searchParams: '?bob=best'
        }
        it("on local", () => {
            const localLandingPage = "http://local.findmypast.co.uk:3100/this/is/a/test?bob=best";
            const result = writeNewUrl({
                ...wwwParams,
                environment: LOCAL
            });

            expect(result).toEqual(localLandingPage);
        });
        it("on integration", () => {
            const integrationLandingPage = "https://integration.findmypast.co.uk/this/is/a/test?bob=best";
            const result = writeNewUrl({
                ...wwwParams,
                environment: INTEGRATION
            });

            expect(result).toEqual(integrationLandingPage);
        });


        it("on production (with www)", () => {
            const productionLandingPage = "https://www.findmypast.co.uk/this/is/a/test?bob=best";
            const result = writeNewUrl({
                ...wwwParams,
                environment: PRODUCTION
            });

            expect(result).toEqual(productionLandingPage);
        });
    });

    describe("is able to write a search.findmypast URL", () => {
        const safeParams = {
            isSearchPage: true,
            topLevelDomain: LOCALE.UK,
            pathname: '/this/is/a/test',
            searchParams: '?bob=best'
        }
        it("on integration", () => {
            const integrationLandingPage = "http://integration.search.findmypast.co.uk/this/is/a/test?bob=best";
            const result = writeNewUrl({
                ...safeParams,
                environment: INTEGRATION
            });

            expect(result).toEqual(integrationLandingPage);
        });

        it("on production", () => {
            const productionLandingPage = "https://search.findmypast.co.uk/this/is/a/test?bob=best";
            const result = writeNewUrl({
                ...safeParams,
                environment: PRODUCTION
            });

            expect(result).toEqual(productionLandingPage);
        });
    });

    describe("writeHostname", () => {
        it("returns all the received parameter as one string joined by '.'", () => {
            const result = writeHostname('a', 'b', 'c');
            expect(result).toEqual('a.b.c')
        })
        it("is able to omit empty strings or falsy values when writing the hostname from the list of parameters", () => {
            const result = writeHostname('start', '', null, undefined, false, 'end');
            expect(result).toEqual('start.end');
        })
    })


});
