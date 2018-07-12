import React from "react";
import ShyDiv from "./utility/shy-div.js";

const prettifyDate = datestr => {
  let comparator = new Date(datestr);
  let now = new Date(Date.now());

  let difference = now - comparator;
  if (difference > 31540000000) {
    return "Over 1 year ago.";
  }
  let timeSince = {
    minutes: Math.floor(difference / 60000),
    hours: Math.floor(difference / 360000),
    days: Math.floor(difference / 8640000),
    weeks: Math.floor(difference / 60480000)
  };
  if (timeSince.weeks > 0) {
    return timeSince.weeks + " weeks ago";
  } else if (timeSince.days > 0) {
    return timeSince.days + " days ago";
  } else if (timeSince.hours > 0) {
    return timeSince.hours + " hours ago";
  } else if (timeSince.minutes > 0) {
    return timeSince.minutes + " minutes ago";
  }
};

const CommitDates = ({ commit }) => (
  <div>
    <hr />
    <ShyDiv
      showIf={prettifyDate(commit.created_at)}
      contents={"Created: " + prettifyDate(commit.created_at)}
    />
    <ShyDiv
      showIf={prettifyDate(commit.updated_at)}
      contents={"Updated: " + prettifyDate(commit.updated_at)}
    />
    <ShyDiv
      showIf={prettifyDate(commit.closed_at)}
      contents={"Closed: " + prettifyDate(commit.closed_at)}
    />
    <ShyDiv
      showIf={prettifyDate(commit.merged_at)}
      contents={"Merged: " + prettifyDate(commit.merged_at)}
    />
    <hr />
  </div>
);

export default CommitDates;
