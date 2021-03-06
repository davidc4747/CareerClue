<?php
/**
 * @Author: David
 * @Date:   2016-04-07 12:27:38
 * @Last Modified by:   David
 * @Last Modified time: 2016-04-08 15:12:43
 */
?>

<!DOCTYPE html>
<html>



    <head>
        <title>CareerClue test email</title>

        <style type="text/css">
            body
            {
                background-color: #a2a2a2;
                width: 75%;
                margin: 0 auto;
                font-family: 'Roboto', sans-serif;
            }
            .highlight
            {
                color: #F49814;
            }
            .button
            {

                display: block;
                padding: 0.8em 1.4em;
                margin: 1.3em 2.5em;

                color: #fbfbfb;
                background-color: #F49814;

                width: 300px;
                text-align: center;
                text-decoration: none;
            }
        </style>

    </head>



    <body style="background-color: #a2a2a2;width: 75%;margin: 0 auto;font-family: 'Roboto', sans-serif;">

        <h1><span class="highlight" style="color: #F49814;">Career</span>Clue</h1>

        <section class="info">

            <h3>Hello <span class="name"><?php echo $username ?></span>,</h3>

            <h4>There was a request to reset your password</h4>

            <!-- style it like a button -->
            <a class="button" href="http://localhost/CareerClue/src/#/Reset/<?php echo $token->raw() ?>" style="display: block;padding: 0.8em 1.4em;margin: 1.3em 2.5em;color: #fbfbfb;background-color: #F49814;width: 300px;text-align: center;text-decoration: none;">Change Password</a>

            <p>
                If you did not make this request, just ignore this email.
                Otherwise, click to button to change your password.
            </p>

        </section>


    </body>



</html>