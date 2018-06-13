import React, { Component } from 'react';

class Repo extends Component {

  handleClick(e) {
    this.props.select(this.props.repo)
  }

  render() {
    return (
      <div className={'card ' + (this.props.isSelected ? 'selected' : '')} onClick={this.handleClick.bind(this)}>
        { this.props.repo.org_name }
      </div>
    );
  }
}

export default Repo;
