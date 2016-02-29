/*
* @Author: David G Chung
* @Date:   2015-06-26 11:20:02
* @Last Modified by:   David
* @Last Modified time: 2016-02-28 08:34:04
*/

angular.module('Repository', ['BusinessRules', 'Session'])
    .service('Repository', ['UserRules', 'JobRules', 'Session', function(UserRules, JobRules, Session)
    {


        /*====================================*\
            #User Rules
        \*====================================*/

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
        };





        /*====================================*\
            #Job Rules
        \*====================================*/

        this.getUserJobs = function(callback)
        {
            JobRules.getUserJobs(callback);
        };

        this.saveJob = function(job, callback)
        {
            JobRules.saveJob(job, callback);
        };





        /*====================================*\
            #Session Methods
        \*====================================*/

        this.getId = function(callback)
        {
            Session.getId(callback);
        };



    }]);