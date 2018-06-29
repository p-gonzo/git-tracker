let request = require('request');
let Commit = require('./commit.js');
let Project = require('./project.js');

// request comes in
  // if commit already saved
    // retrieve from DB
  // else 
    // request resource from GitHub
    // serve it
    // save it to db


const githubFetch = (project, pageLimit=500) => {
  return new Promise((resolve, reject) => {
    let commitUrl = `https://api.github.com/repos/${project.org_name}/${project.repo_name}/commits?state=all&per_page=${pageLimit}&type=owner`
    request({
      url: commitUrl,
      headers: {
        "Authorization": "token " + process.env.GITHUB_TOKEN,
        "User-Agent": "git-tracker"
      }
    }, (error, response, body) => {
      if(error) {reject(error)}
      else {resolve(JSON.parse(response.toJSON().body))}
    })
  })
}

module.exports = githubFetch;