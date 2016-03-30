/*
* @Author: David G Chung
* @Date:   2015-06-26 10:37:33
* @Last Modified by:   David
* @Last Modified time: 2016-03-23 18:13:00
*/

angular.module('BusinessRules')
    .service('UserRules', ['CallStoredProcedure', 'DBConstants', function(sp, dbConst)
    {
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
                var user = null;
                if(data.length > 0)
                    user = data[0];

                console.log("UserInfo:", user);
                callback(user);
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