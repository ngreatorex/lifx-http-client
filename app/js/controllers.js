'use strict';

/* Controllers */

var controllers = angular.module('myApp.controllers', []);

controllers.controller('NavCtrl', ['$scope', '$location', '$routeParams', 'BulbState', 
  function($scope, $location, $routeParams, BulbState) {
    $scope.BulbState = BulbState;

    BulbState.refresh();

    $scope.navClass = function(page, bulbId) {
      var currentRoute = $location.path().split('/')[1] || 'bulbs';

      if (bulbId && $routeParams.bulbId) {
        return page === currentRoute && bulbId === $routeParams.bulbId ? 'active' : ''; 
      } else {
        return page === currentRoute ? 'active' : '';
      }
    }

    $scope.goTo = function(page) {
      $location.url('/' + page);
    };
  }
]);

controllers.controller('BulbListCtrl', ['$scope', '$timeout', 'BulbState', 'Bulb',  
  function($scope, $timeout, BulbState, Bulb) {
    $scope.BulbState = BulbState;

    $scope.callOn = function(bulbId) {
      Bulb.on({bulbId: bulbId}, {}, function (bulb) {
        //BulbState.forceRefresh();
      });
    };

    $scope.callOff = function(bulbId) {
      Bulb.off({bulbId: bulbId}, {}, function (bulb) {
        //BulbState.forceRefresh();
      });
    };
  }
]);

controllers.controller('BulbDetailCtrl', ['$scope', '$routeParams', '$filter', 'BulbState', 'Bulb', 
  function($scope, $routeParams, $filter, BulbState, Bulb) {
    $scope.BulbState = BulbState;

    $scope.getBulb = function() {
      for (var i=0; i < BulbState.bulbs.length; i++) {
        var bulb = BulbState.bulbs[i];
        if (bulb.id === $routeParams.bulbId)
          return bulb;
      }
    };

    $scope.callOn = function() {
      Bulb.on({bulbId: $routeParams.bulbId}, {}, function (bulb) {
        //BulbState.forceRefresh();
      });
    };

    $scope.callOff = function() {
      Bulb.off({bulbId: $routeParams.bulbId}, {}, function (bulb) {
        //BulbState.forceRefresh();
      });
    };

    $scope.callToggle = function() {
      Bulb.toggle({bulbId: $routeParams.bulbId}, {}, function (bulb) {
        BulbState.forceRefresh();
      });
    };
  }
]);
