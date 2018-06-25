let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let db = require('../db/config.js')

let api = require('./api.js');

let app = express();

app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, '../public')))
app.use('/dist', express.static(path.join(__dirname, '../dist')))
app.use('/api', api);

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.listen(process.env.PORT || 3000, () => {
  console.log('server listening on port ' + (process.env.PORT || 3000))
})
