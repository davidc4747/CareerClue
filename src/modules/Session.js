/*
* @Author: David
* @Date:   2015-10-27 11:46:21
* @Last Modified by:   David
* @Last Modified time: 2016-03-10 15:14:58
*/

angular.module('Session', [])
    .service('Session', ['$http', function($http)
    {
        this.remember = false;

        //logs user into php session
        this.login = function(userData)
        {
            this.remember = userData.remember;

            //call php login script
            var request = $http({
                method: 'post',
                async: false,
                url: 'php/SessionScript.php',
                data: { method: 'login', user: userData }
            });
            request.success(function(data)
            {
                console.log('Session.login(): ', data);
            });
            request.error(function(err)
            {
                console.log('SessionScript ERROR: Session.login()');
            });
        };

        //logs user out of php session
        this.logout = function(callback)
        {
            //call php logout script
            var request = $http({
                method: 'post',
                async: false,
                url: 'php/SessionScript.php',
                data: { method: 'logout' }
            });
            request.success(function(data)
            {
                console.log('Session.logout(): ', data);
                callback(data);
            });
            request.error(function(err)
            {
                console.log('SessionScript ERROR: Session.logout()');
            });
        };

        //Gets the current session login status
        this.getLoginStatus = function(callback)
        {
            var request = $http({
                method: 'post',
                url: 'php/SessionScript.php',
                data: { method: 'isloggedin' }
            });
            request.success(function(data)
            {
                var val = data === 'true';
                console.log("Session.getLoginStatus: ", val);
                callback(val);
            });
            request.error(function(err)
            {
                console.log('SessionScript ERROR: Session.getLoginStatus()');
            });
        };

    }]);