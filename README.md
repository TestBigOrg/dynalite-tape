# dynalite-tape

This is a simple wrapper for dynalite that takes and returns a tape interface.

The main goal of this module is to let you setup one dynalite instance to be used by many tape interface testing frameworks.

## Usage

```js
var opts = {}; // the same options available on dynalite
var dynaliteTape = require('dynalite-tape')(opts);
var test = dynaliteTape(require('tape'));

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
# [setup dynalite]
# a test
ok 1 a test ran
# [teardown dynalite]
# [setup dynalite]
# b test
ok 2 b test ran
# [teardown dynalite]
dynalite is being closed
dynalite is closed

1..2
# tests 2
# pass  2

# ok
```
