import React, { Component } from 'react';
import Repo from './repo.js';

let id = 0;

class RepoBlade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let selectedMatch = (this.state.selected === nextState.selected);
    let repoListMatch = (this.props.repos === nextProps.repos);
    console.log(selectedMatch, this.state.selected, nextState.selected)
    return !repoListMatch || !selectedMatch;
    // return true;
  }

  selectRepo(repo) {
    console.log('>>>>', repo)
    // this.props.selectRepo(repo);  // call any functionality inherited from the parent
    this.setState({selected: repo})
  }

  render() {
    console.log('re-render', this.state.selected)
    return (
      <div className="blade">
        <h3> Tracked Repos </h3>
        {
          this.props.repos.map((repo) => <Repo 
            key={id++} 
            select={this.props.selectRepo} 
            isSelected={this.state.selected === repo}
            repo={repo}
          />)
        }
      </div>
    );
  }
}

export default RepoBlade;
