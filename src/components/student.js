import React, { Component } from 'react';

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

export default Student;
