<?php
/**
 * @Author: David
 * @Date:   2016-04-07 14:08:48
 * @Last Modified by:   David
 * @Last Modified time: 2016-04-13 17:25:24
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
    private $token;

    public function raw()
    {
        return $this->token;
    }

    public function hash()
    {
        return hash('sha256', $this->token, false);
    }

    public static function hash_token($tok)
    {
        return hash('sha256', $tok, false);
    }

    function __construct($bytes)
    {
        $this->token = bin2hex(openssl_random_pseudo_bytes($bytes));
    }


    public function validate($test_token)
    {
        return !empty($test_token) && hash_equals($this->get_hash(), $test_token);
    }
}