/*
* @Author: David
* @Date:   2015-10-27 11:46:21
* @Last Modified by:   David
* @Last Modified time: 2016-04-13 17:30:34
*/

angular.module('Authenticator', [])
    .service('Authenticator', ['$http', function($http)
    {

        this.signIn = function(user, callback)
        {
            var request = $http({
                method: 'post',
                url: 'php/auth_script.php',
                data: { 'method': 'signin', 'user': user }
            });
            request.success(function(data)
            {
                var val = data === 'true';
                console.log(data, "Authenticator.signin: ", val);
                callback(val);
            });
        };

        this.signUp = function(user, callback)
        {
            var request = $http({
                method: 'post',
                url: 'php/auth_script.php',
                data: { 'method': 'signup', 'user': user  }
            });
            request.success(function(data)
            {
                var val = data === 'true';
                console.log(data, "Authenticator.signup: ", val);
                callback(val);
            });

        };

        this.signOut = function(callback)
        {
            var request = $http({
                method: 'post',
                async: false,
                url: 'php/auth_script.php',
                data: { method: 'signout' }
            });
            request.success(function(data)
            {
                console.log('Authenticator.signout(): ', data);
                callback(data);
            });
        };

        //Gets the current Authenticator login status
        this.getSignInStatus = function(callback)
        {
            var request = $http({
                method: 'post',
                url: 'php/auth_script.php',
                data: { method: 'issignedin' }
            });
            request.success(function(data)
            {
                var val = data === 'true';
                console.log(data, "Authenticator.getSignInStatus: ", val);
                callback(val);
            });
        };


        this.updateUserPass = function(user, callback)
        {
            // call php script
            var request = $http({
                method: 'post',
                url: 'php/auth_script.php',
                data: {
                    'method': 'updateuserpass',
                    'username': user.Username,
                    'curpass': user.curPass,
                    'newpass': user.newPass,
                    'repass': user.rePass,
                }
            });

            // execute the callback function
            request.success(function(data)
            {
                console.log('UserRules.updateUserPass: ', data);
                var val = data === 'true';
                callback(val);
            });
        };

    }]);