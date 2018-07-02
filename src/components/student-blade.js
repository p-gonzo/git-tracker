import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Student from './student.js';
import * as ReactTransitions from 'react-transition-group'; // ES5 with npm

let id = 0;
let isTransitioning = false;

class StudentBlade extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayedNames: []
    };
  }

  filterStudentsByRepo(cb) {
    if(this.state.currentRepo === null) {
      this.setState({displayedNames: this.props.students}, cb);
    } else {
      this.setState({displayedNames: this.props.students.filter((student => this.props.selectedStudents.includes(student.name)))}, cb)
    }
  }

  render() {
    return (
      this.props.isHidden ? (
      <div className="blade">
        <h3> Tracked Students ({this.props.selectedStudents.length} found) </h3>
          {
            this.props.students
            .filter((student => this.props.selectedStudents.includes(student.name)))
            .map((student) => (<Student 
              key={id++} 
              isSelected={this.props.currentStudent && this.props.currentStudent.name === student.name} 
              select={this.props.selectStudent} 
              student={student}
            />)
            )
          }
      </div>) : null
    );
  }
}

Student.propTypes = {
  currentStudent: PropTypes.shape({
    "github-handle": PropTypes.string,
    "name": PropTypes.string
  }).isRequired,
  selectedStudents: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectStudent: PropTypes.func,
  isHidden: PropTypes.bool.isRequired
}

export default StudentBlade;
