var wrapper = require('./lib/wrapper');

module.exports = function(tape, config) {
  config = config || require('./lib/default-config.json');

  return function() {
    var args = Array.prototype.slice.call(arguments);
    return wrapper(tape, config, args);
  }
};

