<?php
/**
 * @Author: David
 * @Date:   2016-02-12 08:55:41
 * @Last Modified by:   David
 * @Last Modified time: 2016-03-10 11:55:55
 */

require_once 'MySqlDataBase.php';
require_once 'Session.php';

//get post data from site
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);


// Call the Session method that was requested
if(strtolower($request->method) == 'login')
{
    // Get User Id from DB
    $result = $db->function_call("cc_sp_User_ByLogin", [$request->user->name, $request->user->password], "select");

    if(sizeof($result) > 0)
    {
        $user = $result[0];
        $session->login($user);
    }
}
else if(strtolower($request->method) == 'logout')
{
    $session->logout();
}
else if(strtolower($request->method) == 'isloggedin')
{
    $loggedIn = $session->is_logged_in();
    echo json_encode($loggedIn);
}