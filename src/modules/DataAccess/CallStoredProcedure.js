/*
* @Author: David G Chung
* @Date:   2015-06-26 10:38:51
* @Last Modified by:   David
* @Last Modified time: 2016-02-03 09:35:21
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
                url: 'php/CallStoredProcedure.php',
                data: postData
            });
            request.success(callback);
            request.error(function(err)
            {
                console.log('ERROR: unable to call function `' + fName + '` with data: \n' + postData);
            });

        };
    }]);