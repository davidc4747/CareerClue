/*
* @Author: David G Chung
* @Date:   2015-06-26 10:39:36
* @Last Modified by:   David
* @Last Modified time: 2016-02-28 08:26:52
*/

angular.module('DBConstants', [])
    .value('DBConstants',
    {
        // User Stored Procedures
        SP_USER_SIGNIN: 'cc_sp_User_SignIn',
        SP_USER_SIGNUP: 'cc_sp_User_SignUp',

        SP_USER_BY_ID: 'cc_sp_User_ById',



        // Job Stored Procedures
        SP_JOB_BY_USERID: 'cc_sp_Job_ByUserId',
        SP_JOB_SAVE: 'cc_sp_Job_Save',
    });