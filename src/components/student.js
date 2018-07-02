import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Student extends Component {

  handleClick(e) {
    this.props.select(this.props.student)
  }

  render() {
    return (
      <div  className={"hoverable card " + (this.props.isSelected ? 'selected' : '')} onClick={this.handleClick.bind(this)}>
        { this.props.student.name }
      </div>
    );
  }
}

Student.propTypes = {
  student: PropTypes.shape({
    "github-handle": PropTypes.string,
    "name": PropTypes.string
  }).isRequired
}

export default Student;
