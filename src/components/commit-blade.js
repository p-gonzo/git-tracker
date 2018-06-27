import React, { Component } from 'react';
import Commit from './commit.js';
import AddDelSummary from './add-del-summary.js';
import Filter from './utility/filter.js';
import Spinner from './utility/spinner.js';
import * as $ from 'jquery';

let id = 0;

class CommitBlade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      commitDetails: [],
      additions: 0,
      deletions: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    this.getCommitDetails(nextProps.commits);
    if(nextProps.commits !== this.props.commits) {
      this.setState({
        showing: false,
        commitDetails: [],
        additions: 0,
        deletions: 0
      })
    }
  }

  componentDidUpdate() {
    if(
      this.props.isLoading === false &&
      this.state.showing === true
    ) {
      this.setState({showing: false});
    } else if(
      this.props.isLoading === true &&
      this.state.showing === false
    ) {
      this.setState({showing: true});
    }

  }

  reduceAdditions() {
    let totalAdditions = this.state.commitDetails.reduce((total, currentCommit) => {
      if(!currentCommit) return total;
      return total + currentCommit.additions;
    }, 0)
    this.setState({additions: totalAdditions});
  }

  reduceDeletions() {
    let totalDeletions = this.state.commitDetails.reduce((total, currentCommit) => {
      if(!currentCommit) return total;
      return total + currentCommit.deletions;
    }, 0)
    this.setState({deletions: totalDeletions});
  }

  getCommitDetails(commits) {
    if(!Array.isArray(commits)) return;
    let commitDetails = commits.map((commit) => {
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
      })
    })
    .catch((e) => {throw e})

  }

  render() {
    return this.props.open ? (
      <div className="blade">
        <h3> Commits ({this.props.commits.length} found) </h3>
        <AddDelSummary additions={this.state.additions} deletions={this.state.deletions}/>
        { this.props.commits.length === 0 ? <span> No commits found </span> : null }
        { 
          this.state.showing ? 
          <Filter by={(childProps) => ((this.props.currentStudent === null) || (childProps.commit.author === this.props.currentStudent["github-handle"]))}> 
            {
              this.props.commits.map((commit, idx) => {
                return (<Commit key={id++} commit={commit} details={this.state.commitDetails ? this.state.commitDetails[idx] : null}/>)
              }) 
            }
          </Filter> : <Spinner />
        }
      </div> 
    ) : null;
  }
}


export default CommitBlade;
