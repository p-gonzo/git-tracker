import React from "react";
import { connect } from "react-redux";

const Display = ({ currentStudent, currentRepo }) => (
  <div>
    <h1 className="shadowed"> Git Trackin'! </h1>
    <div className="shadowed small-text">
      {" "}
      Selected Student: {currentStudent ? currentStudent.name : null}{" "}
    </div>
    <div className="shadowed small-text">
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
