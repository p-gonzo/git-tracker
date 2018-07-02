import React, { Component } from 'react';
import Repo from './repo.js';
import { connect } from 'react-redux';
import { SET_CURRENT_PROJECT, SET_PROJECTS } from '../actions/actions.js'
import * as $ from 'jquery';


let id = 0;

class RepoBlade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    }
  }

  componentDidMount() {
    this.props.loadRepos();
  }

  shouldComponentUpdate(nextProps, nextState) {
    let selectedMatch = (this.state.selected === nextState.selected);
    let repoListMatch = (this.props.repos === nextProps.repos);
    return !repoListMatch || !selectedMatch;
    // return true;
  }

  selectRepo(repo) {
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

const mapStateToProps = (state) => {
  console.log('>>>>>', state)
  return {
    repos: state.projects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectRepo: (project) => {
      dispatch(SET_CURRENT_PROJECT(project));
    },
    loadRepos: () => {
      $.get('/api/projects')
      .then(projects => {
        dispatch(SET_PROJECTS(projects))
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoBlade);
