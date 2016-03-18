/*
* @Author: David
* @Date:   2015-10-27 11:46:21
* @Last Modified by:   David
* @Last Modified time: 2016-03-11 12:17:35
*/

angular.module('Session', [])
    .service('Session', ['$http', function($http)
    {

        this.signIn = function(user, callback)
        {
            var request = $http({
                method: 'post',
                async: false,
                url: 'php/SessionScript.php',
                data: { 'method': 'signin', 'user': user }
            });
            request.success(function(data)
            {
                console.log('Session.signin(): ', data);
            });
        };

        this.signUp = function(user, callback)
        {
            var request = $http({
                method: 'post',
                url: 'php/SessionScript.php',
                data: { 'method': 'signup', 'user': user  }
            });
            request.success(function(data)
            {
                console.log('Session.signup(): ', data);
                callback(data);
            });

        };

        this.signOut = function(callback)
        {
            var request = $http({
                method: 'post',
                async: false,
                url: 'php/SessionScript.php',
                data: { method: 'signout' }
            });
            request.success(function(data)
            {
                console.log('Session.signout(): ', data);
                callback(data);
            });
        };

        //Gets the current session login status
        this.getSignInStatus = function(callback)
        {
            var request = $http({
                method: 'post',
                url: 'php/SessionScript.php',
                data: { method: 'issignedin' }
            });
            request.success(function(data)
            {
                var val = data === 'true';
                console.log("Session.getSignInStatus: ", val);
                callback(val);
            });
        };

    }]);