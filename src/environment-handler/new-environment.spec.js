const {
  ENVIRONMENT: { INTEGRATION, LOCAL, PRODUCTION }
} = require("./consts");
const newEnvironment = require("./new-environment");

describe("new-environment", () => {
  describe("landing page", () => {
    it("integration -> local", () => {
      const landingPage =
        "https://integration.findmypast.co.uk/search/results?firstname=gavin&firstname_variants=true&lastname=henderson&sourcecountry=great%20britain&promptForRegistration=true";
      const result = newEnvironment(INTEGRATION, LOCAL, landingPage);
      const expected = "http://local.findmypast.co.uk:3100/";

      expect(result).toEqual(expected);
    });

    it("local -> integration", () => {
      const landingPage = "http://local.findmypast.co.uk:3100";
      const result = newEnvironment(LOCAL, INTEGRATION, landingPage);
      const expected = "https://integration.findmypast.co.uk/";
      expect(result).toEqual(expected);
    });

    it("production -> local", () => {
      const landingPage = "https://www.findmypast.co.uk/";
      const result = newEnvironment(PRODUCTION, LOCAL, landingPage);
      const expected = "http://local.findmypast.co.uk:3100/";
      expect(result).toEqual(expected);
    });

    it("local -> production", () => {
      const landingPage = "http://local.findmypast.co.uk:3100/";
      const result = newEnvironment(LOCAL, PRODUCTION, landingPage);
      const expected = "https://www.findmypast.co.uk/";
      expect(result).toEqual(expected);
    });
  });

  describe("titan search page", () => {
    it("integration -> local", () => {
      const searchPage =
        "https://integration.findmypast.co.uk/search/results?firstname=gavin&firstname_variants=true&lastname=henderson&sourcecountry=great%20britain&promptForRegistration=true";
      const result = newEnvironment(INTEGRATION, LOCAL, searchPage);
      const expected =
        "http://local.findmypast.co.uk:3100/search/results?firstname=gavin&firstname_variants=true&lastname=henderson&sourcecountry=great%20britain&promptForRegistration=true";
      expect(result).toEqual(expected);
    });

    it("local -> integration", () => {
      const searchPage =
        "http://local.findmypast.co.uk:3100/search/results?firstname=gavin&firstname_variants=true&lastname=henderson&sourcecountry=great%20britain&promptForRegistration=true";
      const result = newEnvironment(LOCAL, INTEGRATION, searchPage);
      const expected =
        "https://integration.findmypast.co.uk/search/results?firstname=gavin&firstname_variants=true&lastname=henderson&sourcecountry=great%20britain&promptForRegistration=true";
      expect(result).toEqual(expected);
    });

    it("production -> local", () => {
      const searchPage =
        "https://www.findmypast.co.uk/search/results?firstname=gavin&firstname_variants=true&lastname=henderson&sourcecountry=great%20britain";
      const result = newEnvironment(PRODUCTION, LOCAL, searchPage);
      const expected =
        "http://local.findmypast.co.uk:3100/search/results?firstname=gavin&firstname_variants=true&lastname=henderson&sourcecountry=great%20britain&promptForRegistration=true";
      expect(result).toEqual(expected);
    });

    it("local -> production", () => {
      const searchPage =
        "http://local.findmypast.co.uk:3100/search/results?firstname=gavin&firstname_variants=true&lastname=henderson&sourcecountry=great%20britain&promptForRegistration=true";
      const result = newEnvironment(LOCAL, PRODUCTION, searchPage);
      const expected =
        "https://www.findmypast.co.uk/search/results?firstname=gavin&firstname_variants=true&lastname=henderson&sourcecountry=great%20britain";
      expect(result).toEqual(expected);
    });
  });

  describe("SAFE search page", () => {
    it("integration -> production", () => {
      const searchPage =
        "http://integration.search.findmypast.co.uk/search-united-kingdom-records?";
      const result = newEnvironment(LOCAL, PRODUCTION, searchPage);
      const expected =
        "https://search.findmypast.co.uk/search-united-kingdom-records";
      expect(result).toEqual(expected);
    });

    it("production -> integration", () => {
      const searchPage =
        "https://search.findmypast.co.uk/search-united-kingdom-records";
      const result = newEnvironment(LOCAL, PRODUCTION, searchPage);
      const expected =
        "http://integration.search.findmypast.co.uk/search-united-kingdom-records?";
      expect(result).toEqual(expected);
    });
  });
});
