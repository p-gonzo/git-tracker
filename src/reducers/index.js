/*
  Shape of root state:

  {
    projects: Array,
    selectedProjectIndex: Number,
    students: Array,
    selectedStudentIndex: Number,
    commits: Array,
    selectedCommitIndex: Number
  }

  Necessary actions:

  --add

*/

import { combineReducers } from 'redux';

const projects = require('./projects.js');
const selectedProject = require('./selected-project.js')
const students = require('./students.js')

const selectedStudent = (state=[], action) => {
  switch(action.type) {
    default: 
      return state 
  } 
}

const commits = (state=[], action) => {
  switch(action.type) {
    default: 
      return state 
  } 
}

const selectedCommit = (state=[], action) => {
  switch(action.type) {
    default: 
      return state 
  } 
}

export default combineReducers({
  projects,
  selectedProject,
  students,
  selectedStudent,
  commits,
  selectedCommit
})
