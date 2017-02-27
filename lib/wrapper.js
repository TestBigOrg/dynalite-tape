var dynaliteSuite = require('./dynalite');

module.exports = function(tape, config, suites) {
  const tables = suites.reduce((m, s) => m.concat(s.tables || []), []);

  const dynaliteConfig = {
    config: config,
    tables: tables
  };
  
  suites = [dynaliteSuite(dynaliteConfig)].concat(suites);

  const names = suites.map(s => s.name);
  const setups = pull('setup', suites);
  const teardowns = pull('teardown', suites);

  var api = function(msg, callback) {
    tape(msg, function(assert) {
      assertFn(assert, callback);
    });
  };

  api.skip = function(msg, callback) {
    tape.skip(msg, callback);
  };

  api.only = function(msg, callback) {
    tape.only(msg, function(assert) {
      assertFn(assert, callback);      
    });
  };

  function assertFn(assert, callback) {
    assert.test('setup', run(names, setups));
    assert.test('test', callback);
    assert.test('teardown', run(names, teardowns));
  };

  return api;
};

function pull(attr, list) {
  return list.filter(i => i[attr] !== undefined).reduce((m, i) => { 
    m[i.name] = i[attr];
    return m;
  }, {});
};

function run(names, fns) {
  return function(assert) {
    var name = names[0];
    if (name === undefined) return assert.end();
    fns[name](function(err) {
      if (err) assert.fail(name);
      if (err) return assert.end(err);
      run(names.slice(1), fns)(assert);
    });
  };
};
