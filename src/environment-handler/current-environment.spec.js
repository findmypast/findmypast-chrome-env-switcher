const { ENVIRONMENT } = require("./consts");
const currentEnvironment = require("./current-environment");

describe("current-environment", () => {
  describe("landing page with protocol", () => {
    it("integration", () => {
      const integrationLandingPage = "https://integration.findmypast.co.uk";
      const result = currentEnvironment(integrationLandingPage);

      expect(result).toEqual(ENVIRONMENT.INTEGRATION);
    });

    it("local", () => {
      const localLandingPage = "http://local.findmypast.co.uk:3100/";
      const result = currentEnvironment(localLandingPage);

      expect(result).toEqual(ENVIRONMENT.LOCAL);
    });

    it("production with www", () => {
      const productionLandingPage = "https://www.findmypast.co.uk/";
      const result = currentEnvironment(productionLandingPage);

      expect(result).toEqual(ENVIRONMENT.PRODUCTION);
    });

    it("production without www", () => {
      const productionLandingPage = "https://findmypast.co.uk/";
      const result = currentEnvironment(productionLandingPage);

      expect(result).toEqual(ENVIRONMENT.PRODUCTION);
    });
  });

  describe("landing page without protocol", () => {
    it("integration", () => {
      const integrationLandingPage = "integration.findmypast.co.uk";
      const result = currentEnvironment(integrationLandingPage);

      expect(result).toEqual(ENVIRONMENT.INTEGRATION);
    });

    it("local", () => {
      const localLandingPage = "local.findmypast.co.uk:3100/";
      const result = currentEnvironment(localLandingPage);

      expect(result).toEqual(ENVIRONMENT.LOCAL);
    });

    it("production with www", () => {
      const productionLandingPage = "www.findmypast.co.uk/";
      const result = currentEnvironment(productionLandingPage);

      expect(result).toEqual(ENVIRONMENT.PRODUCTION);
    });

    it("production without www", () => {
      const productionLandingPage = "findmypast.co.uk/";
      const result = currentEnvironment(productionLandingPage);

      expect(result).toEqual(ENVIRONMENT.PRODUCTION);
    });
  });

  describe("titan search page", () => {
    it("integration", () => {
      const integrationLandingPage =
        "https://integration.findmypast.co.uk/search/results?firstname=gavin&firstname_variants=true&lastname=henderson&sourcecountry=great%20britain&promptForRegistration=true";
      const result = currentEnvironment(integrationLandingPage);

      expect(result).toEqual(ENVIRONMENT.INTEGRATION);
    });

    it("local", () => {
      const localLandingPage =
        "http://local.findmypast.co.uk:3100/search/results?firstname=gavin&firstname_variants=true&lastname=henderson&sourcecountry=great%20britain&promptForRegistration=true";
      const result = currentEnvironment(localLandingPage);

      expect(result).toEqual(ENVIRONMENT.LOCAL);
    });

    it("production", () => {
      const productionLandingPage =
        "https://www.findmypast.co.uk/search/results?firstname=gavin&firstname_variants=true&lastname=henderson&sourcecountry=great%20britain";
      const result = currentEnvironment(productionLandingPage);

      expect(result).toEqual(ENVIRONMENT.PRODUCTION);
    });
  });

  describe("SAFE search page", () => {
    it("integration", () => {
      const integrationLandingPage =
        "http://integration.search.findmypast.co.uk/search-united-kingdom-records?";
      const result = currentEnvironment(integrationLandingPage);

      expect(result).toEqual(ENVIRONMENT.INTEGRATION);
    });

    it("production", () => {
      const productionLandingPage =
        "https://search.findmypast.co.uk/search-united-kingdom-records";
      const result = currentEnvironment(productionLandingPage);

      expect(result).toEqual(ENVIRONMENT.PRODUCTION);
    });
  });
});
