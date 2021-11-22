const { expect } = require("chai");
describe("parts tests", () => {
  it("should be true", () => {
    let result = true;
    expect(result).to.be.true;
  });
  it("should be undefined", () => {
    // arrange
    // act
    let result;
    // assetions
    expect(result).to.be.undefined;
  });
});
