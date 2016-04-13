<?php
/**
 * @Author: David
 * @Date:   2016-03-31 14:24:11
 * @Last Modified by:   David
 * @Last Modified time: 2016-04-13 17:24:32
 */

require_once 'DataAccess/MySqlDataBase.php';
require_once 'Authenticator/Authenticator.php';
require_once 'Token.php';


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// Sanitize user input
$token = clean_input($request->token);
$password = clean_input($request->password);
$repass = clean_input($request->repass);
$hash_token = Token::hash_token($token);

// validate reset Token -or- die()
$result = $db->function_call("cc_sp_ResetToken_Validate", [$hash_token], "Select");

// if token exists and hasn't expired
$is_valid = false;
if(!empty($result[0]["Expires"]) && time() < strtotime($result[0]["Expires"]))
{
    $is_valid = true;

    // Hash password, save to DB
    $auth->change_pass_by_reset_token($hash_token, $password, $repass);
}

// return is_valid
echo $is_valid;


function clean_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}