import React, { Component } from 'react';

class Repo extends Component {

  handleClick(e) {
    this.props.select(this.props.repo)
  }

  render() {
    console.log(this.props.repo)
    return (
      <div onClick={this.handleClick.bind(this)}>
        { this.props.repo.org_name }
      </div>
    );
  }
}

export default Repo;
