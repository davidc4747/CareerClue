<?php
/**
 * @Author: David
 * @Date:   2016-04-07 14:08:48
 * @Last Modified by:   David
 * @Last Modified time: 2016-04-08 09:37:40
 */

// hash_equals replacement for older versions of php
if(!function_exists('hash_equals'))
{
    function hash_equals($str1, $str2)
    {
        if(strlen($str1) != strlen($str2))
        {
            return false;
        }
        else
        {
            $res = $str1 ^ $str2;
            $ret = 0;
            for($i = strlen($res) - 1; $i >= 0; $i--)
            {
                $ret |= ord($res[$i]);
            }
            return !$ret;
        }
    }
}

// Token Class
class Token
{
    function create($bytes)
    {
        $token = hash('sha256', openssl_random_pseudo_bytes($bytes), false);
        return $token;
    }

    function validate($raw_token, $valid_token)
    {
        // hash raw_token
        $token = hash('sha256', $raw_token);

        // compare tokens
        return !empty($valid_token) && hash_equals($valid_token, $token);
    }
}

// Initialize the token class
$cls_token = new Token();