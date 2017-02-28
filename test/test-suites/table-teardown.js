var Dyno = require('dyno');
var makeTable = require('./make-table');
var makeItem = require('./make-item');

module.exports = function() {
  
  var out = {};

  out.name = 'table-teardown';
  var tableName = 'table-teardown';

  out.tables = [makeTable(tableName)];

  var endpoint = 'http://localhost:4567';

  out.setup = function(cb) {
    var dyno = Dyno({
      endpoint: endpoint,
      table: tableName,
      region: 'test'
    });

    dyno.putItem({ Item: makeItem() }, cb);
  };
  
  out.teardown = function(cb) {
    setTimeout(cb, 0);
  };

  return out;

};
