var module = angular.module('myApp.LiFXCloud', []);

var querystring = require('querystring');

querystring.unescape = function(val) {
    return unescape(val);
};

module.factory('LiFXCloud', function() {
    console.log('Reading API token...');

    if (window.LiFXToken) {
        console.log('Loading LiFX API...');

	var lifxApi = require('lifx-api');
	var lifx = new lifxApi(window.LiFXToken);

        return lifx;
    } else {
        console.error('LiFX API token not set');
        return null;
    }

});

