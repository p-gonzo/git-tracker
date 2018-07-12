import React, { Component } from "react";
import PropTypes from "prop-types";
import Student from "./student.js";
import { connect } from "react-redux";
import { SET_CURRENT_STUDENT, SET_STUDENTS } from "../actions/actions.js";
import * as $ from "jquery";

import * as ReactTransitions from "react-transition-group"; // ES5 with npm

let id = 0;
let isTransitioning = false;

class StudentBlade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedNames: []
    };
  }

  componentDidMount(nextProps, nextState) {
    this.props.loadStudents();
  }

  filterStudentsByRepo(cb) {
    if (this.state.currentRepo === null) {
      this.setState({ displayedNames: this.props.students }, cb);
    } else {
      this.setState(
        {
          displayedNames: this.props.students.filter(student =>
            this.props.selectedStudents.includes(student.name)
          )
        },
        cb
      );
    }
  }

  render() {
    return this.props.isHidden() ? (
      <div className="blade">
        <h3> Tracked Students ({this.props.students.length} found) </h3>
        {this.props.students.map(student => (
          <Student
            key={id++}
            isSelected={
              this.props.currentStudent &&
              this.props.currentStudent.name === student.name
            }
            select={this.props.selectStudent}
            student={student}
          />
        ))}
      </div>
    ) : null;
  }
}

Student.propTypes = {
  currentStudent: PropTypes.shape({
    "github-handle": PropTypes.string,
    name: PropTypes.string
  }),
  students: PropTypes.arrayOf(PropTypes.object),
  selectStudent: PropTypes.func,
  isHidden: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    students: state.students.filter(
      st =>
        state.selectedProject &&
        state.selectedProject.group_members.includes(st.name)
    ),
    selectedStudent: state.currentStudent,
    isHidden: () => !!state.selectedProject
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectStudent: student => {
      dispatch(SET_CURRENT_STUDENT(student));
    },
    loadStudents: () => {
      $.get("/api/students").then(students => {
        dispatch(SET_STUDENTS(students));
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentBlade);
