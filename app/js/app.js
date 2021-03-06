'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ui.bootstrap',
  'myApp.filters',
  'myApp.services',
  'myApp.version',
  'myApp.directives',
  'myApp.controllers',
  'myApp.LiFXCloud'
]).
config(['$routeProvider', 
  function($routeProvider) {
    $routeProvider.when('/bulbs', {templateUrl: 'partials/bulb-list.html', controller: 'BulbListCtrl'});
    $routeProvider.when('/bulb/:bulbId', {templateUrl: 'partials/bulb-detail.html', controller: 'BulbDetailCtrl'});
    $routeProvider.otherwise({redirectTo: '/bulbs'});
}]);
