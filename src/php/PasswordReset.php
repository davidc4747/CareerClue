<?php
/**
 * @Author: David
 * @Date:   2016-03-31 14:24:11
 * @Last Modified by:   David
 * @Last Modified time: 2016-03-31 15:00:06
 */

require_once 'MySqlDataBase.php';
require_once 'Authenticator.php';

//  :: generate reset Token, validate Token,

function generate_token()
{
    $token = hash('sha256', openssl_random_pseudo_bytes(128), false);
    // DB->save token
    return $token;
}

function validate_token($token)
{
    // DB->get user with token
        // if not exits, return false

    return !empty($result[0]['Token']) && hash_equals($result[0]['Token'], hash('sha256', $token));
}

// validate reset Token -or- die()

// if valid
    // hash password
    // update DB
    // delete rest token


// return is_valid
// go to SignIn -or- Log user in


