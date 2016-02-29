/*
* @Author: David G Chung
* @Date:   2015-06-26 10:39:36
* @Last Modified by:   David
* @Last Modified time: 2016-02-29 12:49:02
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
        SP_JOB_DELETE: 'cc_sp_Job_Delete',

        SP_JOB_STATUS: 'cc_sp_Job_Status',
    });