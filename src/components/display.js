import React from 'react';

const Display = ({currentStudent, currentRepo}) => (
  <div>
    <div> Selected Student: { currentStudent ? currentStudent.name : null } </div>
    <div> Selected Repo: { currentRepo ? currentRepo.org_name : null } </div>
    <hr/>
  </div>
)

export default Display;