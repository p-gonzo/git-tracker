import React, { Component } from 'react';
import Repo from './repo.js';

class RepoBlade extends Component {
  render() {
    console.log('>>>>>', this.props.repos)
    return (
      <div>
        {
          this.props.repos.map((repo) => <Repo select={this.props.selectRepo} repo={repo}/>)
        }
      </div>
    );
  }
}

export default RepoBlade;
