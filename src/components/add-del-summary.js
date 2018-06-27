
import React from 'react';

const AddDelSummary = ({additions, deletions}) => {
  return (additions && deletions && (additions > 0 || deletions > 0)) ? (
    <div className={"small-text"}>( Total additions: {additions} Total deletions: {deletions})</div>
  ) : null }

  export default AddDelSummary;