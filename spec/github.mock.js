var nock = require("nock");
var fakeData = require("../src/commit-data.json");
let fakeBranches = require("./data/branches.json");

var fakeGithub = nock("https://api.github.com/");
fakeGithub._stats = { _callcount: 0, resp: [] };

function logify(msg) {
  console.log(msg);
}

fakeGithub
  .log(logify)
  .get("/repos/test/test/pulls")
  .query(queryObj => {
    let { state, per_page, type } = queryObj;
    return state === "all" && per_page === "1" && type === "owner";
  })
  .reply(200, fakeData[0])
  .persist();

fakeGithub
  .log(logify)
  .get("/repos/test/test/pulls")
  .query(queryObj => {
    let { state, per_page } = queryObj;
    return state === "all" && per_page === "500";
  })
  .reply(200, fakeData)
  .persist();

fakeGithub
  .log(logify)
  .get("/repos/CHOAM/atreides-admin/branches")
  .reply(200, fakeBranches)
  .persist();

module.exports = fakeGithub;
