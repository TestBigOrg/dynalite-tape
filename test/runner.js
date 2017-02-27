var tests = [
  'all.test.js'
];

var tape = require('tape');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

tests.forEach(file => {
  var test = path.join(__dirname, file);
  var fixture = path.join(__dirname, 'fixtures', file.replace('js', 'txt'));
  tape(file, function(assert) {
    exec(`tape ${test}`, function(err, stdout, stderr) {
      var result = [err, stdout, stderr].join('\n');
      fs.readFile(fixture, function(err, buffer) {
        var content = err ? '' : buffer.toString();
        assert.equal(result, content);
        if (err || process.env.UPDATE === 'true') fs.writeFileSync(fixture, result);
        assert.end();
      });
    });
  });
});
