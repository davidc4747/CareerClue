<?php
/**
 * @Author: David
 * @Date:   2016-04-07 11:21:50
 * @Last Modified by:   David
 * @Last Modified time: 2016-04-12 09:16:24
 */

require_once 'MySqlDataBase.php';
require_once 'Token.php';


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// Sanitize user input
// $email = 'davidc4747@yahoo.com';
$email = $request->email;
$email = clean_input($email);



// Get userName for email
$result = $db->function_call("cc_sp_User_ByEmail", [$email], "Select");
if(empty($result[0]["User_Id"]))
    die();

$userId = $result[0]["User_Id"];
$username = $result[0]["Username"];

// Create password reset token
$token = new Token(20);

// save token to DB
$result = $db->function_call("cc_sp_ResetToken_Create", [$userId, $token->hash()], "update");



// Create the mail using the emailTemplate.php
$msg = get_msg($username, $token);
// echo $msg;
mail($email, "CareerClue -- password reset", $msg);

function get_msg($username, $token)
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