import React, { Component } from 'react';

class Repo extends Component {

  handleClick(e) {
    this.props.select(this.props.repo)
  }

  render() {
    return (
      <div className={'hoverable card ' + (this.props.isSelected ? 'selected' : '')} onClick={this.handleClick.bind(this)}>
        { this.props.repo.group_name }
        <a className="tiny-text" href={`https://www.github.com/${this.props.repo.org_name}/${this.props.repo.repo_name}`} target="_blank">(View on GitHub)</a>
      </div>
    );
  }
}

export default Repo;
