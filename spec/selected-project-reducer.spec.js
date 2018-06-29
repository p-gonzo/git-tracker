let selectedProjectReducer = require('../src/reducers/selected-project.js');

let expect = require('chai').expect;

describe('Selected Project reducer', function() {
  it('should be a function', () => {
    expect(selectedProjectReducer).to.be.a('function');
  })

  it('should return an array when no previous state is passed', () => {
    expect(selectedProjectReducer(undefined, {})).to.deep.equal(null);
  })

  it('should set the entire state to payload when a SET_CURRENT_PROJECT action is received', () => {
    
    let project =   {
      "org_name": "Test",
      "repo_name": "Test",
      "group_name": "Test",
      "group_members": ["Person 1", "Person 2"]
    };
    
    let action = {
      type: "SET_CURRENT_PROJECT",
      payload: project
    }
    
    expect(selectedProjectReducer(undefined, action)).to.deep.equal(project);
  })
})