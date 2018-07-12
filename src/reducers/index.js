/*
  Shape of root state:

  {
    projects: Array,
    selectedProject: Object,
    students: Array,
    selectedStudent: Object,
    commits: Array,
    selectedCommit: Object
  }

*/

import { combineReducers } from "redux";

const projects = require("./projects.js");
const selectedProject = require("./selected-project.js");
const students = require("./students.js");
const selectedStudent = require("./selected-student.js");
const commits = require("./commits.js");
const selectedCommit = require("./selected-commit.js");

export default combineReducers({
  projects,
  selectedProject,
  students,
  selectedStudent,
  commits,
  selectedCommit
});
