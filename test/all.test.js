var tape = require('tape');

var tapper = require('..')(tape);

var tableSetup= require('./test-suites/table-setup');

var test = tapper(tableSetup());

test('a passing test', function(assert) {
  assert.pass();
  assert.end();
});

test('a failing test', function(assert) {
  assert.fail();
  assert.end();
});

test('an errored test', function(assert) {
  assert.end(new Error('just a test'));
});
