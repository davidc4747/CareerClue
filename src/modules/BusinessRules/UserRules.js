/*
* @Author: David G Chung
* @Date:   2015-06-26 10:37:33
* @Last Modified by:   David
* @Last Modified time: 2016-01-29 13:53:57
*/

busRules.service('UserRules', ['CallStoredProcedure', 'DBConstants', function(sp, dbConst)
{
    this.signIng = function(user, callback)
    {
        //call the signIng stored procedure
        var postData =
        {
            fName: dbConst.SP_USER_SIGNIN,
            params: [user.email, user.pass],
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
            params: [user.firstName, user.lastName, user.email, user.pass, user.repass],
            actionType: 'select',
            loginRequired: false
        };

        sp(postData, callback);
    };

}]);