let branchesReducer = require("../src/reducers/branches.js");

let expect = require("chai").expect;

describe("Branches reducer", function() {
  it("should be a function", () => {
    expect(branchesReducer).to.be.a("function");
  });
  it("should return an array when no previous state is passed", () => {
    expect(branchesReducer(undefined, {})).to.deep.equal([]);
  });

  it("should swap the entire state for the payload of a SET_BRANCHES action", () => {
    let action = {
      type: "SET_BRANCHES",
      payload: [1, 2, 3]
    };
    let newState = branchesReducer([], action);
    expect(newState).to.deep.equal([1, 2, 3]);
  });

  it("should add a new commit when the ADD_BRANCH action is received", () => {
    let action = {
      type: "ADD_BRANCH",
      payload: 4
    };
    let newState = branchesReducer([1, 2, 3], action);
    expect(newState).to.deep.equal([1, 2, 3, 4]);
  });

  it("should remove a project at the specified index when the REMOVE_BRANCH action is received", () => {
    let action = {
      type: "REMOVE_BRANCH",
      payload: 1
    };
    let newState = branchesReducer([1, 2, 3], action);
    expect(newState).to.deep.equal([1, 3]);
  });
});
