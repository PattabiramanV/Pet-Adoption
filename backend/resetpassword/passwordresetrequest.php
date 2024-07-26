<?php

header("Access-Control-Allow-Origin: *"); // Allow from any origin
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Allowed methods
header("Access-Control-Allow-Headers: Content-Type"); // Allowed headers

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Handle preflight request
    http_response_code(204);
    exit;
}

require '../config/config.php'; // Ensure database connection file is included
require '../vendor/autoload.php'; // Load Composer's autoloader

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if ($data && isset($data->email)) {
        $email = htmlspecialchars(strip_tags($data->email));

        try {
            // Check if email exists
            $query = "SELECT id FROM users WHERE email = :email";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':email', $email);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                $userId = $user['id'];

                // Generate OTP
                $otp = rand(100000, 999999);

                // Update OTP and expiry in the database
                $updateQuery = "UPDATE users SET otp = :otp, otp_expiry = DATE_ADD(NOW(), INTERVAL 15 MINUTE) WHERE id = :id";
                $updateStmt = $conn->prepare($updateQuery);
                $updateStmt->bindParam(':otp', $otp);
                $updateStmt->bindParam(':id', $userId);
                $updateStmt->execute();

                // Send OTP to email using PHPMailer
                $mail = new PHPMailer(true);
                // $mail->SMTPDebug = 2; // Enable verbose debug output

                try {
                    // Server settings
                    $mail->isSMTP();                                            // Send using SMTP
                    $mail->Host       = 'smtp.gmail.com';                       // Set the SMTP server to send through
                    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
                    $mail->Username   = 'furryfriens123@gmail.com';             // SMTP username
                    $mail->Password   = 'rtcgadrtpxgbepdd';                     // SMTP password
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;           // Enable TLS encryption
                    $mail->Port       = 587;                                    // TCP port to connect to

                    // Recipients
                    $mail->setFrom('furryfriens123@gmail.com', 'Furry Friends');    // Your email address
                    $mail->addAddress($email);                                  // Add a recipient

                    // Content
                    $mail->isHTML(true);                                        // Set email format to HTML
                    $mail->Subject = 'Your OTP Code';
                    $mail->Body = '
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Your OTP Code</title>
                        <style>
                            body {
                                font-family: \'Verdana\', sans-serif;
                                background-color: #f0f4f8;
                                color: #333333;
                                padding: 20px;
                                margin: 0;
                            }
                            .container {
                                background-color: #ffffff;
                                border-radius: 15px;
                                padding: 25px;
                                max-width: 500px;
                                margin: 0 auto;
                                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                                border-top: 5px solid #696299; /* Updated top border color */
                            }
                            .header {
                                text-align: center;
                                padding-bottom: 15px;
                                border-bottom: 1px solid #e0e0e0;
                                margin-bottom: 20px;
                            }
                            .header h1 {
                                margin: 0;
                                color: #696299; /* Updated header color */
                                font-size: 28px;
                            }
                            .content {
                                padding: 20px 0;
                            }
                            .content p {
                                font-size: 18px;
                                line-height: 1.5;
                                margin-bottom: 15px;
                            }
                            .otp {
                                display: inline-block;
                                background-color: #ffffff; /* OTP background color */
                                color: #696299; /* OTP text color */
                                font-size: 32px;
                                font-weight: bold;
                                padding: 15px 30px;
                                border-radius: 8px;
                                margin: 20px 0;
                                text-align: center;
                                border: 2px solid #696299; /* Border color for OTP */
                            }
                            .footer {
                                text-align: center;
                                font-size: 14px;
                                color: #888888;
                                padding-top: 15px;
                                border-top: 1px solid #e0e0e0;
                            }
                            .footer p {
                                margin: 5px 0;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>Furry Friends</h1>
                            </div>
                            <div class="content">
                                <p>Hi there,</p>
                                <p>Your OTP code is:</p>
                                <div class="otp">' . $otp . '</div>
                                <p>Use this code to complete your password reset request. The OTP will expire in 15 minutes.</p>
                            </div>
                            <div class="footer">
                                <p>If you didn\'t request this code, please ignore this email.</p>
                                <p>Best regards,</p>
                                <p>The Furry Friends Team</p>
                            </div>
                        </div>
                    </body>
                    </html>
                    ';

                    
                        // Plain text alternative body
                        $mail->AltBody = "Your OTP code is: $otp";
                    $mail->AltBody = "Your OTP code is: $otp";

                    $mail->send();
                    echo json_encode(array("message" => "OTP sent to your email."));
                    http_response_code(200);
                } catch (Exception $e) {
                    echo json_encode(array("message" => "Failed to send OTP: " . $mail->ErrorInfo));
                    http_response_code(500);
                }
            } else {
                echo json_encode(array("message" => "Email not found."));
                http_response_code(404);
            }
        } catch (PDOException $e) {
            echo json_encode(array("message" => "Database error: " . $e->getMessage()));
            http_response_code(500);
        }
    } else {
        echo json_encode(array("message" => "Invalid input."));
        http_response_code(400);
    }
} else {
    http_response_code(405); // Method Not Allowed
}
