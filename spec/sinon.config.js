let sinon = require('sinon');
let Project = require('../db/schemas/project.js');

module.exports = {
  setUp: () => {
    sinon.spy(Project.schema.methods, "getCommits");
    return Project;
  }, 
  tearDown: () => {
    Project.schema.methods.getCommits.restore();
  }
}

