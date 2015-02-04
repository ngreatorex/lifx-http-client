var module = angular.module('myApp.LiFXSwagger', []);


module.factory('LiFXSwagger', function($q) {
    console.log('Reading API token...');

    if (window.LiFXToken) {
        window.authorizations.add("access_token", new PasswordAuthorization("access_token", LiFXToken, ''));
        console.log('Loading LiFX API...');
        var deferred = $q.defer();

        var swagger = new SwaggerClient({
            url: "https://api.lifx.co/swagger_doc.json",
            success: function() {
                if(swagger.ready === true) {
                    // upon connect, fetch a pet and set contents to element "mydata"
                    console.log(swagger);
                    deferred.resolve(swagger.apis.v1beta1);

                    swagger.apis.v1beta1.GET_v1beta1_lights_format({selector: 'all'}, function(result) {
                        console.log(result);
                    });
                }
            },
            failure: function(err) {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    } else {
        console.error('LiFX API token not set');
        return null;
    }

});

