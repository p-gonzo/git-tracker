import React from "react";
import CommitDates from "./commit-dates.js";
import GithubProfile from "./github-profile.js";
import ShyDiv from "./utility/shy-div.js";

const renderAdditionsAndDeletions = commitDetails =>
  commitDetails ? (
    <div>
      <hr />
      <span>Additions: {commitDetails.additions}</span>
      <br />
      <span>Deletions: {commitDetails.deletions}</span>
      <hr />
    </div>
  ) : null;

const ExpandedCommit = ({ commit, commitDetails, hidden }) => {
  return (
    <ShyDiv
      showIf={!hidden}
      contents={
        <div className="small-text">
          <GithubProfile commit={commit} />
          <ShyDiv
            showIf={commitDetails && commitDetails.additions && commitDetails}
            contents={renderAdditionsAndDeletions(commitDetails)}
          />
          <CommitDates commit={commit} />
          <a href={commit.comments_url}> Get Comments! </a>
        </div>
      }
    />
  );
};

export default ExpandedCommit;
