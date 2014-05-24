'use strict';

/* Services */

var LIFX_URL = 'http://lifx-http.local:3000/'

// Demonstrate how to register services
// In this case it is a simple value service.
var module = angular.module('myApp.services', ['ngResource']);

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

module.factory('BulbState', ['$timeout', 'Bulb',
  function ($timeout, Bulb) {
    var BulbState = {
      autoRefresh: 5000,
      refreshTimer: 0,
      bulbs: []
    };

    var timerInterval = 1000;

    BulbState.refresh = function() {
      if (BulbState.refreshTimer == -1) {
        return;
      } else if (BulbState.refreshTimer > timerInterval) {
        BulbState.refreshTimer -= timerInterval;
        $timeout(BulbState.refresh, timerInterval);
      } else {
        BulbState.refreshTimer = 0;
        var that = BulbState;

        Bulb.query(function (bulbs) {
          that.bulbs = bulbs;

          that.refreshTimer = that.autoRefresh;
          $timeout(that.refresh, timerInterval);
        }, function(error) {
          console.log(error);
          that.refreshTimer = -1;
        });
      }
    };

    BulbState.forceRefresh = function() { 
      Bulb.query(function (bulbs) {
        BulbState.bulbs = bulbs;

        BulbState.refreshTimer = BulbState.autoRefresh;
      }, function(error) {
        console.log(error);
      });
    };

    return BulbState;
  }
]);
