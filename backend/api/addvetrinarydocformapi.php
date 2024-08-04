<?php

require '../config/config.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

require '../vendor/autoload.php';

// Load environment variables from .env file
$dotenv = Dotenv::createImmutable(__DIR__ . '/../..');
$dotenv->load();

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

$user_id = authenticate(); // Ensure this function is correctly defined

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check for empty fields
    if (empty($_POST['name']) || empty($_POST['education']) || empty($_POST['phone']) 
        || empty($_POST['experience']) || empty($_POST['email']) || empty($_POST['have_a_clinic']) 
        || empty($_POST['specialist']) || empty($_POST['address']) || empty($_POST['available_timing']) 
        || empty($_POST['description']) || empty($_POST['home_visiting_available'])
        || empty($_POST['doctor_registerno']) || empty($_FILES['profile_img']['name']) || empty($_POST['state']) || empty($_POST['city'])) {
        echo json_encode(array("message" => "Please fill all the fields and upload an image."));
        die();
    }

    // Extract data and sanitize
    $doctorname = htmlspecialchars(strip_tags($_POST['name']));
    $docContact = htmlspecialchars(strip_tags($_POST['phone']));
    $docemail = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $education = htmlspecialchars(strip_tags($_POST['education']));
    $experience = htmlspecialchars(strip_tags($_POST['experience']));
    $specialisation = htmlspecialchars(strip_tags($_POST['specialist']));
    $availableTiming = htmlspecialchars(strip_tags($_POST['available_timing']));
    $haveAclinic = htmlspecialchars(strip_tags($_POST['have_a_clinic']));
    $address = htmlspecialchars(strip_tags($_POST['address']));
    $description = htmlspecialchars(strip_tags($_POST['description']));
    $homeVisiting = htmlspecialchars(strip_tags($_POST['home_visiting_available']));
    $doctor_registerno = htmlspecialchars(strip_tags($_POST['doctor_registerno']));
    $state = htmlspecialchars(strip_tags($_POST['state']));
    $city = htmlspecialchars(strip_tags($_POST['city']));

    // Phone number validation
    $phonePattern = '/^\+?[0-9\s\-()]+$/';
    if (!preg_match($phonePattern, $docContact)) {
        echo json_encode(array("message" => "Invalid phone number format."));
        die();
    }

    // Image handling
    $imagePath = null;
    echo json_encode($_FILES);
    if (isset($_FILES['profile_img']) && $_FILES['profile_img']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['profile_img']['tmp_name'];
        $fileName = basename($_FILES['profile_img']['name']);
        $uploadFileDir = '../docterprofile/';
        $dest_path = $uploadFileDir . $fileName;

        // Validate image type
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!in_array($_FILES['profile_img']['type'], $allowedTypes)) {
            echo json_encode(["message" => "Invalid image type. Only JPEG, PNG, and GIF are allowed."]);
            die();
        }

        // Check if the directory exists
        if (!is_dir($uploadFileDir)) {
            if (!mkdir($uploadFileDir, 0755, true)) {
                echo json_encode(["message" => "Failed to create upload directory."]);
                die();
            }
        }

        // Move the uploaded file
        if (move_uploaded_file($fileTmpPath, $dest_path)) {
            $imagePath = $dest_path;
        } else {
            echo json_encode(["message" => "Possible file upload attack or move failed!"]);
            die();
        }
    } else {
        echo json_encode(["message" => "Image upload failed. No file uploaded or upload error."]);
        die();
    }
    // Insert data into database
    $query = "INSERT INTO vetneries (name, education, have_a_clinic, specialist, available_timing, phone, home_visiting_available, experience, address, description, user_id, email, profile_img, doctor_registerno,state,city) 
              VALUES (:doctorname, :education, :haveAclinic, :specialisation, :availableTiming, :docContact, :homeVisiting, :experience, :address, :description, :user_id, :docemail, :imagePath, :doctor_registerno, :state, :city)";

    try {
        $stmt = $conn->prepare($query);

        $stmt->bindParam(':doctorname', $doctorname);
        $stmt->bindParam(':education', $education);
        $stmt->bindParam(':haveAclinic', $haveAclinic);
        $stmt->bindParam(':specialisation', $specialisation);
        $stmt->bindParam(':availableTiming', $availableTiming);
        $stmt->bindParam(':docContact', $docContact);
        $stmt->bindParam(':homeVisiting', $homeVisiting);
        $stmt->bindParam(':experience', $experience);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':docemail', $docemail);
        $stmt->bindParam(':imagePath', $imagePath);
        $stmt->bindParam(':doctor_registerno', $doctor_registerno);
        $stmt->bindParam(':state', $state);
        $stmt->bindParam(':city', $city);

        if ($stmt->execute()) {
            echo json_encode(array("message" => "Doctor registered successfully."));
            updateUserToDoctor($user_id);

            emailSendFun($docemail, $doctorName);
        } else {
            $errorInfo = $stmt->errorInfo();
            echo json_encode(array("message" => "Unable to register doctor.", "error" => $errorInfo));
        }
    } catch (Exception $e) {
        echo json_encode(array("message" => "An error occurred.", "error" => $e->getMessage()));
    }


    
}

// Update user to doctor
function updateUserToDoctor($user_id) {
    global $conn;
    $query = "UPDATE users SET is_doctor = 'doctor' WHERE id = :user_id";
    try {
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
    } catch (Exception $e) {
        echo json_encode(array("message" => "An error occurred while updating user to doctor.", "error" => $e->getMessage()));
    }
}



// email sending.......
function emailSendFun($toUserEmail, $doctorName) {
    $mail = new PHPMailer(true);

    try {
        // SMTP server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Set the SMTP server to send through
        $mail->SMTPAuth = true;
        $mail->Username = 'furryfriens123@gmail.com'; // SMTP username
        $mail->Password = 'rtcgadrtpxgbepdd'; // SMTP password (replace with the actual password)
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587; // TCP port to connect to

        // Set the sender's address
        $mail->setFrom('furryfriens123@gmail.com', 'Furry friends');

        // Add a recipient
        $mail->addAddress("$toUserEmail", "$doctorName");
        



        // Email content
        $mail->isHTML(true);
        $mail->Subject = 'Grooming Service Booking Confirmation';
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
                    border-radius: 5px;
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
                    <h1>Your Doctor profile added to this website Confirmation</h1>
                </div>
                <div class='content'>
                    <p>Dear User,</p>
                    <p> <strong>{$doctorName}</strong>,Your profile has been confirmed.</p>
                    <p>Thank you for choosing us!</p>
                    // <a href='#' class='button'>View Your Booking</a>
                </div>
                <div class='footer'>
                    <p>&copy; 2024 Furry Friends. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        ";

        // $mail->AltBody = "Dear User,\n\nYour booking with {$doctorName} has been confirmed.\n\nThank you for choosing us!\n\nFor more details, please visit our website.";

        // Debugging output
        $mail->SMTPDebug = 2; // Enable verbose debug output
        $mail->Debugoutput = 'html';

        // Send the email
        $mail->send();

        echo json_encode(['message' => "Email sent successfully."]);
    } catch (Exception $e) {
        echo json_encode(['message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}", 'trace' => $e->getTraceAsString()]);
    }
}
?>
