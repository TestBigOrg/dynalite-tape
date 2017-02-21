
module.exports = function(config) {
  var dynalite = require('dynalite')(config);
  
  var killDynalite = null;
  var waitToConnect = false;

  return function(tape) {
    return function(name, cb) {
      tape('[setup dynalite]', function(assert) {
        setup(function(err) {
          if (err) return assert.end(err);
          assert.test(name, cb);
          assert.test('[teardown dynalite]', teardown);
          assert.end();
        });
      });
    };
  };

  function setup(cb) {
    if (killDynalite && !waitToConnect) clearTimeout(killDynalite);
    else if (waitToConnect) return setTimeout(function() {
      setup(cb); 
    }, 10);
    else return dynalite.listen(4567, function(err) {
      cb(err);
    });
    setTimeout(cb, 0);
  };

  function teardown(assert) {
    // should this kill all the tables?
    // this work make sure the talbes were always reset

    killDynalite = setTimeout(waitToKillDynalite, 200);
    assert.end();
  }

  function waitToKillDynalite() {
    console.log('dynalite is being closed');
    waitToConnect = true;
    dynalite.close(function() {
      waitToConnect = false;
      killDynalite = null;
      console.log('dynalite is closed');
    });
  };
};



