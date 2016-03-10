/*
* @Author: David G Chung
* @Date:   2015-06-26 10:37:33
* @Last Modified by:   David
* @Last Modified time: 2016-03-08 11:19:33
*/

angular.module('BusinessRules')
    .service('UserRules', ['CallStoredProcedure', 'DBConstants', function(sp, dbConst)
    {
        this.signIn = function(user, callback)
        {
            //call the signIng stored procedure
            var postData =
            {
                fName: dbConst.SP_USER_SIGNIN,
                params: [user.name, user.password],
                actionType: 'select',
                loginRequired: false
            };

            sp(postData, callback);
        };

        this.signOut = function(callback)
        {
            var postData =
            {
                fName: dbConst.SP_USER_SIGNOUT,
                params: ["User_Id"],
                actionType: 'update',
                loginRequired: true
            };

            callback = callback || function(){};
            sp(postData, function(data)
            {
                console.log("UserRules.signOut(): ", data);
                callback(data);
            });
        };

        this.signUp = function(user, callback)
        {
            var postData =
            {
                fName: dbConst.SP_USER_SIGNUP,
                params: [user.name, user.email, user.password, user.repass],
                actionType: 'select',
                loginRequired: false
            };

            sp(postData, callback);
        };





        this.userInfo = function(callback)
        {
            var postData =
            {
                fName: dbConst.SP_USER_BY_ID,
                params: ["User_Id"],
                actionType: 'select',
                loginRequired: true
            };

            sp(postData, function(data)
            {
                console.log("UserInfo:", data);
                callback(data);
            });
        };



        this.updateUserInfo = function(user, callback)
        {
            var postData =
            {
                fName: dbConst.SP_USER_UPDATE_INFO,
                params: ["User_Id", user.Username, user.User_Email],
                actionType: 'select',
                loginRequired: true
            };

            sp(postData, callback);
        };

        this.updateUserPass = function(user, callback)
        {
            var postData =
            {
                fName: dbConst.SP_USER_UPDATE_PASS,
                params: ["User_Id", user.curPass, user.newPass, user.rePass],
                actionType: 'select',
                loginRequired: true
            };

            sp(postData, callback);
        };


    }]);