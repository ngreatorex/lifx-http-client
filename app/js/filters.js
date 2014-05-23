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
  });
