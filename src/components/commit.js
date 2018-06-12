import React, { Component } from 'react';

class Commit extends Component {
  render() {
    return (
      <div>
        <h3>{ this.props.data.title }</h3>
        <div>{ this.props.data.user.login }</div>
        <div>{ this.props.data.state }</div>
        <hr/>
      </div>
    );
  }
}

export default Commit;
