let express = require('express');
let Router = new express.Router();
let request = require('request')
let Student = require('../db/schemas/student.js')
let Project = require('../db/schemas/project.js')
let Commit = require('../db/schemas/commit.js')
require('dotenv').config();

Router.get('/students', (req, res) => {
  Student()
  .getAll()
  .then(d => res.status(200).send(d))
  .catch(e => res.status(500).send('Internal Server Error'))
})

Router.get('/projects', (req, res) => {
  Project()
  .getAll()
  .then(d => res.status(200).send(d))
  .catch(e => res.status(500).send('Internal Server Error'))
})

Router.get('/commits', (req, res) => {
  Commit()
  .getAll()
  .then(d => res.status(200).send(d))
  .catch(e => res.status(500).send('Internal Server Error'))
})

Router.post('/commits/expand/:commit_id', (req, res) => {
  if(!req.params || !req.params.commit_id || req.params.commit_id === "undefined") {
    res.status(400).send('no commit ID attached to request.');
    return;
  }

  Commit.findById(req.params.commit_id).exec((err, doc) => {
    if(err) {
      res.status(500).send('Server error :(');
      return;
    } else if(!doc) {
      res.status(404).send('Not found :(');
      return;
    } 
    new Commit()
    .expand(doc)
    .then((expandedDoc) => {
      return new Commit()
      .upsert(expandedDoc)
    })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Failed to upsert.')
    })
  })
});

// Router.get('/commits/:commit_id', (req, res) => {
//   // get specific commit from DB.
// })

Router.get('/commits/byProject/:project_id', (req, res) => {
  if(!req.params || !req.params.project_id) {
    res.status(400).send('no project ID attached to request.')
  }
  Project.fromID(req.params.project_id)
  .then((project) => {
    return project.getCommits(req.params.project_id)
  })
  .then((data) => {
    res.status(200).send(data);
  })
  .catch(() => {
    res.status(404).send('Resource not found');
  });
})

module.exports = Router;