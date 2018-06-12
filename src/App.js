import React, { Component } from 'react';
import * as $ from 'jquery';
import CommitBlade from './components/commit-blade.js';
import StudentBlade from './components/student-blade.js';
import RepoBlade from './components/repo-blade.js';
import './App.css';
import * as allStudents from './student-directory.json';
import * as allRepos from './project-directory.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: allStudents,
      currentStudent: null,
      repos: allRepos,
      currentRepo: null,
      commits: [],
    }
    this.maybeGetCommits();
  }

  setCurrentStudent(student) {
    this.setState({currentStudent: student})
  }

  setCurrentRepo(repo) {
    this.setState({currentRepo: repo})
  }

  maybeGetCommits() {
    if(this.state.currentRepo) {
      this.getCommits();
    }
  }

  componentDidUpdate(oldProps, oldState) {
    this.maybeGetCommits();
  }

  getCommits() {
    $.get(`https://api.github.com/repos/${this.state.currentRepo.org_name}/${this.state.currentRepo.repo_name}/pulls?state=all`)
    .done((resp) => {
      this.setState({commits: resp});
    })
    .fail((err) => {throw err})
  }

  render() {
    return (
      <div className="container">
        <div>
          <div> Selected Student: { this.state.currentStudent ? this.state.currentStudent.name : null } </div>
          <div> Selected Repo: { this.state.currentRepo ? this.state.currentRepo.org_name : null } </div>
        </div>
        <StudentBlade selectStudent={this.setCurrentStudent.bind(this)} students={this.state.students}/>
        <RepoBlade selectRepo={this.setCurrentRepo.bind(this)} repos={this.state.repos}/>
        <CommitBlade data={this.state.commits}/>
      </div>
    );
  }
}

export default App;
