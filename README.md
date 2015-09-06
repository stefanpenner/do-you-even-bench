# Do you even bench

#### basic example:

```js
require('do-you-even-bench')([
  { name: 'test 1', fn: function() { ... } },
  { name: 'test 2', fn: function() { ... } },
  { name: 'test 3', fn: function() { ... } },
]);
```

#### example /w setup

```js
require('do-you-even-bench', [
  {
    name: 'test 1',
    setup: function() {
      var data = calcuateData();
    },

    fn: function() { 
      expensiveThing(data); 
    }
  },
]);
```
