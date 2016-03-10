<?php
//    Created on : Mar 30, 2015, 7:55 PM
//    Author     : David G Chung

class Session
{
    private $logged_in = false;
    private $user_id;

    public function is_logged_in()
    {
        return $this->logged_in;
    }

    public function get_user_id()
    {
        return $this->user_id;
    }



    function __construct()
    {
        session_start();
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

    public function login($user)
    {
        // SEt session data
        $this->user_id = $_SESSION['user_id'] = $user["User_Id"];
        $this->logged_in = true;

        session_regenerate_id();
        $this->update_active();
    }

    public function logout()
    {
        // unset($_SESSION['user_id']);
        unset($this->user_id);
        $this->logged_in = false;

        session_unset();
        session_destroy();
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


        // Logout after 30 mins of inactivity
        if(isset($_SESSION['last_active']) && time() - $_SESSION['last_active'] > 1800)
        {
            $this->logout();
        }
        $_SESSION['last_active'] = time();
    }



}

$session = new Session();