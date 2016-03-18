<?php
/**
 * @Author: David
 * @Date:   2016-03-15 13:59:45
 * @Last Modified by:   David
 * @Last Modified time: 2016-03-18 16:53:06
 */

// Dictonary of all Authenticator Specific Stored Procedures
//      This file also acts as a blacklist for CallStoredProcedure.php

$authProcedures = [
    "SignIn_ByToken" => "cc_sp_User_SignIn_ByToken",
    "SignIn_ByInfo" => "cc_sp_User_SignIn_ByInfo",

    "User_ByName" => "cc_sp_User_ByName",

    "SignOut" => "cc_sp_User_SignOut",
    "SignUp" => "cc_sp_User_SignUp",

    "StartSession" => "cc_sp_Session_Start",
];

// class AuthenticatorProcedures
// {
//     const SP_SOME = 'somthing';
//     const SP_SOME = 'somthing';
// }