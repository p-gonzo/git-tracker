import React from "react";
import { connect } from "react-redux";

const Display = ({ currentStudent, currentRepo }) => (
  <div>
    <h1> Git Trackin'! </h1>
    <div className="small-text">
      {" "}
      Selected Student: {currentStudent ? currentStudent.name : null}{" "}
    </div>
    <div className="small-text">
      {" "}
      Selected Repo: {currentRepo ? currentRepo.org_name : null}{" "}
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    currentStudent: state.selectedStudent,
    currentRepo: state.selectedProject
  };
};

export default connect(mapStateToProps)(Display);
