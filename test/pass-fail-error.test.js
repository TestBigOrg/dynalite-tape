var tape = require('tape');

var tapper = require('..')(tape);

var tableSetupTeardown= require('./test-suites/table-setup-teardown');
var tableSetup = require('./test-suites/table-setup');
var tableTeardown = require('./test-suites/table-teardown');
var setupTeardown = require('./test-suites/setup-teardown');
var justSetup = require('./test-suites/just-setup');
var justTable = require('./test-suites/just-table');
var justTeardown = require('./test-suites/just-teardown');

var test = tapper(tableSetupTeardown(), tableSetup(), tableTeardown(), setupTeardown(), justSetup(), justTable(), justTeardown());

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
