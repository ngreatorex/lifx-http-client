'use strict';

var module = angular.module('myApp.services', ['ngResource']);

module.factory('BulbState', ['$timeout', '$q', 'LiFXCloud',
  function ($timeout, $q, API) {

    var BulbState = {
      autoRefresh: 5000,
      refreshTimer: 0,
      bulbs: []
    };

    var timerInterval = 1000;

    BulbState.refresh = function() {
      if (API == null) {
        return;
      }
      if (BulbState.refreshTimer == -1) {
        return;
      } else if (BulbState.refreshTimer > timerInterval) {
        BulbState.refreshTimer -= timerInterval;
        $timeout(BulbState.refresh, timerInterval);
      } else {
        BulbState.refreshTimer = 0;
        var that = BulbState;

        API.listLights('all', function(result) {
          console.log('Result is:', result);
          if (result) {
            that.bulbs = eval(result);
            that.refreshTimer = that.autoRefresh;
            $timeout(that.refresh, timerInterval);
          } else {
            that.refreshTimer = -1;
          }
        });
      }
    };

    BulbState.forceRefresh = function() { 
      var that = BulbState;

      API.listLights('all', function(result) {
        console.log('Result is:', result);
        if (result) {
          that.bulbs = eval(result);
          that.refreshTimer = that.autoRefresh;
        } else {
          that.refreshTimer = -1;
        }
      });
    };

    BulbState.on = function(bulbId) {
        var deferred = $q.defer();

        API.setPower(bulbId, 'on', 0.1, function(result) {
            if (result) {
                deferred.resolve(result);
            } else {
                deferred.reject(result);
            }
        });

        return deferred.promise;
    };

    BulbState.off = function(bulbId) {
        var deferred = $q.defer();

        API.setPower(bulbId, 'off', 0.1, function(result) {
            if (result) {
                deferred.resolve(result);
            } else {
                deferred.reject(result);
            }
        });

        return deferred.promise;
    };

    BulbState.toggle = function(bulbId) {
        var deferred = $q.defer();

        API.togglePower(bulbId, function(result) {
            if (result) {
                deferred.resolve(result);
            } else {
                deferred.reject(result);
            }
        });

        return deferred.promise;
    };

    return BulbState;
  }
]);
