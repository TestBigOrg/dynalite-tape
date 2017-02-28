var Dyno = require('dyno');
var makeTable = require('./make-table');
var makeItem = require('./make-item');

module.exports = function() {
  
  var out = {};

  var tableName = out.name = 'just-table';

  out.tables = [makeTable(tableName)];

  return out;

};
