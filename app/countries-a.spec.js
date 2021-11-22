const { expect } = require("chai");
const supertest = require("supertest");
const app = require("./app");

describe("/api", () => {
  let request;
  before(() => {
    request = supertest(app);
  });
  describe("GET /getAllCountries", () => {
    it("should not return an empty array", async () => {
      const res = await request.get("/api/getAllCountries").expect(200);
      expect(res.body.countries).not.to.be.empty;
    });
  });
  describe("GET /getCountryByName", () => {
    it("should return the requested country data", async () => {
      const countryName = "France";
      const expected = { name: "France", pib: 4000 };
      const res = await request
        .get("/api/getCountryByName/" + countryName)
        .expect(200);
      expect(res.body.country).to.eql(expected);
    });

    it("should return status 400 if the country does not exist", async () => {
      const countryName = "Sweden";
      const expected = { message: "we couldn't find the country" };
      const res = await request
        .get("/api/getCountryByName/" + countryName)
        .expect(404);
      expect(res.body).to.eql(expected);
    });
  });
  describe("PUT /updateCountry", () => {
    context("User tries to update a country's data", () => {
      it("should return the requested country data", async () => {
        const countryName = "France";
        const newCountryData = { name: "Argentina" };
        const expected = "updated successfuly";
        const res = await request
          .put("/api/updateCountry/" + countryName)
          .send({ data: newCountryData })
          .expect(200);
        expect(res.body.message).to.eql(expected);
      });
    });
  });
});
