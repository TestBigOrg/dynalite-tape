var exec = require('child_process').exec;
var path = require('path');

var o = path.join(__dirname, 'fixtures', 'old');
var n = path.join(__dirname, 'fixtures', 'new');

exec(`diff ${o} ${n}`, function(err, stdout, stderr) {
  var changes = stdout.split('\n').filter(l => l !== '');
  changes.forEach(console.log);
  if (changes.length > 1) throw new Error('Files have changed!');
});
