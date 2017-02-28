var Dyno = require('dyno');
var makeTable = require('./make-table');
var makeItem = require('./make-item');

module.exports = function() {
  
  var out = {};

  out.name = 'just-teardown';
  
  out.teardown = function(cb) {
    setTimeout(cb, 0);
  };

  return out;

};
