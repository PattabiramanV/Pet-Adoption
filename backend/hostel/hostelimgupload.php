<?php



require '../config/config.php';
// require '../model/dbconnect.php';
require "../api/hostelcrud.php";
// require "../api/hostel.php";
require '../vendor/autoload.php'; // Ensure this is correct based on your project's structure

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;  

// Load the .env file
$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();
$user_id = authenticate();
$hostel = new Hostel();

// Create a new instance of the Database class
$db = new Database();
echo json_encode($_POST);
// Initialize variables
$name = $_POST['name'] ?? '';
$contact = $_POST['contact'] ?? '';
$price_per_day = $_POST['price_per_day'] ?? '';
$available_time = $_POST['available_time'] ?? '';
$address = $_POST['address'] ?? '';
$description = $_POST['description'] ?? '';
$photos = $_FILES['photos'] ?? null;
// Validate form data
$errors = [];

if (empty($name)) {
    $errors['name'] = "Name is required";
}
if (empty($contact)) {
    $errors['contact'] = "Contact No is required";
}
if (empty($price_per_day)) {
    $errors['price_per_day'] = "Price per day is required";
}
if (empty($available_time)) {
    $errors['available_time'] = "Available time is required";
}
if (empty($address)) {
    $errors['address'] = "Address is required";
}
if (empty($description)) {
    $errors['description'] = "Description is required";
}
if (empty($photos) || !is_array($photos['name'])) {
    $errors['photos'] = "At least one photo is required";
}

if (!empty($errors)) {
    echo json_encode(['status' => 'error', 'errors' => $errors]);
    exit;
}

// Process file uploads
$uploaded_files = [];
$upload_directory = './hostelimg/'; // Make sure this directory exists and is writable

foreach ($photos['name'] as $key => $value) {
    if ($photos['error'][$key] === UPLOAD_ERR_OK) {
        $tmp_name = $photos['tmp_name'][$key];
        $file_name = basename($value);
        $file_path = $upload_directory . $file_name;

        if (move_uploaded_file($tmp_name, $file_path)) {
            $uploaded_files[] = $file_name;
        } else {
            $errors['photos'] = "Failed to upload some files";
        }
    } else {
        $errors['photos'] = "Error occurred during file upload";
    }
}

if (!empty($errors)) {
    echo json_encode(['status' => 'error', 'errors' => $errors]);
    exit;
}
echo json_encode($name);

// Insert into database (example)

try {
    $query = "INSERT INTO pet_hostels (name, contact, price_per_day, available_time, address, description, photos) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $db->conn->prepare($query);
    
    // Convert uploaded file names to a comma-separated string for storage
    $photos_list = implode(',', $uploaded_files);

    $stmt->execute([$name, $contact, $price_per_day, $available_time, $address, $description, $photos_list]);

    echo json_encode(['status' => 'success', 'message' => 'Data successfully inserted']);
    
    $sql = "UPDATE users SET user_type='hostel_user' WHERE id = ?;";
    $updateUserType = $db->conn->prepare($sql);
    $params = [$user_id]; // Correct parameter binding
    echo $updateUserType->execute($params);
    
    emailSendFun($name);

} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Failed to insert data', 'error' => $e->getMessage()]);
}













function emailSendFun($hostelName) {

    // print_r($data);
    global $hostel;
    global $user_id;
    $query = "SELECT * FROM users WHERE id = :id";
    $params = [':id' => $user_id];

    $userData = $hostel->getData($query, $params);
    // echo json_encode($userData);
   print_r($userData);
    // Email configurations
    $emailConfig = [
        'Host' => $_ENV['SMTP_HOST'],
        'SMTPAuth' => $_ENV['SMTP_AUTH'] === 'true',
        'Username' => $_ENV['SMTP_USERNAME'],
        'Password' => $_ENV['SMTP_PASSWORD'],
        'SMTPSecure' => PHPMailer::ENCRYPTION_STARTTLS,
        'Port' => $_ENV['SMTP_PORT'],
        'FromAddress' => $_ENV['SMTP_FROM_ADDRESS'],
        'FromName' => $_ENV['SMTP_FROM_NAME'],
    ];

    // Load email templates
    $header = file_get_contents('../mailtemplate/header.html');
    $footer = file_get_contents('../mailtemplate/footer.html');

  
    $bookingUserEmail = $userData[0]['email'];
    $bookingUsername = $userData[0]['username'];
    $bookingUserContact = $userData[0]['phone']; // assuming contact field exists

    // Recipients and their respective email bodies
    $recipients = [
        [
            'email' => $bookingUserEmail,
            'name' => $bookingUsername,
            'body' => $header ."
                <div style=\"padding: 20px; border-radius: 5px; max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;\">
                    <h1 style=\"color: #333; font-size: 24px; text-align: center;\">Hostel Added Confirmation</h1>
                    <p style=\"color: #555; font-size: 16px;\">Dear {$bookingUsername},</p>
                    <p style=\"color: #555; font-size: 16px;\">Your hostel <strong style=\"color: #000;\">{$hostelName}</strong> has been successfully added to our platform.</p>
                    <p style=\"color: #555; font-size: 16px;\">Thank you for partnering with us!</p>
                    <p style=\"color: #555; font-size: 16px;\">We look forward to providing excellent service together.</p>
                </div>". $footer,
            'altBody' => "Dear {$bookingUsername},\n\nYour hostel {$hostelName} has been successfully added to our platform.\n\nThank you for partnering with us!\n\nWe look forward to providing excellent service together."
        ]
        
    ];

    foreach ($recipients as $recipient) {
        $mail = new PHPMailer(true);

        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host = $emailConfig['Host'];
            $mail->SMTPAuth = $emailConfig['SMTPAuth'];
            $mail->Username = $emailConfig['Username'];
            $mail->Password = $emailConfig['Password'];
            $mail->SMTPSecure = $emailConfig['SMTPSecure'];
            $mail->Port = $emailConfig['Port'];

            // Recipients
            $mail->setFrom($emailConfig['FromAddress'], $emailConfig['FromName']);
            $mail->addAddress($recipient['email'], $recipient['name']);

            // Email content
            $mail->isHTML(true);
            $mail->Subject = 'Hostel added Confirmation';
            $mail->Body = $recipient['body'];
            $mail->AltBody = $recipient['altBody'];

            // Send the email
            $mail->send();
        } catch (Exception $e) {
            echo json_encode(['message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}", 'trace' => $e->getTraceAsString()]);
        }
    }
}


