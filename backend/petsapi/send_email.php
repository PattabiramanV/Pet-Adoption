<?php

require '../config/config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


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
    
    // Load email templates
    $header = file_get_contents('../mailtemplate/header.html');
    $footer = file_get_contents('../mailtemplate/footer.html');

    if (!$email) {
        echo json_encode(['success' => false, 'error' => 'Invalid email address.']);
        exit;
    }

    $subject = "Pet Adoption Request";
    $message = "
    <!DOCTYPE html>
    <html>
    <head>
    <body>
        {$header}
        <div class=''>
             <div style='padding: 16px; background-color: #4a90e2; color: white; text-align: center; border-radius: 8px 8px 0 0;'>
                    <h1 style='font-size: 24px; font-weight: bold;'>Adoption Request</h1>
                </div>
            <div class='content'>
                <p><strong>Name:</strong> {$userName}</p>
                <p><strong>Contact:</strong> {$userContact}</p>
                <p><strong>Gender:</strong> {$gender}</p>
                <p><strong>City:</strong> {$city}</p>
                <p><strong>State:</strong> {$state}</p>
                <p><strong>Address:</strong> {$address}</p>
            </div>
            <div class='footer'>
                <p>&copy; 2024 Furry Friends. All rights reserved.</p>
            </div>
        </div>
        {$footer}
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