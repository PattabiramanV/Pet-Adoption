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

// env file add 

use Dotenv\Dotenv;

// Load the .env file
$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();



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
                    $mail->Host       = $_ENV['SMTP_HOST'];
                    $mail->SMTPAuth   = $_ENV['SMTP_AUTH'];
                    $mail->Username   = $_ENV['SMTP_USERNAME'];
                    $mail->Password   = $_ENV['SMTP_PASSWORD'];
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                    $mail->Port       = $_ENV['SMTP_PORT'];

                    // Recipients
                    $mail->setFrom($_ENV['SMTP_FROM_ADDRESS'], $_ENV['SMTP_FROM_NAME']);
                    $mail->addAddress($email);                                  // Add a recipient

                    $header = file_get_contents('../mailtemplate/header.html');
                    $footer = file_get_contents('../mailtemplate/footer.html');


                    // Content
                    $mail->isHTML(true);                                       
                    $mail->Subject = 'Your OTP Code';
                    $mail->Body = $header . '
                          <div class="content">
                             <p>Hi there,</p>
                               <p>Your OTP code is:</p>
                                  <div class="otp">' . $otp . '</div>
                                 <p>Use this code to complete your password reset request. The OTP will expire in 15 minutes.</p>
                                     </div>
                                     ' . $footer;

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
