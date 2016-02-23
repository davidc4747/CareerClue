<?php
/**
 * @Author: David
 * @Date:   2016-02-12 08:55:41
 * @Last Modified by:   David
 * @Last Modified time: 2016-02-23 11:25:33
 */

require_once 'MySqlDataBase.php';
require_once 'Session.php';

//get post data from site
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);


// Call the Session method that was requested
if(strtolower($request->method) == 'login')
{
    $session->login($request->user);
}
else if(strtolower($request->method) == 'logout')
{
    $session->logout();
}
else if(strtolower($request->method) == 'isloggedin')
{
    $session->is_logged_in();
}
else if(strtolower($request->method) == 'getid')
{
    echo $session->user_id;
}