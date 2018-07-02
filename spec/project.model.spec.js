require('dotenv').config();

let db = require('../db/config.js');
let nock = require('nock')

let spies = require('./sinon.config.js');

let expect = require('chai').expect;
let Project = require('../db/schemas/project.js');
let githubMock = require('./github.mock.js');
var fakeData = require('../src/commit-data.json') 

let globals = {};
let g = globals;

let PROJECT_DOC = {
  "org_name": "test",
  "repo_name": "test",
  "group_name": "Team Testers",
  "group_members": []
}

describe('Project model', function() {
  describe('getMostRecentCommit', () => {
    it('should be a function', () => {
      let p = new Project(PROJECT_DOC);
      expect(p.getMostRecentCommit).to.be.a('function');
    })
    it('should return a promise', () => {
      let result = new Project(PROJECT_DOC).getMostRecentCommit(PROJECT_DOC);
      expect(result.constructor).to.equal(Promise);
    })
    xit('should resolve to the most recent commit document from the github API', () => {
      let result = new Project(PROJECT_DOC).getMostRecentCommit(PROJECT_DOC);
      return result
      .then((val) => {
        expect(val).to.be.an("object");
        expect(val).to.deep.equal(fakeData[0]);
      });
    })
    it('should reject if invalid data is provided', () => {
      let result = new Project(PROJECT_DOC).getMostRecentCommit({
        "_id": 999999999,
        "org_name": "alton",
        "repo_name": "brown",
        "group_name": "Team Alton Brown",
        "group_members": []
      });
      return result
      .then((val) => {
        throw new Error("unexpected fulfillment of promise.")
      })
      .catch(err => {
        expect(err).to.be.an.instanceof(Error);
      })
    })
  })

  describe('shouldUpdate', () => {
    beforeEach(() => {
      g.proj = new Project(PROJECT_DOC)
    })
    it('should be a function', () => {
      expect(g.proj.shouldUpdate).to.be.a('function');
    })
    it('should take one argument', () => {
      expect(g.proj.shouldUpdate.length).to.equal(1);
    })
    it('should return true if the project should update', () => {
      expect(g.proj.shouldUpdate()).to.equal(true);
    });
    it('should return false if the project should not update', () => {
      let latestID = fakeData[0].id;
      expect(new Project(Object.assign({}, PROJECT_DOC, {last_commit_number: latestID})).shouldUpdate(latestID)).to.equal(false);
    });
  })

  describe('getCommits', () => {
    beforeEach(() => {
      g.proj = new Project(PROJECT_DOC)
    })
    it('should be a function', () => {
      expect(g.proj.getCommits).to.be.a('function');
    })
    it('should take no arguments', () => {
      expect(g.proj.getCommits).to.have.length(0);
    })
    it('should return a promise', () => {
      expect(g.proj.getCommits()).to.be.instanceof(Promise);
    })
    xit('should return all commits associated with the project.', () => {
      return g.proj
      .getCommits()
      .then((response) => {
        
      })
    })
  })

  describe('maybeGetCommits', () => {
    beforeEach(() => {
      g.proj = new Project(PROJECT_DOC)
    })
    it('should be a function', () => {
      expect(g.proj.maybeGetCommits).to.be.a('function');
    })
    it('should take no arguments', () => {
      expect(g.proj.maybeGetCommits).to.have.length(0);
    })
    it('should return a promise', () => {
      expect(g.proj.maybeGetCommits()).to.be.instanceof(Promise);
    })
    xit('should not update db if no update is necessary', () => {
      expect(g.proj.getCommits.calledOnce).to.equal(true);
    })
  })
})


spies.tearDown();
nock.restore();