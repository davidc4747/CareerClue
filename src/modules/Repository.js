/*
* @Author: David G Chung
* @Date:   2015-06-26 11:20:02
* @Last Modified by:   David
* @Last Modified time: 2016-04-08 14:10:49
*/

angular.module('Repository', ['BusinessRules', 'Authenticator', 'Recovery'])
    .service('Repository', ['UserRules', 'JobRules', 'Authenticator', 'Recovery', '$interval', '$location',
                function(UserRules, JobRules, Authenticator, Recovery, $interval, $location)
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
            #Authenticator Methods
        \*====================================*/

        this.signIn = function (user, callback)
        {
            Authenticator.signIn(user, callback);
        };

        this.signUp = function (user, callback)
        {
            Authenticator.signUp(user, callback);
        };

        this.signOut = function(callback)
        {
            Authenticator.signOut(callback);
        };

        this.getSignInStatus = function(callback)
        {
            Authenticator.getSignInStatus(callback);
        };



        /*====================================*\
            #Account Recovery
        \*====================================*/

        this.sendEmail = function(email, callback)
        {
            Recovery.sendEmail(email,callback);
        };

        this.resetPassword = function(token, password, repass, callback)
        {
            Recovery.resetPassword(token, password, repass, callback);
        };






        // $interval(function()
        // {
        //     // Call Authenticator.isActive();
        //     Authenticator.getSignInStatus(function(isloggedIn)
        //     {
        //         if(isloggedIn == false)
        //         {
        //             // send to SignIn screen
        //             $location.path('/SignIn');
        //         }

        //     });

        // }, 60000);// repeat every 5 mins


    }]);