<?php
/**
 * @Author: David
 * @Date:   2016-03-16 09:33:32
 * @Last Modified by:   David
 * @Last Modified time: 2016-03-22 11:43:34
 */
require_once 'Authenticator.php';



// echo (empty($_COOKIE['orange']));
// echo (empty($_COOKIE['selector']));

// $auth->signout();
// $auth->signin_test();
// $auth->signup_test();



echo json_encode($auth->is_signed_in());
echo "<br><br>";

echo print_r($_SESSION);
echo "<br><br>";


echo print_r($_COOKIE);
echo "<br><br>";
echo print_r($_COOKIE['selector']);
echo "<br>";
echo print_r($_COOKIE['token']);
echo "<br><br>";
