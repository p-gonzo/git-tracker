let selectedBranchReducer = require("../src/reducers/selected-branch.js");

let expect = require("chai").expect;

describe("Selected Branch reducer", function() {
  it("should be a function", () => {
    expect(selectedBranchReducer).to.be.a("function");
  });

  it("should return an null when no previous state is passed", () => {
    expect(selectedBranchReducer(undefined, {})).to.deep.equal(null);
  });

  it("should set the entire state to payload when a SET_CURRENT_BRANCH action is received", () => {
    let branch = {
      name: "Testy Testerson"
    };

    let action = {
      type: "SET_CURRENT_BRANCH",
      payload: branch
    };

    expect(selectedBranchReducer(undefined, action)).to.deep.equal(branch);
  });
});
