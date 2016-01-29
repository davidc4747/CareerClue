<?php
/**
 * @Author: David G Chung
 * @Date:   2015-06-26 10:09:55
 * @Last Modified by:   David
 * @Last Modified time: 2015-10-27 12:00:28
 */

require_once 'MySqlDataBase.php';
require_once 'Session.php';

// //Call logout stored procedure
// $fname = 'sp_UserLogout';
// $params = array();
// $user = $db->function_call($fname, $params, 'select');

//Tell the session, a user has logged out
$session->logout();