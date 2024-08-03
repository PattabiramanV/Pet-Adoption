<?php

// require '../config/config.php';
// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;

// require '../vendor/autoload.php';

// // User authentication
// $user_id = authenticate();

// $data = json_decode(file_get_contents("php://input"),true);

// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     // Check if all required fields are filled
//     if (empty($_POST['name']) || empty($_POST['contact']) || empty($_POST['email']) 
//     || empty($_POST['petType']) || empty($_POST['petGender']) || empty($_POST['petAge']) 
//     || empty($_POST['selectdoctorname']) || empty($_POST['doctorAddress']) || empty($_FILES['petimage'])
//     || empty($_POST['city']) || empty($_POST['needForPet'])) {
//         echo json_encode(array("message" => "Please fill all the fields and upload an image."));
//         die();
//     }

//     // Extract and sanitize data
//     $username = htmlspecialchars(strip_tags($_POST['name']));
//     $userContact = filter_var($_POST['contact'], FILTER_SANITIZE_NUMBER_INT);
//     $userContact = filter_var($userContact, FILTER_VALIDATE_INT);
//     $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
//     $email = filter_var($email, FILTER_VALIDATE_EMAIL);
//     $petType = htmlspecialchars(strip_tags($_POST['petType']));
//     $petGender = htmlspecialchars(strip_tags($_POST['petGender']));
//     $petAge = filter_var($_POST['petAge'], FILTER_VALIDATE_INT, ["options" => ["min_range" => 0]]);
//     $city = htmlspecialchars(strip_tags($_POST['city']));
//     $needForYou = htmlspecialchars(strip_tags($_POST['needForPet']));
//     $doctorName = htmlspecialchars(strip_tags($_POST['selectdoctorname']));
//     $doctorAddress = htmlspecialchars(strip_tags($_POST['doctorAddress']));

//     // Retrieve doctor_id based on doctor_name
//     $doctorQuery = "SELECT id, email FROM vetneries WHERE name = :doctorName";
//     $stmt = $conn->prepare($doctorQuery);
//     $stmt->bindParam(':doctorName', $doctorName);
//     $stmt->execute();
//     $doctor = $stmt->fetch(PDO::FETCH_ASSOC);

//     if ($doctor) {
//         $doctorID = $doctor['id'];
//         $doctorEmail = $doctor['email'];
//     } else {
//         echo json_encode(array("message" => "Invalid doctor name."));
//         die();
//     }

//     // Image handling
//     $imagePath = null;

//     if (isset($_FILES['petimage']) && $_FILES['petimage']['error'] === UPLOAD_ERR_OK) {
//         $fileTmpPath = $_FILES['petimage']['tmp_name'];
//         $fileName = basename($_FILES['petimage']['name']);
//         $uploadFileDir = '../docterprofile/groomingpetspic/';
//         $dest_path = $uploadFileDir . $fileName;

//         // Validate image type
//         $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
//         if (!in_array($_FILES['petimage']['type'], $allowedTypes)) {
//             echo json_encode(["message" => "Invalid image type. Only JPEG, PNG, and GIF are allowed."]);
//             die();
//         }

//         // Check if the directory exists
//         if (!is_dir($uploadFileDir)) {
//             if (!mkdir($uploadFileDir, 0755, true)) {
//                 echo json_encode(["message" => "Failed to create upload directory."]);
//                 die();
//             }
//         }

//         // Move the uploaded file
//         if (move_uploaded_file($fileTmpPath, $dest_path)) {
//             $imagePath = $dest_path;
//         } else {
//             echo json_encode(["message" => "Possible file upload attack or move failed!"]);
//             die();
//         }
//     } else {
//         echo json_encode(["message" => "Image upload failed. No file uploaded or upload error."]);
//         die();
//     }

//     // Prepare SQL query
//     $query = "INSERT INTO pet_grooming_users (name, phone, email, pet_type, pet_gender, pet_age, city, what_you_need_for_your_pet, user_id, doctor_id, doctor_address, pet_img) 
//               VALUES (:username, :userContact, :email, :petType, :petGender, :petAge, :city, :needForYou, :user_id, :doctorID, :doctorAddress, :imagePath)";

//     $stmt = $conn->prepare($query);

//     $stmt->bindParam(':username', $username);
//     $stmt->bindParam(':userContact', $userContact);
//     $stmt->bindParam(':email', $email);
//     $stmt->bindParam(':petType', $petType);
//     $stmt->bindParam(':petGender', $petGender);
//     $stmt->bindParam(':petAge', $petAge);
//     $stmt->bindParam(':city', $city);
//     $stmt->bindParam(':needForYou', $needForYou);
//     $stmt->bindParam(':user_id', $user_id);
//     $stmt->bindParam(':doctorID', $doctorID);
//     $stmt->bindParam(':doctorAddress', $doctorAddress);
//     $stmt->bindParam(':imagePath', $imagePath);

//     try {
//         if ($stmt->execute()) {
//             echo json_encode(array("message" => "User registered successfully."));
//             // Send email to the user
//             emailSendFun($email, $doctorName);
//         } else {
//             echo json_encode(array("message" => "Unable to register user."));
//         }
//     } catch (PDOException $e) {
//         echo json_encode(array("message" => "Error: " . $e->getMessage()));
//     }
// }

// function emailSendFun($toUserEmail, $doctorName) {

//     $mail = new PHPMailer(true);

//     try {
//         // SMTP server settings
//         $mail->isSMTP();                                            // Send using SMTP
//         $mail->Host       = $_ENV['SMTP_HOST'];
//         $mail->SMTPAuth   = $_ENV['SMTP_AUTH'];
//         $mail->Username   = $_ENV['SMTP_USERNAME'];
//         $mail->Password   = $_ENV['SMTP_PASSWORD'];
//         $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
//         $mail->Port       = $_ENV['SMTP_PORT'];

//         // Recipients
//         $mail->setFrom($_ENV['SMTP_FROM_ADDRESS'], $_ENV['SMTP_FROM_NAME']);
//         $mail->addAddress($toUserEmail);                                  // Add a recipient


//         // Add a recipient
//         // $mail->addAddress($toUserEmail, 'User Name'); // Replace with actual user name

//         // Email content
//         $mail->isHTML(true);
//         $mail->Subject = 'Grooming Service Booking Confirmation';
//         $mail->Body = "
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <style>
//                 body {
//                     font-family: Arial, sans-serif;
//                     color: #333;
//                     background-color: #f4f4f4;
//                     margin: 0;
//                     padding: 0;
//                 }
//                 .container {
//                     max-width: 600px;
//                     margin: 0 auto;
//                     padding: 20px;
//                     background-color: #fff;
//                     border-radius: 5px;
//                 }
//                 .header h1 {
//                     margin: 0;
//                     color: #4a90e2;
//                 }
//                 .content {
//                     padding: 20px;
//                 }
//                 .footer {
//                     text-align: center;
//                     padding: 10px;
//                     border-top: 2px solid #e4e4e4;
//                     font-size: 14px;
//                     color: #888;
//                 }
//                 .button {
//                     display: inline-block;
//                     padding: 10px 20px;
//                     margin-top: 20px;
//                     background-color: #4a90e2;
//                     color: #fff;
//                     text-decoration: none;
//                     border-radius: 5px;
//                 }
//                 .button:hover {
//                     background-color: #357abd;
//                 }
//             </style>
//         </head>
//         <body>
//             <div class='container'>
//                 <div class='header'>
//                     <h1>Grooming Service Booking Confirmation</h1>
//                 </div>
//                 <div class='content'>
//                     <p>Dear User,</p>
//                     <p>Your booking with <strong>{$doctorName}</strong> has been confirmed.</p>
//                     <p>Thank you for choosing us!</p>
//                     <a href='#' class='button'>View Your Booking</a>
//                 </div>
//                 <div class='footer'>
//                     <p>&copy; 2024 Furry Friends. All rights reserved.</p>
//                 </div>
//             </div>
//         </body>
//         </html>
//         ";

//         $mail->AltBody = "Dear User,\n\nYour booking with {$doctorName} has been confirmed.\n\nThank you for choosing us!\n\nFor more details, please visit our website.";

//         // Send the email
//         $mail->send();

//         echo json_encode(['message' => "Email sent successfully."]);
//     } catch (Exception $e) {
//         echo json_encode(['message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}", 'trace' => $e->getTraceAsString()]);
//     }
// }




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


require '../config/config.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

require '../vendor/autoload.php';

// Load environment variables from .env file
$dotenv = Dotenv::createImmutable(__DIR__ . '/../..');
$dotenv->load();

// User authentication
$user_id = authenticate();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if all required fields are filled
    if (empty($_POST['name']) || empty($_POST['contact']) || empty($_POST['email']) 
    || empty($_POST['petType']) || empty($_POST['petGender']) || empty($_POST['petAge']) 
    || empty($_POST['selectdoctorname']) || empty($_POST['doctorAddress']) || empty($_FILES['petimage'])
    || empty($_POST['city']) || empty($_POST['needForPet'])) {
        echo json_encode(array("message" => "Please fill all the fields and upload an image."));
        die();
    }

    // Extract and sanitize data
    $username = htmlspecialchars(strip_tags($_POST['name']));
    $userContact = filter_var($_POST['contact'], FILTER_SANITIZE_NUMBER_INT);
    $userContact = filter_var($userContact, FILTER_VALIDATE_INT);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $email = filter_var($email, FILTER_VALIDATE_EMAIL);
    $petType = htmlspecialchars(strip_tags($_POST['petType']));
    $petGender = htmlspecialchars(strip_tags($_POST['petGender']));
    $petAge = filter_var($_POST['petAge'], FILTER_VALIDATE_INT, ["options" => ["min_range" => 0]]);
    $city = htmlspecialchars(strip_tags($_POST['city']));
    $needForYou = htmlspecialchars(strip_tags($_POST['needForPet']));
    $doctorName = htmlspecialchars(strip_tags($_POST['selectdoctorname']));
    $doctorAddress = htmlspecialchars(strip_tags($_POST['doctorAddress']));

    // Retrieve doctor_id based on doctor_name
    $doctorQuery = "SELECT id, email FROM vetneries WHERE name = :doctorName";
    $stmt = $conn->prepare($doctorQuery);
    $stmt->bindParam(':doctorName', $doctorName);
    $stmt->execute();
    $doctor = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($doctor) {
        $doctorID = $doctor['id'];
        $doctorEmail = $doctor['email'];
    } else {
        echo json_encode(array("message" => "Invalid doctor name."));
        die();
    }

    // Image handling
    $imagePath = null;

    if (isset($_FILES['petimage']) && $_FILES['petimage']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['petimage']['tmp_name'];
        $fileName = basename($_FILES['petimage']['name']);
        $uploadFileDir = '../docterprofile/groomingpetspic/';
        $dest_path = $uploadFileDir . $fileName;

        // Validate image type
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!in_array($_FILES['petimage']['type'], $allowedTypes)) {
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

    // Prepare SQL query
    $query = "INSERT INTO pet_grooming_users (name, phone, email, pet_type, pet_gender, pet_age, city, what_you_need_for_your_pet, user_id, doctor_id, doctor_address, pet_img) 
              VALUES (:username, :userContact, :email, :petType, :petGender, :petAge, :city, :needForYou, :user_id, :doctorID, :doctorAddress, :imagePath)";

    $stmt = $conn->prepare($query);

    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':userContact', $userContact);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':petType', $petType);
    $stmt->bindParam(':petGender', $petGender);
    $stmt->bindParam(':petAge', $petAge);
    $stmt->bindParam(':city', $city);
    $stmt->bindParam(':needForYou', $needForYou);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':doctorID', $doctorID);
    $stmt->bindParam(':doctorAddress', $doctorAddress);
    $stmt->bindParam(':imagePath', $imagePath);

    try {
        if ($stmt->execute()) {
            echo json_encode(array("message" => "User registered successfully."));
            // Send email to the user
            emailSendFun($email, $doctorName, $doctorEmail);
        } else {
            echo json_encode(array("message" => "Unable to register user."));
        }
    } catch (PDOException $e) {
        echo json_encode(array("message" => "Error: " . $e->getMessage()));
    }
}

// email sending.......
function emailSendFun($toUserEmail, $doctorName, $doctorEmail,$username) {
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
        $mail->addAddress("$doctorEmail","$username");



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
                    <h1>Grooming Service Booking Confirmation</h1>
                </div>
                <div class='content'>
                    <p>Dear User,</p>
                    <p>Your booking with <strong>{$doctorName}</strong> has been confirmed.</p>
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

        $mail->AltBody = "Dear User,\n\nYour booking with {$doctorName} has been confirmed.\n\nThank you for choosing us!\n\nFor more details, please visit our website.";

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
