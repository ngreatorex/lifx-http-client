'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]).
  filter('onoff', function() {
    return function(bool) {
      return bool ? 'ON' : 'OFF';
    }
  }).
  filter('refreshText', function() {
    return function(counter) {
      if (counter === -1)
        return 'Auto refresh disabled';
      else if (counter === 0)
        return 'Refreshing...';
      else
        return 'Refreshing in ' + counter / 1000 + ' seconds';
    };
  });
