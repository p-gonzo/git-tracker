import React from 'react';

const Display = ({currentStudent, currentRepo}) => (
  <div>
    <h1> Git Trackin'! </h1>
    <div className="small-text"> Selected Student: { currentStudent ? currentStudent.name : null } </div>
    <div className="small-text"> Selected Repo: { currentRepo ? currentRepo.org_name : null } </div>
  </div>
)

export default Display;