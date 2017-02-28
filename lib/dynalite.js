module.exports = function(opts) {
  const dynalite = require('dynalite')(opts.config);

  const port = 4567;

  const dyno = require('dyno')({
    endpoint: `http://localhost:${port}`,
    table: 'test',
    region: 'test'
  });

  const hasTables = opts.tables.length > 0;

  return {
    name: 'dynalite',
    setup: setup,
    teardown: teardown
  }

  function setup(cb) {
    dynalite.listen(port, function(err) {
      if (err) return cb(err);
      createTables(opts.tables, cb);
    });
  };

  function teardown(cb) {
    dynalite.close(cb);
  };

  function createTables (tables, cb) {
    const table = tables[0]
    if (table === undefined) return cb();
    dyno.createTable(table, function(err) {
      if (err) return cb(err);
      createTables(tables.slice(1), cb);
    });
  };

};

