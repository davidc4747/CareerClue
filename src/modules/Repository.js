/*
* @Author: David G Chung
* @Date:   2015-06-26 11:20:02
* @Last Modified by:   David
* @Last Modified time: 2016-02-23 10:41:11
*/

angular.module('Repository', ['BusinessRules', 'Session'])
    .service('Repository', ['UserRules', 'Session', function(UserRules, Session)
    {
        //UserRules
        this.signIn = function (user, callback)
        {
            UserRules.signIn(user, function(errors)
            {
                //If no errors, signIn to session
                if(errors.length == 0)
                    Session.login(user);

                //send results to callback
                callback(errors);
            });
        };

        this.signUp = function (user, callback)
        {
            UserRules.signUp(user, function(errors)
            {
                //If no errors, signIn to session
                if(errors.length == 0)
                    Session.login(user);

                //send results to callback
                callback(errors);
            });
        };

        this.userInfo = function(callback)
        {
            UserRules.userInfo(callback);
        }



        //Session methods
        this.getId = function(callback)
        {
            Session.getId(callback);
        };



    }]);