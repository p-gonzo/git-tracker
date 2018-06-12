import React, { Component } from 'react';
import Student from './student.js';

class StudentBlade extends Component {
  render() {
    return (
      <div>
        {
          this.props.students.map((student) => <Student select={this.props.selectStudent} student={student}/>)
        }
      </div>
    );
  }
}

export default StudentBlade;
