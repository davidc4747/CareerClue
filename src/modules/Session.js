/*
* @Author: David
* @Date:   2015-10-27 11:46:21
* @Last Modified by:   David
* @Last Modified time: 2016-02-23 11:25:26
*/

angular.module('Session', [])
    .service('Session', ['$http', function($http)
    {
        //logs user into php session
        this.login = function(userData)
        {
            //call php login script
            var request = $http({
                method: 'post',
                url: 'php/SessionScript.php',
                data: { method: 'login', user: userData }
            });
            request.success(function(data)
            {});
            request.error(function(err)
            {
                console.log('SessionScript ERROR: Session.login()');
            });
        };

        //logs user out of php session
        this.logout = function()
        {
            //call php logout script
            var request = $http({
                method: 'post',
                url: 'php/SessionScript.php',
                data: { method: 'logout' }
            });
            request.success(function()
            {});
            request.error(function(err)
            {
                console.log('SessionScript ERROR: Session.logout()');
            });
        };

        //Gets the current session login status
        this.isLoggedin = function()
        {
            var request = $http({
                method: 'post',
                url: 'php/SessionScript.php',
                data: { method: 'isLoggedin' }
            });
            request.success(function()
            {});
            request.error(function(err)
            {
                console.log('SessionScript ERROR: Session.isLoggedin()');
            });
        };

        this.getId = function(callback)
        {
            var request = $http({
                method: 'post',
                url: 'php/SessionScript.php',
                data: { method: 'getId' }
            });
            request.success(callback);
            request.error(function(err)
            {
                console.log('SessionScript ERROR: Session.isLoggedin()');
            });
        };

    }]);