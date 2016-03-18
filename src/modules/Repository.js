/*
* @Author: David G Chung
* @Date:   2015-06-26 11:20:02
* @Last Modified by:   David
* @Last Modified time: 2016-03-11 12:17:01
*/

angular.module('Repository', ['BusinessRules', 'Session'])
    .service('Repository', ['UserRules', 'JobRules', 'Session', '$interval', '$location', function(UserRules, JobRules, Session, $interval, $location)
    {


        /*====================================*\
            #User Rules
        \*====================================*/

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

        this.signIn = function (user, callback)
        {
            Session.signIn(user, callback);
        };

        this.signUp = function (user, callback)
        {
            Session.signUp(user, callback);
        };

        this.signOut = function(callback)
        {
            Session.signOut(callback);
        };

        this.getSignInStatus = function(callback)
        {
            Session.getSignInStatus(callback);
        };


        // $interval(function()
        // {
        //     // Call Session.isActive();
        //     Session.getSignInStatus(function(isloggedIn)
        //     {
        //         if(isloggedIn == false)
        //         {
        //             // send to SignIn screen
        //             $location.path('/SignIn');
        //         }

        //     });

        // }, 60000);// repeat every 5 mins


    }]);