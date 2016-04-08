<?php
/**
 * @Author: David
 * @Date:   2016-04-07 14:08:48
 * @Last Modified by:   David
 * @Last Modified time: 2016-04-08 08:37:17
 */

class Token
{
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
}

$token = new Token();