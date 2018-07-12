import React, { Component } from "react";
import * as $ from "jquery";
import CommitBlade from "./components/commit-blade.js";
import StudentBlade from "./components/student-blade.js";
import RepoBlade from "./components/repo-blade.js";
import Display from "./components/display.js";

require("dotenv").config();

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="v-container">
        <img
          className="background"
          src="https://c.pxhere.com/photos/c1/04/beach_steps_lonely_away_sand_sandy_feet_nature-554283.jpg!d"
        />
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
