let commitsReducer = require('../src/reducers/commits.js')

let expect = require('chai').expect;

describe('Commits reducer', function() {
  it('should be a function', () => {
    expect(commitsReducer).to.be.a('function');
  })
  it('should return an array when no previous state is passed', () => {
    expect(commitsReducer(undefined, {})).to.deep.equal([]);
  })

  it('should swap the entire state for the payload of a SET_COMMIT action', () => {
    let action = {
      type: "SET_COMMITS",
      payload: [1,2,3]
    }
    let newState = commitsReducer([], action);
    expect(newState).to.deep.equal([1,2,3]);
  })

  it('should add a new commit when the ADD_COMMIT action is received', () => {
    let action = {
      type: "ADD_COMMIT",
      payload: 4
    }
    let newState = commitsReducer([1,2,3], action);
    expect(newState).to.deep.equal([1,2,3,4]);
  })

  it('should remove a project at the specified index when the REMOVE_COMMIT action is received', () => {
    let action = {
      type: "REMOVE_COMMIT",
      payload: 1
    }
    let newState = commitsReducer([1,2,3], action);
    expect(newState).to.deep.equal([1,3]);
  })

})