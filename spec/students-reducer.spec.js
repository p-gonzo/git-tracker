let studentsReducer = require('../src/reducers/students.js')

let expect = require('chai').expect;

describe('Students reducer', function() {
  it('should be a function', () => {
    expect(studentsReducer).to.be.a('function');
  })
  it('should return an array when no previous state is passed', () => {
    expect(studentsReducer(undefined, {})).to.deep.equal([]);
  })

  it('should swap the entire state for the payload of a SET_STUDENTS action', () => {
    let action = {
      type: "SET_STUDENTS",
      payload: [1,2,3]
    }
    let newState = studentsReducer([], action);
    expect(newState).to.deep.equal([1,2,3]);
  })

  it('should add a new project when the ADD_STUDENT action is received', () => {
    let action = {
      type: "ADD_STUDENT",
      payload: 4
    }
    let newState = studentsReducer([1,2,3], action);
    expect(newState).to.deep.equal([1,2,3,4]);
  })

  it('should remove a project at the specified index when the REMOVE_STUDENT action is received', () => {
    let action = {
      type: "REMOVE_STUDENT",
      payload: 1
    }
    let newState = studentsReducer([1,2,3], action);
    expect(newState).to.deep.equal([1,3]);
  })

})