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
var data;
require('do-you-even-bench', [
  {
    name: 'test 1',
    setup: function() {
      data = calcuateData();
    },

    fn: function() { 
      expensiveThing(data); 
    }
  },
]);

```

### testing in the browsers

```sh
curl http://git.io/vZtJK > index.html
browserify <file-containing-test.js> > out.js
open index.html
```
