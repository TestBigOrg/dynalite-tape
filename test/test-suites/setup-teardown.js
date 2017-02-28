var Dyno = require('dyno');
var makeTable = require('./make-table');
var makeItem = require('./make-item');

module.exports = function() {
  
  var out = {};

  out.name = 'setup-teardown';

  out.setup = function(cb) {
    setTimeout(cb, 0);
  };
  
  out.teardown = function(cb) {
    setTimeout(cb, 0);
  };

  return out;

};
