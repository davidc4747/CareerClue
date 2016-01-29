/*
* @Author: David
* @Date:   2015-10-27 11:46:21
* @Last Modified by:   David
* @Last Modified time: 2015-11-18 15:14:36
*/

angular.module('Session', [])
    .service('Session', ['$http', function($http)
    {
        var user = null;
        var loggedin = false;

        //logs user into php session
        this.login = function(userData)
        {
            //Get userId from db

            //Store the user data

            //if remember : create cookie



            //call php login script
            var request = $http({
                method: 'post',
                url: 'assets/php/login.php',
                data: userData
            });
            request.success(function(data)
            {
                console.log('User login: ' + data);
                user = data;
                loggedin = true;
            });
            request.error(function(err)
            {
                console.log('ERROR: Session.login()');
            });
        };

        //logs user out of php session
        this.logout = function()
        {
            //clear user data

            //clear cookie


            //call php logout script
            var request = $http({
                method: 'post',
                url: 'assets/php/logout.php'
            });
            request.success(function()
            {
                console.log('User logout: ' + user);
                loggedin = false;
                user = null;
            });
            request.error(function(err)
            {
                console.log('ERROR: Session.logout()');
            });
        };

        //Gets the current session login status
        this.isLoggedin = function()
        {
            return loggedin;
        };

    }]);