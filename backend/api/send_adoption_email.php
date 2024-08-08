<?php
require '../vendor/autoload.php'; // Include PHPMailer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendAdoptionEmail($petOwnerEmail, $userData) {
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = getenv('SMTP_USERNAME');
        $mail->Password = getenv('SMTP_PASSWORD');
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('furryfriens123@gmail.com', 'Furry Friends');
        $mail->addAddress($petOwnerEmail);

        $mail->isHTML(true);
        $mail->Subject = 'Adoption Request Received';
        $mail->Body = "
        <p>Hello,</p>
        <p>You have a new adoption request for your pet. Here are the details:</p>
        <p><strong>Name:</strong> {$userData['name']}</p>
        <p><strong>Email:</strong> {$userData['email']}</p>
        <p><strong>Message:</strong> {$userData['message']}</p>
        <p>Thank you for using our service.</p>
        <p>Best regards,<br>Furry Friends Team</p>
        ";

        $mail->send();
        return ['status' => 'success'];
    } catch (Exception $e) {
        return ['status' => 'error', 'message' => $mail->ErrorInfo];
    }
}

// Get the data from POST request
$data = json_decode(file_get_contents("php://input"), true);

$petOwnerEmail = $data['petOwnerEmail'];
$userData = $data['userData'];

$response = sendAdoptionEmail($petOwnerEmail, $userData);
echo json_encode($response);
?>
