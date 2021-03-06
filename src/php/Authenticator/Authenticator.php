<?php
//    Created on : Mar 30, 2015, 7:55 PM
//    Author     : David G Chung

require_once 'DataAccess/MySqlDataBase.php';
require_once 'AuthenticatorProcedures.php';

// Replacement hash_equals function
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




class Authenticator
{
    private $signed_in = false;
    private $user_id;

    private $db;
    private $proc;

    public function is_signed_in()
    {
        $this->update_active();
        return $this->signed_in;
    }

    public function get_user_id()
    {
        return $this->user_id;
    }



    function __construct($database, $procedures)
    {
        $this->db = $database;
        $this->proc = $procedures;
        session_start();

        // init failed login attempts
        if(!isset($_SESSION['failed_attempts']))
            $_SESSION['failed_attempts'] = 0;

        // if the user has a authentication token, signin
        if(!empty($_COOKIE['token']) && !empty($_COOKIE['selector']))
        {
            $this->signin_by_token($_COOKIE['selector'], $_COOKIE['token']);
        }
        // Setup the Session if it already exits
        else if(!empty($_SESSION['user_id']))
        {
            $this->user_id = $_SESSION['user_id'];
            $this->signed_in = true;
        }
        else
        {
            unset($this->user_id);
            $this->signed_in = false;
        }
    }

    // Creates a random token and selector
    private function generate_token()
    {
        // Gen Token, Gen Selector
        $selector = bin2hex(openssl_random_pseudo_bytes(12));
        $token = openssl_random_pseudo_bytes(128);

        // Save to cookies
        setcookie('selector', $selector, time() + (86400 * 30), '/');
        setcookie('token', $token, time() + (86400 * 30), '/');

        // Save to DB
        $this->db->function_call($this->proc['StartSession'], [$this->user_id, $selector, hash('sha256', $token, false)], "update");
    }



    public function signin_by_user_info($username, $password, $rememberYN)
    {
        // Get user password from DB
        $result = $this->db->function_call($this->proc['User_ByName'], [$username], "select");
        $salt = '';
        $crypt_pass = '';

        // If a Password was returned
        if(!empty($result[0]['Password']))
        {
            // Hash the user input
            $salt = substr($result[0]['Password'], 0, 28) . "$";
            $crypt_pass = crypt($password, $salt);
        }

        // Call DB for User_Id
        $result = $this->db->function_call($this->proc['SignIn_ByInfo'], [$username, $crypt_pass], "select");

        // Start session
        $this->signin($result);

        // if user is valid && they want to be remembered  --> generate token
        if($this->signed_in && $rememberYN)
            $this->generate_token();

        // return Sign in status
        return $this->signed_in;
    }

    private function signin_by_token($selector, $token)
    {
        // Call DB for User_Id, Token
        $result = $this->db->function_call($this->proc['SignIn_ByToken'], [$selector], "select");
            // echo print_r($selector);
            // echo "<br>";
            // echo print_r($result[0]['Token']);
            // echo "<br>";
            // echo print_r(hash('sha256', $token));
            // echo "<br>";

        // If token is valid  --> Start session
        if(!empty($result[0]['Token']) && hash_equals($result[0]['Token'], hash('sha256', $token)))
        {
            $this->signin($result);
        }

        // return Sign in status
        return $this->signed_in;
    }

    // Sets up the Sessiion based on the DB result provided
    private function signin($result)
    {
        $timePassed = (isset($_SESSION['failed_time'])) ? time() - $_SESSION['failed_time'] : time()-1;

        // Trottle failed loggin attempts
        if ($timePassed <= $_SESSION['failed_attempts'] - 15)// first 15 attempts wont throttle
        {
            sleep($_SESSION['failed_attempts'] - 15 - $timePassed);
        }

        if(!empty($result[0]['User_Id']))
        {
            $user = $result[0];

            // Set session data
            $this->user_id = $_SESSION['user_id'] = $user['User_Id'];
            $this->signed_in = true;

            // Recreate sessionId to prevent session fixation
            session_regenerate_id();
            $this->update_active();
        }
        else // if loggin failed
        {
            $this->signed_in = false;
            $_SESSION['failed_attempts'] += 1;
            $_SESSION['failed_time'] = time();
        }
    }



    public function signup($username, $email, $password, $repass)
    {
        // Hash password
        $salt = $this->salt();
        $crypt_pass = crypt($password, $salt);
        $crypt_repass = crypt($repass, $salt);

        // Call DB with new user
        $result = $this->db->function_call($this->proc['SignUp'], [$username, $email, $crypt_pass, $crypt_repass ], "select");

        // Start session with new user
        $this->signin($result);

        // if the new user was signed in --> update DataBase
        if($this->signed_in)
            $this->db->function_call($this->proc['SignIn_ByInfo'], [$username, $crypt_pass], "select");

        // return Sign in status
        return $this->signed_in;
    }

    public function signout()
    {
        // Alert DB of the event
        if(isset($this->user_id))
            $this->db->function_call($this->proc['SignOut'], [$this->user_id], "update");

        // Clear properties
        unset($this->user_id);
        $this->signed_in = false;

        // Clear Cookies
        unset($_COOKIE['selector']);
        unset($_COOKIE['token']);
        setcookie("selector", '', time() - 3600, '/');
        setcookie("token", '', time() - 3600, '/');

        // Clear Session
        session_unset();
        session_destroy();
    }


    private function salt()
    {
        return "$2a$10$" . substr(bin2hex(openssl_random_pseudo_bytes(22)), 0, 21) . "$";
    }


    public function change_pass_by_reset_token($hash_token, $newpass, $repass)
    {
        // Hash password
        $salt = $this->salt();
        $crypt_pass = crypt($newpass, $salt);
        $crypt_repass = crypt($repass, $salt);

        // update DB
        // DB will delete rest token
        $this->db->function_call("cc_sp_ResetToken_Use", [$hash_token, $crypt_pass, $crypt_repass], "Update");
    }

    public function change_pass_by_info($username, $curpass, $newpass, $repass)
    {
        // get the current password salt
        $result = $this->db->function_call($this->proc['User_ByName'], [$username], "select");

         // If a Password was returned
        if(!empty($result[0]['Password']))
        {
            // use the current salt to hash the user's input
            $salt = substr($result[0]['Password'], 0, 28) . "$";
            $crypt_curpass = crypt($curpass, $salt);
        }

        // Check if user is_valid
        $result = $this->db->function_call("cc_sp_User_ByInfo", [$username, $crypt_curpass], "select");


        // if user is_valid
        $is_valid = false;
        if(!empty($result[0]['User_Id']))
        {
            $is_valid = true;

            //  hash new password
            $salt = $this->salt();
            $crypt_newpass = crypt($newpass, $salt);
            $crypt_repass = crypt($repass, $salt);

            //  update the password on the DB
            $this->db->function_call("cc_sp_User_UpdatePassword", [$result[0]['User_Id'], $crypt_curpass, $crypt_newpass, $crypt_repass], "Update");
        }

        return $is_valid;
    }




    public function update_active()
    {
        // Regenerate new session id every 10 mins
        if(!isset($_SESSION['last_created']))
        {
            $_SESSION['last_created'] = time();
        }
        else if(time() - $_SESSION['last_created'] > 600)
        {
            $_SESSION['last_created'] = time();
            session_regenerate_id();
        }


        // Logout after 60 mins of inactivity
        if(isset($_SESSION['last_active']) && time() - $_SESSION['last_active'] > 3600)
        {
            $this->signout();
        }
        $_SESSION['last_active'] = time();
    }





    public function signin_test()
    {
        return $this->signin_by_user_info('newuserw', 'wasd', true);
    }

    public function signup_test()
    {
        return $this->signup('newuserw', '1234w@eamil.com', 'wasd', 'wasd');
    }
}

$auth = new Authenticator($db, $authProcedures);