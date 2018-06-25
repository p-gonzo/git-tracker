import React, { Component } from 'react';
import * as $ from 'jquery';
import CommitBlade from './components/commit-blade.js';
import StudentBlade from './components/student-blade.js';
import RepoBlade from './components/repo-blade.js';
import Display from './components/display.js';

require('dotenv').config()

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentsAreShowing: false,
      students: [],
      currentStudent: null,
      repos: [],
      currentRepo: null,
      commits: [],
      filteredCommits: []
    }
    this.maybeGetCommits();
  }

  componentDidMount() {
    $.get('/api/students')
    .then((students) => {
      this.setState({students})
    })
    .catch(e => {throw e})
    $.get('/api/projects')
    .then((projects) => {
      this.setState({repos: projects})
    })
    .catch(e => {throw e})
  }

  filterCommitsByStudent() {
    if(this.state.currentStudent === null) {
      this.setState({
        filteredCommits: this.state.commits
      })
    } else {
      this.setState({
        filteredCommits: this.state.commits.filter((commit => 
          commit.author === this.state.currentStudent['github-handle']
        ))
      })
    }
  }

  setCurrentStudent(student) {
    this.setState({currentStudent: student}, () => {
      this.filterCommitsByStudent();
    })
  }

  setCurrentRepo(repo) {
    let stateUpdate = {
      currentRepo: repo, 
      studentsAreShowing: true
    }
    if(this.state.currentStudent && !repo.group_members.includes(this.state.currentStudent.name)) {
      stateUpdate.currentStudent = null;
    }
    this.setState(stateUpdate)
  }

  maybeGetCommits(oldCurrentRepo) {
    if(this.state.currentRepo && this.state.currentRepo !== oldCurrentRepo) {
      this.getCommits();
    }
  }

  componentDidUpdate(oldProps, oldState) {
    this.maybeGetCommits(oldState.currentRepo);
  }

  getCommits() {
    $.get(`/api/commits/byProject/${this.state.currentRepo._id}`)
    .done((resp) => {
      console.log(resp)
      if(!resp) {return;}
      this.setState({commits: resp}, () => {
        this.filterCommitsByStudent();
      });
    })
    .fail((err) => {console.log(err.getAllResponseHeaders())})
  }

  render() {
    return (
      <div className="v-container">
          <Display
            currentStudent={this.state.currentStudent}
            currentRepo={this.state.currentRepo}
          />
        <div className="container">
          <RepoBlade 
            selectRepo={this.setCurrentRepo.bind(this)} 
            repos={this.state.repos} 
            selectedRepo={this.state.currentRepo}
          />
          <StudentBlade 
            isHidden={!!this.state.studentsAreShowing} 
            selectedStudents={this.state.currentRepo ? this.state.currentRepo.group_members : []}
            currentStudent={this.state.currentStudent}
            selectStudent={this.setCurrentStudent.bind(this)} 
            students={this.state.students}
          />
          <CommitBlade 
            isHidden={!!this.state.currentRepo} 
            data={this.state.filteredCommits}
          />
        </div>
      </div>
    );
  }
}

export default App;
