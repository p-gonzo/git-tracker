import React, { Component } from 'react';
import ExpandedCommit from './expanded-commit.js';
import * as $ from 'jquery';


class Commit extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      details: null
    }
  }

  render() {
    return (
      <div className="card small-text" onClick={() => this.setState({isExpanded: !this.state.isExpanded})}>
        <span className="bold">{ this.props.commit.author }</span> committed at <span className="bold">{ this.props.commit.created_at }</span> with the following message: <span className="italic">{ this.props.commit.title }</span>
        <ExpandedCommit commit={this.props.commit} commitDetails={this.props.details} hidden={!this.state.isExpanded} />
      </div>
    );
  }
}

export default Commit;
