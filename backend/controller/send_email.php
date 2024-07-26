

<?php


// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;

// require 'vendor/autoload.php';

// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     $data = json_decode(file_get_contents('php://input'), true);
//     $userEmail = $data['email'];
//     $userName = $data['name'];
//     $hostelName = $data['hostel'];

//     $mail = new PHPMailer(true);

//     try {
//         //Server settings
//         $mail->isSMTP();
//         $mail->Host = 'smtp.example.com'; // Set the SMTP server to send through
//         $mail->SMTPAuth = true;
//         $mail->Username = 'your_email@example.com'; // SMTP username
//         $mail->Password = 'your_email_password'; // SMTP password
//         $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
//         $mail->Port = 587; // TCP port to connect to

//         //Recipients
//         $mail->setFrom('your_email@example.com', 'Your Name');
//         $mail->addAddress($userEmail, $userName);

//         // Content
//         $mail->isHTML(true);
//         $mail->Subject = 'Hostel Booking Confirmation';
//         $mail->Body    = "Dear $userName,<br><br>Your booking at $hostelName has been confirmed.<br><br>Thank you!";
//         $mail->AltBody = "Dear $userName,\n\nYour booking at $hostelName has been confirmed.\n\nThank you!";

//         $mail->send();
//         echo json_encode(['message' => 'Email sent successfully']);
//     } catch (Exception $e) {
//         echo json_encode(['message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
//     }
// } else {
//     echo json_encode(['message' => 'Invalid request method']);
// }





// <?php
// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;

// require 'vendor/autoload.php';

// // Allow from any origin
// if (isset($_SERVER['HTTP_ORIGIN'])) {
//     header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
//     header('Access-Control-Allow-Credentials: true');
//     header('Access-Control-Max-Age: 86400'); // cache for 1 day
// }

// // Access-Control headers are received during OPTIONS requests
// if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
//     if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
//         header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // allow methods
//     }

//     if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
//         header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
//     }

//     exit(0);
// }

// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     $data = json_decode(file_get_contents('php://input'), true);
//     $userEmail = $data['email'];
//     $userName = $data['name'];
//     $hostelName = $data['hostel'];

//     $mail = new PHPMailer(true);

//     try {
//         //Server settings
//         $mail->isSMTP();
//         $mail->Host = 'smtp.example.com'; // Set the SMTP server to send through
//         $mail->SMTPAuth = true;
//         $mail->Username = 'your_email@example.com'; // SMTP username
//         $mail->Password = 'your_email_password'; // SMTP password
//         $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
//         $mail->Port = 587; // TCP port to connect to

//         //Recipients
//         $mail->setFrom('your_email@example.com', 'Your Name');
//         $mail->addAddress($userEmail, $userName);

//         // Content
//         $mail->isHTML(true);
//         $mail->Subject = 'Hostel Booking Confirmation';
//         $mail->Body    = "Dear $userName,<br><br>Your booking at $hostelName has been confirmed.<br><br>Thank you!";
//         $mail->AltBody = "Dear $userName,\n\nYour booking at $hostelName has been confirmed.\n\nThank you!";

//         $mail->send();
//         echo json_encode(['message' => 'Email sent successfully']);
//     } catch (Exception $e) {
//         echo json_encode(['message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
//     }
// } else {
//     echo json_encode(['message' => 'Invalid request method']);
// }








// // Allow from any origin (CORS)
// if (isset($_SERVER['HTTP_ORIGIN'])) {
//     header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
//     header('Access-Control-Allow-Credentials: true');
//     header('Access-Control-Max-Age: 86400'); // cache for 1 day
// }

// // Access-Control headers are received during OPTIONS requests
// if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
//     if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
//         header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // allow methods
//     }

//     if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
//         header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
//     }

//     exit(0);
// }



// header("Access-Control-Allow-Origin: *"); // Allow from any origin
// header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Allowed methods
// header("Access-Control-Allow-Headers: Content-Type");

// // echo json_encode(['pattabi'=>"pppp"]);

// // require '../config/config.php';



// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;

// require 'vendor/autoload.php';

// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     $data = json_decode(file_get_contents('php://input'), true);
//     $userEmail = $data['email']; // Recipient's email
//     $userName = $data['name'];   // Recipient's name
//     $hostelName = $data['hostel']; // Hostel name

//     $mail = new PHPMailer(true);

//     try {
//         //Server settings
//         $mail->isSMTP();
//         $mail->Host = 'smtp.example.com'; // Set the SMTP server to send through
//         $mail->SMTPAuth = true;
//         $mail->Username = 'pattabiramanvdckap@gmail.com'; // SMTP username
//         $mail->Password = '9361120513'; // SMTP password (replace with the actual password)
//         $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
//         $mail->Port = 587; // TCP port to connect to

//         // Set the sender's address
//         $mail->setFrom('pattabiramanvdckap@gmail.com', 'Furry friends');

//         // Add a recipient
//         $mail->addAddress('pattabikrv2002@gmail.com', $userName);

//         // Email content
//         $mail->isHTML(true);
//         $mail->Subject = 'Hostel Booking Confirmation';
//         $mail->Body    = "Dear $userName,<br><br>Your booking at $hostelName has been confirmed.<br><br>Thank you!";
//         $mail->AltBody = "Dear $userName,\n\nYour booking at $hostelName has been confirmed.\n\nThank you!";

//         // Send the email
//         $mail->send();
//         echo json_encode(['message' => 'Email sent successfully']);
//     } catch (Exception $e) {
//         echo json_encode(['message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
//     }
// } else {
//     echo json_encode(['message' => 'Invalid request method']);
// }



// Allow from any origin (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

// // Allow from any origin (CORS)

// // header("Access-Control-Allow-Headers:  application/json");


// // Handle preflight request (OPTIONS)
// // if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
// //     http_response_code(200); // Set the status to 200 OK
// //     exit();
// // }


if ($_SERVER['REQUEST_METHOD'] === 'POST') {




    $data = json_decode(file_get_contents('php://input'), true);


    $userEmail = $data['email']; // Recipient's email
    $userName = $data['name'];   // Recipient's name
    $hostelName = $data['hostel']; // Hostel name

    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Set the SMTP server to send through
        $mail->SMTPAuth = true;
        $mail->Username = 'pattabiramanvdckap@gmail.com'; // SMTP username
        $mail->Password = 'jynzpfajhjjwnqzt'; // SMTP password (replace with the actual password)
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587; // TCP port to connect to

        // Set the sender's address
        $mail->setFrom('pattabiramanvdckap@gmail.com', 'Furry friends');

        // Add a recipient
        $mail->addAddress('pattabikrv2002@gmail.com', $userName);

        // Email content
        $mail->isHTML(true);
        $mail->Subject = 'Hostel Booking Confirmation';
        $mail->Body = "
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
                    <h1>Hostel Booking Confirmation</h1>
                </div>
                <div class='content'>
                    <p>Dear $userName,</p>
                    <p>Your booking at <strong>$hostelName</strong> has been confirmed.</p>
                    <p>Thank you for choosing us!</p>
                    <a href='#' class='button'>View Your Booking</a>
                </div>
                <div class='footer'>
                    <p>&copy; 2024 Furry Friends. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        ";
        
        $mail->AltBody = "Dear $userName,\n\nYour booking at $hostelName has been confirmed.\n\nThank you for choosing us!\n\nFor more details, please visit our website.";
        
        // // Send the email
        $mail->send();
        
    } catch (Exception $e) {
        echo json_encode(['message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}", 'trace' => $e->getTraceAsString()]);
    }


} else {
    echo json_encode(['message' => 'Invalid request method']);
}




