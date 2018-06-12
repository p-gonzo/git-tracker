import React, { Component } from 'react';
import Commit from './commit.js'

class CommitBlade extends Component {
  render() {
    return (
      <div>
        { 
          this.props.data.map((commit) => {
            return (<Commit data={commit}/>)
          }) 
        }
      </div>
    );
  }
}


export default CommitBlade;
