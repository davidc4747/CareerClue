/*
* @Author: David G Chung
* @Date:   2015-06-26 10:39:36
* @Last Modified by:   David
* @Last Modified time: 2016-02-23 10:43:31
*/

angular.module('DBConstants', [])
    .value('DBConstants',
    {
        SP_USER_SIGNIN: 'cc_sp_User_SignIn',
        SP_USER_SIGNUP: 'cc_sp_User_SignUp',

        SP_USER_BY_ID:   'cc_sp_User_ById'
    });