import React from 'react';
import * as allStudents from '../student-directory.json';

// Fields to Expand:
// html_url
// comments_url
// created_at
// updated_at
// closed_at
// merged_at
// user
  // avatar_url
  // html_url

const ExpandedCommit = ({ commit, commitDetails, hidden }) => {
  return hidden ? null : (
    <div className="small-text">
      <div className="user">
        <h3>
          { allStudents.filter((student) => student["github-handle"] === commit.user.login)[0].name }
        </h3>
        <img style={{height: '100px', width: '100px'}} src={commit.user.avatar_url}></img>
        <div>{commit.user.html_url}</div>
      </div>
      {
        commitDetails ? (
        <div>
          Additions: {commitDetails.additions}
          Deletions: {commitDetails.deletions}
        </div>) : null
      }
      <a href={commit.comments_url}> Get Comments! </a>
    </div>
  );
}

export default ExpandedCommit;
