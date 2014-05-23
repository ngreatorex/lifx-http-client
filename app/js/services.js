'use strict';

/* Services */

var LIFX_URL = 'http://lifx-http.local:3000/'

// Demonstrate how to register services
// In this case it is a simple value service.
var module = angular.module('myApp.services', ['ngResource']);

module.value('version', '0.1');

module.factory('Bulb', ['$resource',
  function($resource) {
    return $resource(LIFX_URL + 'lights/:bulbId', {}, {
      query: {method:'GET', params:{bulbId:''}, isArray:true, timeout:10000},
      toggle: {method:'PUT', url: LIFX_URL + 'lights/:bulbId/toggle'},
      on: {method:'PUT', url: LIFX_URL + 'lights/:bulbId/on'},
      off: {method:'PUT', url: LIFX_URL + 'lights/:bulbId/off'}
     });
  }
]);

