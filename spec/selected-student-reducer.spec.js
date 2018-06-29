let selectedStudentReducer = require('../src/reducers/selected-student.js');

let expect = require('chai').expect;

describe('Selected Student reducer', function() {
  it('should be a function', () => {
    expect(selectedStudentReducer).to.be.a('function');
  })

  it('should return an array when no previous state is passed', () => {
    expect(selectedStudentReducer(undefined, {})).to.deep.equal(null);
  })

  it('should set the entire state to payload when a SET_CURRENT_STUDENT action is received', () => {
    
    let student = {
      "name": "Testy Testerson",
      "github-handle": "testmebro"
    };
    
    let action = {
      type: "SET_CURRENT_STUDENT",
      payload: student
    }
    
    expect(selectedStudentReducer(undefined, action)).to.deep.equal(student);
  })
})