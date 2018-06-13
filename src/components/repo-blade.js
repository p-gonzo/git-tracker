import React, { Component } from 'react';
import Repo from './repo.js';

let id = 0;

class RepoBlade extends Component {
  render() {
    return (
      <div className="blade">
        <h3> Tracked Repos </h3>
        {
          this.props.repos.map((repo) => <Repo key={id++} isSelected={this.props.selectedRepo === repo} select={this.props.selectRepo} repo={repo}/>)
        }
      </div>
    );
  }
}

export default RepoBlade;
