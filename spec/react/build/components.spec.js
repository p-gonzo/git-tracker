"use strict";

// This file is written in ES5 since it's not transpiled by Babel.

/* This file does the following:
 1. Sets Node environment variable
 2. Registers babel for transpiling our code for testing
 3. Disables Webpack-specific features that Mocha doesn't understand.
 4. Requires jsdom so we can test via an in-memory DOM in Node
 5. Sets up global vars that mimic a browser.
This setting assures the .babelrc dev config (which includes
 hot module reloading code) doesn't apply for tests.
 But also, we don't want to set it to production here for
 two reasons:
 1. You won't see any PropType validation warnings when
 code is running in prod mode.
 2. Tests will not display detailed error messages
 when running against production version code
*/
var documentRef;
process.env.NODE_ENV = "test"; // Register babel so that it will transpile ES6 to ES5 before our tests run.

require("babel-register")(); // Disable webpack-specific features for tests since
// Mocha doesn't know what to do with them.

require.extensions[".css"] = function() {
  return null;
}; // Configure JSDOM and set global variables
// to simulate a browser environment for tests.

var jsdom = require("jsdom").jsdom;

var exposedProperties = ["window", "navigator", "document"];
global.document = jsdom("");
global.navigator = {
  userAgent: "node.js"
};
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(function(property) {
  if (typeof global[property] === "undefined") {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});
documentRef = document;
("use strict");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _enzyme = require("enzyme");

var _enzymeAdapterReact = _interopRequireDefault(
  require("enzyme-adapter-react-16")
);

var _sinonConfig = _interopRequireDefault(require("../../sinon.config.js"));

var _githubMock = _interopRequireDefault(require("../../github.mock.js"));

var _actions = _interopRequireDefault(
  require("../../../src/actions/actions.js")
);

var _repo = _interopRequireDefault(require("../../../src/components/repo.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_sinonConfig.default.setUp(_githubMock.default, "logger");

_sinonConfig.default.setUp(_actions.default, "SET_CURRENT_PROJECT");

var globals = {};
var fakeRepo = {
  org_name: "CHOAM",
  repo_name: "atreides-admin",
  group_name: "Padishah",
  group_members: ["Princess Irulan", "Shaddam IV", "The Baron Harkonnen"]
};
(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact.default()
});
describe("Repo component", function() {
  before(function() {
    globals.repo = (0, _enzyme.shallow)(
      _react.default.createElement(_repo.default, {
        repo: fakeRepo,
        select: function select() {}
      })
    );
  });
  it("should render the name of the repo", function() {
    var children = globals.repo.find(".card").children();
    (0, _chai.expect)(children).to.have.length(3);
    (0, _chai.expect)(children.at(0).text()).to.equal(fakeRepo.group_name);
  });
  it("should send an AJAX request for the branches of the repo", function() {
    setTimeout(function() {
      (0, _chai.expect)(_githubMock.default.logger.callCount).to.equal(1);
    }, 1000);
  });
  it("should render a selector with one option for each branch", function() {
    setTimeout(function() {
      var numOptions = globals.repo.find("select").children().length;
      (0, _chai.expect)(numOptions).to.equal(3);
    }, 1000);
  });
});
("use strict");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _enzyme = require("enzyme");

var _enzymeAdapterReact = _interopRequireDefault(
  require("enzyme-adapter-react-16")
);

var _student = _interopRequireDefault(
  require("../../../src/components/student.js")
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var globals = {};
var fakeStudent = {
  name: "Duke Leto Atreides",
  "github-handle": "theSleeperMustAwaken"
};
(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact.default()
});
describe("Student component", function() {
  beforeEach(function() {
    globals.student = (0, _enzyme.shallow)(
      _react.default.createElement(_student.default, {
        student: fakeStudent
      })
    );
  });
  it("should render the name of the student", function() {
    (0, _chai.expect)(globals.student.children()).to.have.length(1);
    (0, _chai.expect)(globals.student.children().text()).to.equal(
      fakeStudent.name
    );
  });
});
