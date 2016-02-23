<?php
//    Created on : Mar 30, 2015, 7:55 PM
//    Author     : David G Chung

class Session
{
    private $logged_in = false;
    public $user_id;

    function __construct()
    {
        session_start();
        $this->check_login();
    }

    public function is_logged_in()
    {
        return $this->logged_in;
    }

    private function check_login()
    {
        if(isset($_SESSION['user_id']))
        {
            $this->user_id = $_SESSION['user_id'];
            $this->logged_in = true;
        }
        else
        {
            unset($this->user_id);
            $this->logged_in = false;
        }
    }

    public function login($userData)
    {

        // Get User Id from DB
        $result = $db->function_call("cc_sp_User_ByLogin", [$userData->name, $userData->password], "select");

        if(sizeof($result) > 0)
        {
            $user = $result[0];

            // SEt session data
            $this->user_id = $user["User_Id"];
            $this->logged_in = true;

            // if they want to stay logged in
            if($userData->remember)
            {
                $_SESSION['user_id'] = $user["User_Id"];
            }
        }
    }

    public function logout()
    {
        unset($_SESSION['user_id']);
        unset($this->user_id);
        $this->logged_in = false;
    }
}

$session = new Session();