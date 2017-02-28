var exec = require('child_process').exec;
var path = require('path');

var file = path.join(__dirname, 'pass-fail-error.test.js');

exec('tape '+file, function(err, stdout, stderr) {
  console.log(stdout);
});

