/*
* @Author: David G Chung
* @Date:   2015-06-26 10:37:33
* @Last Modified by:   David
* @Last Modified time: 2016-02-03 09:15:13
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
                params: [user.name, user.password, user.repass],
                actionType: 'select',
                loginRequired: false
            };

            sp(postData, callback);
        };

    }]);