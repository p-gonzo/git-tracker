let request = require('request');
let Commit = require('./commit.js');
let Project = require('./project.js');


// let commitIsAlreadySaved = (project) => {
//   return new Promise((resolve, reject) => {
//     Project
//     .findById(project._id);
//     .exec((err, doc) => {
//       if(err) reject(err);
//       else {resolve(doc.commits_last_updated)}
//     })
//   })
// }

// let maybeSaveCommit = (commit) => {
//   Commit
//   .findOneAndUpdate({'git_id': commit.id} commit, {upsert: true})
//   .exec(() => {
//     console.log('upserted: ', commit.id);
//   })
// }


// request comes in
  // if commit already saved
    // retrieve from DB
  // else 
    // request resource from GitHub
    // serve it
    // save it to db


const githubFetch = (project) => {
  return new Promise((resolve, reject) => {
    let commitUrl = `https://api.github.com/repos/${project.org_name}/${project.repo_name}/pulls?state=all`
    request({
      url: commitUrl,
      headers: {
        "Authorization": "token " + process.env.GITHUB_TOKEN,
        "User-Agent": "git-tracker"
      }
    }, (error, response, body) => {
      if(error) {console.log('err:', err)}
      resolve(JSON.parse(response.toJSON().body))
    })
  })
}

module.exports = githubFetch;