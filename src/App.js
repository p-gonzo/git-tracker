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
  }


  render() {
    return (
      <div className="v-container">
        <Display />
        <div className="container">
          <RepoBlade />
          <StudentBlade />
          <CommitBlade />
        </div>
      </div>
    );
  }
}

export default App;
