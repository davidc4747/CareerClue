<?php
/**
 * @Author: David G Chung
 * @Date:   2015-06-26 09:42:04
 * @Last Modified by:   David
 * @Last Modified time: 2016-02-23 11:06:16
 */

require_once 'MySqlDataBase.php';
require_once 'Session.php';

//================= PARAMETERS ======================================================================
//      fName: the name of the stored procedure
//      params: any parameters that the stored procedure needs
//      actionType: (select or update) are you expecting data back? or do are you just updateing data
//      loginRequired: Does the user need to be logedin for to call this Stored procedure
//===================================================================================================

//get post data from site
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

//Send Error if the user needs to login
if($request->loginRequired && !$session->is_logged_in())
    die('ERROR: User not logged in --  ' . $request->fName);

//Inject User_Id
$max = sizeof($request->params);
for($i = 0; $i < $max; $i++)
{
    if($request->params[$i] == "User_Id")
        $request->params[$i] = $session->user_id;
}

//Call the store procedure
$result = $db->function_call($request->fName, $request->params, $request->actionType);

//Echo result as JSON
echo json_encode($result);