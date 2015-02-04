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

controllers.controller('BulbListCtrl', ['$scope', '$timeout', 'BulbState',  
  function($scope, $timeout, BulbState) {
    $scope.BulbState = BulbState;

    $scope.callOn = function(bulbId) {
        BulbState.on(bulbId);
    };

    $scope.callOff = function(bulbId) {
        BulbState.off(bulbId);
    };
  }
]);

controllers.controller('BulbDetailCtrl', ['$scope', '$routeParams', '$filter', 'BulbState',  
  function($scope, $routeParams, $filter, BulbState) {
    $scope.BulbState = BulbState;

    $scope.getBulb = function() {
      for (var i=0; i < BulbState.bulbs.length; i++) {
        var bulb = BulbState.bulbs[i];
        if (bulb.id === $routeParams.bulbId)
          return bulb;
      }
    };

    $scope.callOn = function() {
      BulbState.on($routeParams.bulbId);
    };

    $scope.callOff = function() {
      BulbState.off($routeParams.bulbId);
    };

    $scope.callToggle = function() {
      BulbState.toggle($routeParams.bulbId)
        .then(function (bulb) {
          BulbState.forceRefresh();
        });
    };
  }
]);
