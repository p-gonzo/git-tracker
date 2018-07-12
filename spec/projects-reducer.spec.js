let projectsReducer = require("../src/reducers/projects.js");

let expect = require("chai").expect;

describe("Projects reducer", function() {
  it("should be a function", () => {
    expect(projectsReducer).to.be.a("function");
  });
  it("should return an array when no previous state is passed", () => {
    expect(projectsReducer(undefined, {})).to.deep.equal([]);
  });

  it("should swap the entire state for the payload of a SET_PROJECTS action", () => {
    let action = {
      type: "SET_PROJECTS",
      payload: [1, 2, 3]
    };
    let newState = projectsReducer([], action);
    expect(newState).to.deep.equal([1, 2, 3]);
  });

  it("should add a new project when the ADD_PROJECT action is received", () => {
    let action = {
      type: "ADD_PROJECT",
      payload: 4
    };
    let newState = projectsReducer([1, 2, 3], action);
    expect(newState).to.deep.equal([1, 2, 3, 4]);
  });

  it("should remove a project at the specified index when the REMOVE_PROJECT action is received", () => {
    let action = {
      type: "REMOVE_PROJECT",
      payload: 1
    };
    let newState = projectsReducer([1, 2, 3], action);
    expect(newState).to.deep.equal([1, 3]);
  });
});
