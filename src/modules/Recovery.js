/*
* @Author: David
* @Date:   2016-04-07 11:12:35
* @Last Modified by:   David
* @Last Modified time: 2016-04-08 14:12:35
*/


angular.module('Recovery', [])
    .service('Recovery', ['$http', function($http)
    {

        this.sendEmail = function(email, callback)
        {
            // call php script
            var request = $http({
                method: 'post',
                url: 'php/sendEmail.php',
                data: { 'email': email}
            });

            // execute the callback function
            request.success(callback);
        };

        this.resetPassword = function(token, password, repass)
        {
            // call php script
            var request = $http({
                method: 'post',
                url: 'php/PasswordReset.php',
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