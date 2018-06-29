let mongoose = require('mongoose');
let request = require('request');


let commitSchema = new mongoose.Schema({
  git_id: String,
  title: String,
  created_at: Date,
  author: String,
  author_avatar: String,
  comments_url: String,
  url: String,
  user_html_url: String,
  additions: Number,
  deletions: Number
})

let Commit = mongoose.model('commit', commitSchema);


Commit.fromGithubData = (githubRepoResponse) => {
  let { author, commit } = githubRepoResponse;
  if (!author) console.warn('no author specified for commit.')
  if (!commit) console.warn('no commit details specified for commit.')

  let newDoc = {
    title: githubRepoResponse.commit.message,
    user_html_url: (githubRepoResponse.author && githubRepoResponse.author.html_url) || '',
    author_avatar: (githubRepoResponse.author && githubRepoResponse.author.avatar_url) || '',
    git_id: githubRepoResponse.sha || '',
    created_at: new Date(githubRepoResponse.commit.committer.date) || new Date(),
    author: (githubRepoResponse.author && githubRepoResponse.author.login) || 'Someone',
    comments_url: githubRepoResponse.comments_url || '',
    url: githubRepoResponse.url || ''
  }
  return newDoc;
}

Commit.prototype.getAll = () => {
  return new Promise((resolve, reject) => {
    Commit
    .find({})
    .exec((err, docs) => {
      if(err) reject(err)
      resolve(docs)
    })
  })
}

Commit.prototype.upsert = (document) => {
  return new Promise((resolve, reject) => {
    if(!document || !document.sha) reject(new Error('No document specified!'))
    let document_id = document.sha;

    let q = Commit
    .findOneAndUpdate({git_id: document_id}, Commit.fromGithubData(document), {upsert: true, new: true})
      q.exec((err, doc) => {
      if(err) console.log('ERROR in commit.js ll. 54: ', err);
      if(!doc) { // findOneAndUpdate returns null when it upserts.
        Commit
        .find({git_id: document_id})
        .exec((err, commit) => {
          if(err) console.log(err);   
          resolve(commit);
        }) 
      } else {
        resolve(doc)
      }
    });
  })
}

Commit.prototype.expand = (doc) => {
  return new Promise((resolve, reject) => {
    request({
      url: doc.url,
      headers: {
        "Authorization": "token " + process.env.GITHUB_TOKEN,
        "User-Agent": "git-tracker"
      }
    }, (error, response, body) => {
      if(error) {
        reject(error)
      } else if(!!response) {
        resolve(JSON.parse(response.toJSON().body))
      } else {reject(new Error('empty response'))};
    })
  })
}



module.exports = Commit;