<?php

require '../config/config.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? null;
    $userName = $_POST['userName'] ?? null;
    $userContact = $_POST['userContact'] ?? null;
    $gender = $_POST['gender'] ?? null;
    $city = $_POST['city'] ?? null;
    $state = $_POST['state'] ?? null;
    $address = $_POST['address'] ?? null;

    if (!$email) {
        echo json_encode(['success' => false, 'error' => 'Invalid email address.']);
        exit;
    }

    $subject = "Pet Adoption Request";
    $message = "
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                color: #333;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 10px 0;
                border-bottom: 2px solid #e4e4e4;
            }
            .header h1 {
                margin: 0;
                color: #4a90e2;
            }
            .content {
                padding: 20px;
            }
            .footer {
                text-align: center;
                padding: 10px;
                border-top: 2px solid #e4e4e4;
                font-size: 14px;
                color: #888;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                margin-top: 20px;
                background-color: #4a90e2;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
            }
            .button:hover {
                background-color: #357abd;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>Pet Adoption Request</h1>
            </div>
            <div class='content'>
                <h3>Pet Adoption Request</h3>
                <p><strong>Name:</strong> $userName</p>
                <p><strong>Contact:</strong> $userContact</p>
                <p><strong>Gender:</strong> $gender</p>
                <p><strong>City:</strong> $city</p>
                <p><strong>State:</strong> $state</p>
                <p><strong>Address:</strong> $address</p>
            </div>
            <div class='footer'>
                <p>&copy; 2024 Furry Friends. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    ";

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; 
        $mail->SMTPAuth = true;
        $mail->Username = 'furryfriens123@gmail.com'; 
        $mail->Password = 'rtcgadrtpxgbepdd'; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587; 

        // Set the sender's address
        $mail->setFrom('furryfriens123@gmail.com', 'Furry Friends');

        // Add a recipient
        $mail->addAddress($email); 

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $message;

        $mail->send();
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => 'Mailer Error: ' . $mail->ErrorInfo]);
    }
}
?>
