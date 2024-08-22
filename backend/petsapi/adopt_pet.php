<?php
include_once '../config/database.php';
require '../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

parse_str(file_get_contents("php://input"), $data);

$pet_id = filter_var($data['id'], FILTER_SANITIZE_NUMBER_INT);
$user_id = filter_var($data['user_id'], FILTER_SANITIZE_NUMBER_INT);
$address = isset($data['address']) ? filter_var($data['address'], FILTER_SANITIZE_STRING) : null;
$city = isset($data['city']) ? filter_var($data['city'], FILTER_SANITIZE_STRING) : null;
$state = isset($data['state']) ? filter_var($data['state'], FILTER_SANITIZE_STRING) : null;
$status = isset($data['status']) ? filter_var($data['status'], FILTER_SANITIZE_STRING) : 'pending';

if (empty($pet_id) || empty($user_id)) {
    echo json_encode(['success' => false, 'message' => 'Pet ID or user ID is missing.']);
    exit();
}

try {
    $conn->beginTransaction();

    // Insert adoption event
    $query = "INSERT INTO adoption_events (pet_id, user_id, adoption_time" . 
            ($address ? ", address" : "") . 
            ($city ? ", city" : "") . 
            ($state ? ", state" : "") . 
            ", status) VALUES (:pet_id, :user_id, NOW()" . 
            ($address ? ", :address" : "") . 
            ($city ? ", :city" : "") . 
            ($state ? ", :state" : "") . 
            ", :status)";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':pet_id', $pet_id, PDO::PARAM_INT);
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    if ($address) $stmt->bindParam(':address', $address, PDO::PARAM_STR);
    if ($city) $stmt->bindParam(':city', $city, PDO::PARAM_STR);
    if ($state) $stmt->bindParam(':state', $state, PDO::PARAM_STR);
    $stmt->bindParam(':status', $status, PDO::PARAM_STR);
    if (!$stmt->execute()) {
        throw new Exception('Failed to insert adoption event.');
    }

    // Fetch pet and user details
    $queryPet = "SELECT * FROM pets WHERE id = :pet_id";
    $stmtPet = $conn->prepare($queryPet);
    $stmtPet->bindParam(':pet_id', $pet_id, PDO::PARAM_INT);
    $stmtPet->execute();
    $pet = $stmtPet->fetch(PDO::FETCH_ASSOC);

    $queryUser = "SELECT * FROM users WHERE id = :user_id";
    $stmtUser = $conn->prepare($queryUser);
    $stmtUser->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $stmtUser->execute();
    $user = $stmtUser->fetch(PDO::FETCH_ASSOC);

    $header = file_get_contents('../mailtemplate/header.html');
    $footer = file_get_contents('../mailtemplate/footer.html');

    if (!$pet || !$user) {
        throw new Exception('Failed to fetch pet or user details.');
    }

    // Prepare email content
    $petName = htmlspecialchars($pet['pet_name']);
    $message = "
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: inter, sans-serif; background-color: #f9f9f9; }
            .container { padding: 24px; }
            // .header { padding: 16px; background-color: #4a90e2; color: white; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 24px; background-color: white; border-radius: 0 0 8px 8px; }
        </style>
    </head>
    <body>
        {$header}
        <div class='container'>
            <div class='header'>
                <h1>Pet Adoption Request</h1>
            </div>
            <div class='content'>
                <p>Dear {$user['username']},</p>
                <p>Your adoption request for <strong>{$petName}</strong> has been successfully processed.</p>
                <p>Pet Details:</p>
                <ul>
                    <li>Name: " . htmlspecialchars($pet['pet_name']) . "</li>
                    <li>Breed: " . htmlspecialchars($pet['breeds']) . "</li>
                    <li>Age: " . htmlspecialchars($pet['age']) . "</li>
                </ul>
                <p>Thank you for using our service!</p>
            </div>
        </div>
        {$footer}
    </body>
    </html>";

    // Send email
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; 
        $mail->SMTPAuth = true;
        $mail->Username = 'furryfriens123@gmail.com'; 
        $mail->Password = 'rtcgadrtpxgbepdd'; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587; 

        $mail->setFrom('furryfriens123@gmail.com', 'Furry Friends');
        $mail->addAddress($user['email']);

        $mail->isHTML(true);
        $mail->Subject = 'Pet Adoption Confirmation';            
        $mail->Body    = $message;
        
        $mail->send();
        echo json_encode(["success" => true, "message" => "Pet data inserted and email sent successfully"]);
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Pet data inserted, but could not send email. Mailer Error: {$mail->ErrorInfo}"]);
    }

    $conn->commit();
} catch (Exception $e) {
    $conn->rollBack();
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
