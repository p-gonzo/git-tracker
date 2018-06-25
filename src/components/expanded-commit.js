import React from 'react';
import * as allStudents from '../student-directory.json';

const prettifyDate = (datestr) => {
  let comparator = new Date(datestr);
  let now = new Date(Date.now());

  let difference = now - comparator;
  if(difference > 31540000000) {return 'Over 1 year ago.'}
  let timeSince = {
    minutes: Math.floor(difference / 60000),
    hours: Math.floor(difference / 360000),
    days: Math.floor(difference / 8640000),
    weeks: Math.floor(difference / 60480000),
  }
  if(timeSince.weeks > 0) {
    return timeSince.weeks + ' weeks ago';
  } else if(timeSince.days > 0) {
    return timeSince.days + ' days ago';
  } else if(timeSince.hours > 0) {
    return timeSince.hours + ' hours ago';
  } else if(timeSince.minutes > 0) {
    return timeSince.minutes + ' minutes ago';
  }
}

const ExpandedCommit = ({ commit, commitDetails, hidden }) => {
  prettifyDate(commit.created_at)
  return hidden ? null : (
    <div className="small-text">
      <div className="user v-container v-centered centered">
        <h3>
          { commit.author }
        </h3>
        <a href={commit.user_html_url}>
          <img className="avatar" src={commit.author_avatar}></img>
        </a>
      </div>
      {
        commitDetails ? (
        <div>
          <span>Additions: {commitDetails.additions}</span>
          <br/>
          <span>Deletions: {commitDetails.deletions}</span>
        </div>) : null
      }
      <div>
        <span>Created: {prettifyDate(commit.created_at)}</span>
        <br/>
        <span>Updated: {prettifyDate(commit.updated_at)}</span>
        <br/>
        <span>Closed: {prettifyDate(commit.closed_at)}</span>
        <br/>
        <span>Merged: {prettifyDate(commit.merged_at)}</span>
      </div>
      <a href={commit.comments_url}> Get Comments! </a>
    </div>
  );
}

export default ExpandedCommit;



