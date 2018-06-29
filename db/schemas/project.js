let mongoose = require('mongoose');
let github = require('./git-fetch.js');
let Commit = require('./commit.js');

let projectSchema = new mongoose.Schema({
  "org_name": String,
  "repo_name": String,
  "group_name": String,
  "group_members": [String],
  "last_commit_number": {type: Number, default: -Infinity}
})

projectSchema.methods.getMostRecentCommit = function() {
  return github(this, 1)
  .then((latestCommit) => {
    return latestCommit;
  })
}

projectSchema.methods.shouldUpdate = function(comparisonID) {
  comparisonID = Number(comparisonID)
  let id = this.last_commit_number;
  return (id !== comparisonID)
}

projectSchema.methods.maybeGetCommits = function() {
  return new Promise((resolve, reject) => {
    if(this.shouldUpdate()) {
      resolve(this.getCommits());
    } else {
      resolve(null);
    }
  })
}

projectSchema.methods.getCommits = function() {
  return github(this)
  .then((commits) => {
    if(!commits || !commits.length) {
      return new Error('bad request')
    }
    let docs = commits
    .map((commit) => {
      console.log('~~~~~~~~~', commit)
      return new Commit(commit)
      .upsert(commit)
      .catch((err) => {
        console.error(err)
        return undefined;
      });
    });

    return Promise
    .all(docs)
    .then((resolved) => {
      return resolved.filter(item => item !== undefined);
    });
  })
  .catch((err) => {
    console.error(err);
  })
}

// projectSchema.methods.

let Project = mongoose.model('project', projectSchema);

Project.prototype.getAll = () => {
  return new Promise((resolve, reject) => {
    Project
    .find({})
    .exec((err, docs) => {
      if(err) reject(err)
      resolve(docs)
    })
  })
}

Project.fromID = (id) => {
  return new Promise((resolve, reject) => {
    Project.findById(id).exec((err, doc) => {
      if(err || !doc) {
        reject(err);
      } else {
        resolve(doc)
      }
    })
  })
}

module.exports = Project;