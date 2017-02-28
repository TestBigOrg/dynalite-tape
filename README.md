# dynalite-tape

The goal of this repo is to make setupping and tearing down tests easy.

This is optimized for working with dynamodb tables


## Usage

```js
var tape = require('tape');

//dynalite-tape takes `tape` and returns a function
var createTestFramework = require('dynalite-tape')(tape);

// the createTestFramework function takes n `suite specs`
// a `suite-spec` must have a `name` and one or more of `tables`, `setup` and `teardown`
var suiteOne = {
  name: 'suite-one',
  tables: [{ ... dynamodb table spec ... }],
  setup: function(cb) { setTimeout(cb); },
  teardown: function(cb) { setTimeout(cb); }
};

var suiteTwo = {
  name: 'suite-two',
  teardown: function(cb) { setTimeout(cb); }
};

var test = createTestFramework(suiteOne, suiteTwo);

test('a test', function(assert) {
  assert.pass('a test ran');
  assert.end();
});

test('b test', function(assert) {
  assert.pass('b test ran');
  assert.end();
});

```

The above code will result in an output that looks like this:

```txt
TAP version 13
# a test
# setup
ok 1 dynalite
ok 2 suite-one
# test
ok 3 a test ran
# teardown
ok 4 suite-two
ok 5 suite-one
ok 6 dynalite
# b test
# setup
ok 7 dynalite
ok 8 suite-one
# test
ok 9 b test ran
# teardown
ok 10 suite-two
ok 11 suite-one
ok 12 dynalite

1..12
# tests 12
# pass  12

# ok
```
