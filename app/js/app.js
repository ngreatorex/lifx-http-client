'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', 
  function($routeProvider) {
    $routeProvider.when('/bulbs', {templateUrl: 'partials/bulb-list.html', controller: 'BulbListCtrl'});
    $routeProvider.when('/bulbs/:bulbId', {templateUrl: 'partials/bulb-detail.html', controller: 'BulbDetailCtrl'});
    $routeProvider.otherwise({redirectTo: '/bulbs'});
}]);
