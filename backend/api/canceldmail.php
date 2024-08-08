<?php

require('../config/config.php');
require '../vendor/autoload.php'; // Load PHPMailer and other dependencies

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// Create a new PHPMailer instance
$mail = new PHPMailer(true);

try {
    // SMTP server settings
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // Set the SMTP server to send through
    $mail->SMTPAuth = true;
    $mail->Username = 'furryfriens123@gmail.com'; // SMTP username
    $mail->Password = 'rtcgadrtpxgbepdd'; // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587; // TCP port to connect to

    // Set the sender's address
    $mail->setFrom('furryfriens123@gmail.com', 'Furry Friends');

    // Get POST data
    $input = json_decode(file_get_contents('php://input'), true);
    $email = $input['email'] ?? '';
    $doctorName = $input['doctorName'] ?? '';

    if (!$email || !$doctorName) {
        echo json_encode(['message' => 'Invalid input.']);
        exit;
    }

    // Add a recipient
    $mail->addAddress($email);


    $header = file_get_contents('../mailtemplate/header.html');
    $footer = file_get_contents('../mailtemplate/footer.html');

    // Email content
    $mail->isHTML(true);
    $mail->Subject = 'Grooming Service Cancellation Notification';
    $mail->Body = $header."
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
                border-radius: 5px;
            }
            .header h1 {
                margin: 0;
                color: #e74c3c;
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
        </style>
    </head>
    <body>
        
             <div style='padding: 16px; background-color: #4a90e2; color: white; text-align: center; border-radius: 8px 8px 0 0;'>
                <h1 style='font-size: 24px; font-weight: bold;''>Your Appointment is Canceled </h1>
            </div>
            <div class='content'>
                <p>Dear <strong>{$doctorName}</strong>,</p>
                <p>Your grooming service appointment has been canceled.</p>
                <p>Thank you for your attention.</p>
            </div>
            <div class='footer'>
                <p>&copy; 2024 Furry Friends. All rights reserved.</p>
            </div>
        
    </body>
    </html>
    ".$footer;

    // Send the email
    $mail->send();

    echo json_encode(['message' => 'Email sent successfully.']);
} catch (Exception $e) {
    echo json_encode(['message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo]);
}
?>
