let selectedCommitReducer = require("../src/reducers/selected-commit.js");

let expect = require("chai").expect;

describe("Selected Commit reducer", function() {
  it("should be a function", () => {
    expect(selectedCommitReducer).to.be.a("function");
  });

  it("should return null when no previous state is passed", () => {
    expect(selectedCommitReducer(undefined, {})).to.deep.equal(null);
  });

  it("should set the entire state to payload when a SET_CURRENT_COMMIT action is received", () => {
    let commit = {
      git_id: "1234567890",
      title: "Macbeth",
      created_at: new Date(),
      author: "W. Shakespeare",
      author_avatar: "https://www.someurl.com",
      comments_url: "https://www.someurl.com",
      url: "https://www.someurl.com",
      user_html_url: "https://www.someurl.com",
      additions: 12,
      deletions: 12
    };

    let action = {
      type: "SET_CURRENT_COMMIT",
      payload: commit
    };

    expect(selectedCommitReducer(undefined, action)).to.deep.equal(commit);
  });
});
