var nock = require('nock');
var fakeData = require('../src/commit-data.json') 

var fakeGithub = nock('https://api.github.com/');

fakeGithub
  .get('/repos/test/test/pulls')
  .query((queryObj) => {
    let {state, per_page, type } = queryObj;
    return (state === 'all' && per_page === '1' && type === 'owner');
  })
  .reply(200, fakeData[0])
  .persist();

fakeGithub
  .get('/repos/test/test/pulls')
  .query((queryObj) => {
    let { state, per_page } = queryObj;
    return (state === 'all' && per_page === '500');
  })
  .reply(200, fakeData)
  .persist();


module.exports = fakeGithub;