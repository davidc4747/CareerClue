/*
* @Author: David G Chung
* @Date:   2015-06-26 10:38:51
* @Last Modified by:   David
* @Last Modified time: 2016-04-13 17:32:03
*/

angular.module('CallStoredProcedure', [])
    .factory('CallStoredProcedure', ['$http', function($http)
    {

        return function(postData, callback)
        {
            postData.params = postData.params || [];
            postData.actionType = postData.actionType || 'update';
            postData.loginRequired = postData.loginRequired || false;

            //Pass data to file
            var request = $http({
                method: 'post',
                url: 'php/db_call.php',
                data: postData
            });
            request.success(callback);
            request.error(function(err)
            {
                console.log('ERROR: unable to call function `' + fName + '` with data: \n' + postData);
            });

        };
    }]);