<?php
/**
 * @Author: David G Chung
 * @Date:   2015-06-26 09:42:04
 * @Last Modified by:   David
 * @Last Modified time: 2016-03-16 08:48:28
 */

require_once 'MySqlDataBase.php';
require_once 'Authenticator.php';

//================= PARAMETERS ======================================================================
//      fName: the name of the stored procedure
//      params: any parameters that the stored procedure needs
//      actionType: (select or update) are you expecting data back? or do are you just updateing data
//      loginRequired: Does the user need to be logedin for to call this Stored procedure
//===================================================================================================

//get post data from site
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

//default values
$request->loginRequired = (!isset($request->loginRequired) || is_null($request->loginRequired)) ? true : $request->loginRequired;
$request->actionType = (!isset($request->actionType) || is_null($request->actionType)) ? 'update' : $request->actionType;

//Send Error if the user needs to login
$auth->update_active();
if($request->loginRequired && !$auth->is_logged_in())
{
    die('ERROR: User not logged in --  ' . $request->fName);
}

//Inject User_Id
$max = sizeof($request->params);
for($i = 0; $i < $max; $i++)
{
    if($request->params[$i] === "User_Id")
        $request->params[$i] = $auth->get_user_id();
}

//Call the store procedure
$result = $db->function_call($request->fName, $request->params, $request->actionType);

//Echo result as JSON
echo json_encode($result);