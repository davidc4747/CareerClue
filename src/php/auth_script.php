<?php
/**
 * @Author: David
 * @Date:   2016-02-12 08:55:41
 * @Last Modified by:   David
 * @Last Modified time: 2016-04-13 17:23:58
 */

require_once 'Authenticator/Authenticator.php';

//get post data from site
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);


// Call the Authenticator method that was signin
if(strtolower($request->method) == 'signin')
{
    // Pass POST data to Authenticator
    $isvalid = $auth->signin_by_user_info($request->user->name, $request->user->password, $request->user->remember);
    echo json_encode($isvalid);
}
else if(strtolower($request->method) == 'signup')
{
    // Pass POST data to Authenticator
    $isvalid = $auth->signup($request->user->name,  $request->user->email, $request->user->password, $request->user->repass);
    echo json_encode($isvalid);
}
else if(strtolower($request->method) == 'signout')
{
    $auth->signout();
}
else if(strtolower($request->method) == 'issignedin')
{
    echo json_encode($auth->is_signed_in());
}
else if(strtolower($request->method) == 'updateuserpass')
{
    echo json_encode($auth->change_pass_by_info($request->username, $request->curpass, $request->newpass, $request->repass));
}
