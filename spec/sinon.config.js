let sinon = require('sinon');

module.exports = {
  setUp: (object, method) => {
    sinon.spy(object, method);
  }, 
  tearDown: () => {

  }
}

