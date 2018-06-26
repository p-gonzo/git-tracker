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
  let newDoc = {
    user_html_url: githubRepoResponse.user.html_url || '',
    author_avatar: githubRepoResponse.user.avatar_url|| '',
    git_id: githubRepoResponse.id || '',
    created_at: new Date(githubRepoResponse.created_at) || new Date(),
    author: githubRepoResponse.user.login || '',
  }
  return Object.assign({}, githubRepoResponse, newDoc);
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
    if(!document || !document.id) reject(new Error('No document specified!'))
    let document_id = document.id;
    Commit.findOneAndUpdate({git_id: document_id}, Commit.fromGithubData(document), {upsert: true}, function(err, doc){
      if(err) console.log(err);    
      if(!doc) { // findOneAndUpdate returns null when it upserts.
        Commit.find({git_id: document_id}).exec((err, commit) => {
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
      if(error) throw error;
      resolve(JSON.parse(response.toJSON().body))
    })
  })
}



module.exports = Commit;