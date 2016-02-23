/*
* @Author: David G Chung
* @Date:   2015-06-26 10:37:33
* @Last Modified by:   David
* @Last Modified time: 2016-02-23 10:50:59
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

        this.signOut = function(user, callback)
        {
            //call the signOut stored procedure
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
                    console.log(data);
                    callback(data);
                });
        }

    }]);