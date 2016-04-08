/*
* @Author: David
* @Date:   2016-04-07 11:12:35
* @Last Modified by:   David
* @Last Modified time: 2016-04-07 13:20:29
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
                data: postData
            });

            // execute the callback function
            request.success(callback);
        };


    }]);