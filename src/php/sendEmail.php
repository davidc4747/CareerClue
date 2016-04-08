<?php
/**
 * @Author: David
 * @Date:   2016-04-07 11:21:50
 * @Last Modified by:   David
 * @Last Modified time: 2016-04-08 08:40:54
 */

require_once 'MySqlDataBase.php';
require_once 'Token.php';


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// Sanitize user input
$email = 'bobo@bobo';//$request->email;
$email = clean_input($email);

// Get userName for email
$result = $db->function_call("ccp_sp_UserByEmail", [$eamil], "Select");

// Create password reset token
// save token to DB

// Create the mail using the emailTemplate.php
$msg = get_msg();
echo $msg;
// mail($email, "CareerClue -- password reset", $msg);

function get_msg()
{
    return include 'emailTemplate.php';
}

function clean_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}