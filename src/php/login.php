<?php
//    Created on : Mar 13, 2015, 1:03 PM
//    Author     : David G Chung

require_once 'MySqlDataBase.php';
require_once 'Session.php';

//get post data from site
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$uName = $request->uName;
$pass = $request->pWord;

//Prepare parameters
$uName = $db->escale_value($uName);
$pass = $db->escale_value($pass);

//Call the store procedure
$fname = 'sp_UserLogin';
$params = array("'$uName'", "'$pass'");
$user = $db->function_call($fname, $params, 'select');

//Tell the session, a user has logged in
$session->login($user);

//echo it as JSON for javascript to use
echo json_encode($user);