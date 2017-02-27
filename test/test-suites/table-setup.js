var Dyno = require('dyno');
var makeTable = require('./make-table');
var makeItem = require('./make-item');

module.exports = function() {
  
  var out = {};

  out.tables = [makeTable('table-setup')];

  var tableName = out.tables[0].TableName;

  out.setup = function(config, cb) {
    var dyno = Dyno({
      endpoint: config.endpoint,
      table: tableName
    });

    dyno.insertItem(makeItem(), cb);
  };

  return out;

};
