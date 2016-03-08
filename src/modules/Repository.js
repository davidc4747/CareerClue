/*
* @Author: David G Chung
* @Date:   2015-06-26 11:20:02
* @Last Modified by:   David
* @Last Modified time: 2016-03-08 10:13:08
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

        this.signOut = function(user, callback)
        {
            // Sign out of DB
            UserRules.signOut(user, callback);

            // Sign out of session
            Session.logout();
        };



        this.userInfo = function(callback)
        {
            UserRules.userInfo(callback);
        };


        this.updateUserInfo = function(user, callback)
        {
            UserRules.updateUserInfo(user, callback);
        };


        this.updateUserPass = function(user, callback)
        {
            UserRules.updateUserPass(user, callback);
        };






        /*====================================*\
            #Job Rules
        \*====================================*/

        this.getStatusTypes = function(callback)
        {
            JobRules.getStatusTypes(callback);
        };

        this.getUserJobs = function(callback)
        {
            JobRules.getUserJobs(callback);
        };

        this.saveJob = function(job, callback)
        {
            JobRules.saveJob(job, callback);
        };

        this.deleteJob = function(job)
        {
            JobRules.deleteJob(job);
        };


        this.getjobStatusCount = function(callback)
        {
            JobRules.getjobStatusCount(callback);
        };





        /*====================================*\
            #Session Methods
        \*====================================*/

        this.getId = function(callback)
        {
            Session.getId(callback);
        };



    }]);