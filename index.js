var Benchmark = require('benchmark');

function log(message) {
  if (typeof window !== 'undefined') {
    var div = document.createElement('div');
    div.textContent = message;
    document.getElementById('output').appendChild(div);
  } else  {
    console.log(message);
  }

  return message.length;
}

function pad(input, count, padder) {
  var length = String(input).length;
  return input + new Array(Math.max(1, count + 1 - length)).join(padder);
}

function padRight(input, count, padder) {
  var length = String(input).length;
  return new Array(Math.max(1, count + 1 - length)).join(padder) + input;
}

function n(number) {
  var result = Benchmark.formatNumber(number);
  var match = result.match(/(.*)\.(\d{0,2}).*$/, '');
  if (!match) { return result; }

  var full = match[1];
  var dec = match[2];

  return full + '.' + pad(dec, 2, '0');
}

module.exports = function(suites) {
  var suite = new Benchmark.Suite();

  log('testing');

  var nameWidth = 0;
  var lineItemWidth = 0;

  suites.forEach(function(s) {
    var length = log('- ' + s.name);
    nameWidth = Math.max(length, nameWidth);
    suite.add(s);
  });

  suite.on('cycle', function(event) {
    var length = log('  ' + pad(event.target.name + ' ',
                                nameWidth + 1, '.') +
                                padRight(' ' + n(event.target.hz, 1e2), 15, '.') +
                                ' op/s')
    lineItemWidth = Math.max(length, lineItemWidth);
  })
  .on('complete', function() {
    pad('', lineItemWidth, '-');
    console.log('fastest: ' + this.filter('fastest').map('name'));
  })
  .on('error', function (err) {
    console.error(err);
  });

  setTimeout(function() {
    console.log('running first test, please wait...')
    suite.run({
      'async': true
    });
  }, 1000);
}
