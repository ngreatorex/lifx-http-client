'use strict';

var module = angular.module('myApp.services', ['ngResource']);

module.factory('BulbState', ['$timeout', '$q', 'LiFXSwagger',
  function ($timeout, $q, LiFXPromise) {
    var API = null;

    var BulbState = {
      autoRefresh: 5000,
      refreshTimer: 0,
      bulbs: []
    };

    LiFXPromise.then(function(res) {
        API = res;
	BulbState.refresh();
    });

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

        API.GET_v1beta1_lights_format({selector: 'all'}, function(result) {
          console.log('Result is:', result.obj);
          if (result.obj) {
            that.bulbs = result.obj;
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

      API.GET_v1beta1_lights_format({selector: 'all'}, function(result) {
        console.log('Result is:', result);
        if (result.obj) {
          that.bulbs = result.obj;
          that.refreshTimer = that.autoRefresh;
        } else {
          that.refreshTimer = -1;
        }
      });
    };

    BulbState.on = function(bulbId) {
        var deferred = $q.defer();

        API.PUT_v1beta1_lights_selector_power_format({
            selector: bulbId,
            state: 'on',
            duration: 0.1
        }, function(result) {
            if (result.obj) {
                deferred.resolve(result.obj);
            } else {
                deferred.reject(result);
            }
        });

        return deferred.promise;
    };

    BulbState.off = function(bulbId) {
        var deferred = $q.defer();

        API.PUT_v1beta1_lights_selector_power_format({
            selector: bulbId,
            state: 'off',
            duration: 0.1
        }, function(result) {
            if (result.obj) {
                deferred.resolve(result.obj);
            } else {
                deferred.reject(result);
            }
        });

        return deferred.promise;
    };

    BulbState.toggle = function(bulbId) {
        var deferred = $q.defer();

        API.PUT_v1beta1_lights_selector_toggle_format({
            selector: bulbId
        }, function(result) {
            if (result.obj) {
                deferred.resolve(result.obj);
            } else {
                deferred.reject(result);
            }
        });

        return deferred.promise;
    };

    return BulbState;
  }
]);
