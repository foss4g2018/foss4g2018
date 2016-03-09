<?php

include dirname(dirname(__FILE__)).'/mail.php';

error_reporting (E_ALL ^ E_NOTICE);

$post = (!empty($_POST)) ? true : false;

if($post)
{
include 'email_validation.php';

$name = stripslashes($_POST['name']);
$email = trim($_POST['email']);
$lastname = stripslashes($_POST['lastname']);
$address = stripslashes($_POST['address']);
$zipcode = stripslashes($_POST['zipcode']);
$city = stripslashes($_POST['city']);
$subject = 'Contact Form';
$message = "
First Name: ".$name."
Last Name: ".$lastname."
Address: ".$address."
Zip Code: ".$zipcode."
City: ".$city."
";


$error = '';

// Check name

if(!$name)
{
$error .= 'Please enter your name.<br />';
}

// Check email

if(!$email)
{
$error .= 'Please enter an e-mail address.<br />';
}

if($email && !ValidateEmail($email))
{
$error .= 'Please enter a valid e-mail address.<br />';
}

if(!$error)
{
$mail = mail(CONTACT_FORM, $subject, $message,
     "From: ".$name." <".$email.">\r\n"
    ."Reply-To: ".$email."\r\n"
    ."X-Mailer: PHP/" . phpversion());


if($mail)
{
echo 'OK';
}

}
else
{
echo '<div class="notification_error">'.$error.'</div>';
}

}
?>