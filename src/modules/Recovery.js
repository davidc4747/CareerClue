/*
* @Author: David
* @Date:   2016-04-07 11:12:35
* @Last Modified by:   David
* @Last Modified time: 2016-04-13 17:33:37
*/


angular.module('Recovery', [])
    .service('Recovery', ['$http', function($http)
    {

        this.sendEmail = function(email, callback)
        {
            // call php script
            var request = $http({
                method: 'post',
                url: 'php/recovery_email.php',
                data: { 'email': email}
            });

            // execute the callback function
            request.success(callback);
        };

        this.resetPassword = function(token, password, repass, callback)
        {
            // call php script
            var request = $http({
                method: 'post',
                url: 'php/password_reset.php',
                data: {
                    'token': token,
                    'password': password,
                    'repass': repass
                }
            });

            // execute the callback function
            request.success(callback);
        };




    }]);