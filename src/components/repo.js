import React, { Component } from 'react';
import ShyDiv from './utility/shy-div.js';
import * as $ from 'jquery';

class Repo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      branches: []
    }
  }

  handleClick(e) {
    this.props.select(this.props.repo)
    this.getBranches();
  }

  getBranches() {
    $.get(`https://api.github.com/repos/${this.props.repo.org_name}/${this.props.repo.repo_name}/branches`)
    .then(data => this.setState({branches: data}))
  }

  render() {
    return (
      <div className={'hoverable card ' + (this.props.isSelected ? 'selected' : '')} onClick={this.handleClick.bind(this)}>
        { this.props.repo.group_name }
        <a className="tiny-text" href={`https://www.github.com/${this.props.repo.org_name}/${this.props.repo.repo_name}`} target="_blank">(View on GitHub)</a>
          <select>
            {
              this.state.branches.map(branch => <option value= { branch.name }> { branch.name } </option>)
            }
          </select>
        /> 
      </div>
    );
  }
}

export default Repo;
