let mongoose = require('mongoose');
let github = require('./git-fetch.js');
let Commit = require('./commit.js');

let projectSchema = new mongoose.Schema({
  "org_name": String,
  "repo_name": String,
  "group_name": String,
  "group_members": [String],
  "last_commit_number": Number
})

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

Project.prototype.getCommits = (projectID) => {
  return new Promise((resolve, reject) => {
    Project
    .findById(projectID)
    .exec((err, doc) => {
      if(err) {reject(err)};
      if(!doc || doc === null) {
        reject(new Error('Project not found in DB.'))
      } else {resolve(doc)}
      })
  })
  .then((doc) => {
    return github(doc);
  }) 
  .then((commits) => {
    let docs = commits.map((commit, idx) => {
      let c = new Commit();
      return c.upsert(commit);
    });

    return Promise.all(docs);
  })
  .catch((err) => {
    console.error(err);
  })
}

module.exports = Project;