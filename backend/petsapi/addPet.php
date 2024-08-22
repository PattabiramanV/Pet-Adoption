<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

include '../config/database.php';
include '../config/config.php';

error_reporting(E_ALL);
ini_set('display_errors', '1');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$user_id = authenticate();

$photos = $_FILES['profilePic'] ?? null;

if ($photos) {
    $uploaded_files = handleFileUploads($photos, $user_id);
} else {
    echo json_encode(['success' => false, 'message' => 'No files provided.']);
    exit();
}
echo phpversion();

function handleFileUploads($photos, $user_id)
{
    $uploaded_files = [];
    $upload_directory = "./hostelimg/";

    if (!is_dir($upload_directory)) {
        mkdir($upload_directory, 0755, true);
    }

    foreach ($photos['name'] as $key => $value) {
        $file_name = basename($value);
        $tmp_name = $photos['tmp_name'][$key];

        if ($photos['error'][$key] === UPLOAD_ERR_OK) {
            $file_path = $upload_directory . $file_name;

            if (move_uploaded_file($tmp_name, $file_path)) {
                $uploaded_files[] = $file_name;
            } else {
                $errors['photos'][] = "Failed to upload file: $file_name";
            }
        } else {
            $errors['photos'][] = "Error occurred during file upload: $file_name";
        }
    }

    return $uploaded_files;
}

if ($_POST) {
    $data = json_decode(json_encode($_POST));

    $petname = $data->petName ?? '';
    $petcategory = $data->petcategory ?? '';
    $city = $data->city ?? '';
    $location = $data->location ?? '';
    $petDescription = $data->petDescription ?? '';
    $breed = $data->breed ?? '';
    $gender = $data->gender ?? '';
    $age = $data->age ?? '';
    $size = $data->size ?? '';
    $price = $data->price ?? '';
    $color = $data->color ?? '';
    $address = $data->address ?? '';
    $photo =  json_encode($uploaded_files);
    $add_for = 'Sale';
    $status = 'available';
// print_r($photo);
// exit;
    try {
        $stmt = $conn->prepare("INSERT INTO pets (pet_name, gender, pet_category, age, breeds, price, state, city, description, add_for, user_id, size, color, photo, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

        $stmt->bindParam(1, $petname);
        $stmt->bindParam(2, $gender);
        $stmt->bindParam(3, $petcategory);
        $stmt->bindParam(4, $age);
        $stmt->bindParam(5, $breed);
        $stmt->bindParam(6, $price);
        $stmt->bindParam(7, $location);
        $stmt->bindParam(8, $city);
        $stmt->bindParam(9, $petDescription);
        $stmt->bindParam(10, $add_for);
        $stmt->bindParam(11, $user_id);
        $stmt->bindParam(12, $size);
        $stmt->bindParam(13, $color);
        $stmt->bindParam(14, $photo);
        $stmt->bindParam(15, $status);

        if ($stmt->execute()) {
            $userStmt = $conn->prepare("SELECT email, username FROM users WHERE id = ?");
            $userStmt->bindParam(1, $user_id);
            $userStmt->execute();
            $user = $userStmt->fetch(PDO::FETCH_ASSOC);

            $header = file_get_contents('../mailtemplate/header.html');
            $footer = file_get_contents('../mailtemplate/footer.html');
            
            $message = $header . "
            <div style='padding: 24px; font-family: Arial, sans-serif; background-color: #f9f9f9;'>
                <div style='padding: 16px; background-color: #4a90e2; color: white; text-align: center; border-radius: 8px 8px 0 0;'>
                    <h1 style='font-size: 24px; font-weight: bold;'>New Pet Added to Adoption List</h1>
                </div>
                <div style='padding: 24px; background-color: white; border-radius: 0 0 8px 8px;'>
                    <p>Dear {$user['username']},</p>
                    <p>Your pet <strong>{$petname}</strong> has been successfully added to the adoption list.</p>
                    <p>Thank you for using our service!</p>
                </div>
            </div>" . $footer;

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
                $mail->Subject = 'Pet Added Successfully';
                $mail->Body = $message;

                $mail->send();
                echo json_encode(["message" => "Pet data inserted and email sent successfully"]);
            } catch (Exception $e) {
                echo json_encode(["message" => "Pet data inserted, but could not send email. Mailer Error: {$mail->ErrorInfo}"]);
            }
        } else {
            echo json_encode(["message" => "Error: " . $stmt->errorInfo()[2]]);
        }
    } catch (Exception $e) {
        echo json_encode(["message" => "Database Error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["message" => "No data received"]);
}
