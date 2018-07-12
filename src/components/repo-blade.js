import React, { Component } from "react";
import Repo from "./repo.js";
import { connect } from "react-redux";
import { SET_CURRENT_PROJECT, SET_PROJECTS } from "../actions/actions.js";
import * as $ from "jquery";

let id = 0;

class RepoBlade extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadRepos();
  }

  shouldComponentUpdate(nextProps, nextState) {
    let selectedMatch = this.props.selectedRepo === nextProps.selectedRepo;
    let repoListMatch = this.props.repos === nextProps.repos;
    return !repoListMatch || !selectedMatch;
    // return true;
  }

  render() {
    return (
      <div className="blade">
        <h3> Tracked Repos </h3>
        {this.props.repos.map(repo => (
          <Repo
            key={id++}
            select={() => this.props.selectRepo(repo)}
            isSelected={
              this.props.selectedProject &&
              this.props.selectedProject.repo_name === repo.repo_name
            }
            repo={repo}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    repos: state.projects,
    selectedProject: state.selectedProject
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectRepo: project => {
      dispatch(SET_CURRENT_PROJECT(project));
    },
    loadRepos: () => {
      $.get("/api/projects").then(projects => {
        dispatch(SET_PROJECTS(projects));
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepoBlade);
