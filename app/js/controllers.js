'use strict';

/* Controllers */

var controllers = angular.module('myApp.controllers', []);

controllers.controller('NavCtrl', ['$scope', '$location', '$routeParams', 'Bulb', 
  function($scope, $location, $routeParams, Bulb) {
    $scope.bulbs = Bulb.query();

    $scope.navClass = function(page, bulbId) {
      var currentRoute = $location.path().split('/')[1] || 'bulbs';
      console.log('Current route is ' + currentRoute);

      if (bulbId && $routeParams.bulbId) {
        return page === currentRoute && bulbId === $routeParams.bulbId ? 'focus' : ''; 
      } else {
        return page === currentRoute ? 'active' : '';
      }
    }

    $scope.goTo = function(page) {
      $location.url('/' + page);
    };
}]);

controllers.controller('BulbListCtrl', ['$scope', 'Bulb', function($scope, Bulb) {
  $scope.bulbs = Bulb.query();
}]);

controllers.controller('BulbDetailCtrl', ['$scope', '$routeParams', 'Bulb', 
  function($scope, $routeParams, Bulb) {
    $scope.bulb = Bulb.get({bulbId: $routeParams.bulbId}, function (bulb) {
      $scope.state = bulb.state;
    });

    $scope.callOn = function() {
      $scope.bulb.$on({bulbId: $routeParams.bulbId}, function (bulb) {
        $scope.bulb = bulb;
      });
    };

    $scope.callOff = function() {
      $scope.bulb.$off({bulbId: $routeParams.bulbId}, function (bulb) {
        $scope.bulb = bulb;
      });
    };

    $scope.callToggle = function() {
      $scope.bulb.$toggle({bulbId: $routeParams.bulbId}, function (bulb) {
        $scope.bulb = bulb;
      });
    };
  }]);
