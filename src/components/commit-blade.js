import React, { Component } from 'react';
import Commit from './commit.js';
import * as $ from 'jquery';


let id = 0;

class CommitBlade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commitDetails: [],
      additions: 0,
      deletions: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props)
    this.getCommitDetails(nextProps.data);
  }

  reduceAdditions() {
    let totalAdditions = this.state.commitDetails.reduce((total, currentCommit) => {
      return total + currentCommit.additions;
    }, 0)
    this.setState({additions: totalAdditions});
  }

  reduceDeletions() {
    let totalDeletions = this.state.commitDetails.reduce((total, currentCommit) => {
      return total + currentCommit.deletions;
    }, 0)
    this.setState({deletions: totalDeletions});
  }

  getCommitDetails(commits) {
    if(!Array.isArray(commits)) return;
    let commitDetails = commits.map((commit) => {
      console.log(commit)
      return $.post({
        url: '/api/commits/expand/' + commit._id,
      }).catch(e => {
        console.log(e.getAllResponseHeaders());
        return null;
      })
    });

    Promise.all(commitDetails)
    .then(details => {
      this.setState({commitDetails: details}, () => {
        this.reduceDeletions();
        this.reduceAdditions();
        console.log('STATE: ', this.state)
      })
    })
    .catch((e) => {throw e})
  }

  render() {
    return this.props.isHidden ? (
      <div className="blade">
        <h3> Commits ({this.props.data.length} found) </h3>
        <div className={"small-text"}>( Total additions: {this.state.additions} Total deletions: {this.state.deletions})</div>
        { this.props.data.length === 0 ? <span> No commits found </span> : null }
        { 
          this.props.data ? this.props.data.map((commit, idx) => {
            return (<Commit key={id++} data={commit} details={this.state.commitDetails ? this.state.commitDetails[idx] : null}/>)
          }) : null
        }
      </div>
    ) : null ;
  }
}


export default CommitBlade;
