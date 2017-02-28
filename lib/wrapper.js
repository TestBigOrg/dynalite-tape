var dynaliteSuite = require('./dynalite');

module.exports = function(tape, config, suites) {
  suites.forEach(s => { if(s.name === undefined) throw new Error('Suites must have a name'); });
  const tables = suites.reduce((m, s) => m.concat(s.tables || []), []);

  const dynaliteConfig = {
    config: config,
    tables: tables
  };
  
  suites = [dynaliteSuite(dynaliteConfig)].concat(suites);

  const setups = pull('setup', suites);
  const teardowns = pull('teardown', suites);
  const setupOrder = suites.map(s => s.name).filter(s => setups[s]);
  const teardownOrder = suites.map(s => s.name).filter(s => teardowns[s]).reverse();

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
    assert.test('setup', run(setupOrder, setups));
    assert.test('test', callback);
    assert.test('teardown', run(teardownOrder, teardowns));
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
      assert.pass(name);
      run(names.slice(1), fns)(assert);
    });
  };
};
