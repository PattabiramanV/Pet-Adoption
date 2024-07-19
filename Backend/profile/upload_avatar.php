<?php
require '../config/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit;
}

// Authenticate user and get user ID
$user_id = authenticate(); 

if (!$user_id) {
    echo json_encode(["message" => "User not authenticated."]);
    http_response_code(401); // Unauthorized
    exit;
}

$data = json_decode(file_get_contents("php://input"));

// Handle image upload
if (isset($_FILES['avatar'])) {
    $file = $_FILES['avatar'];
    $upload_dir = '../uploads/'; // Directory to save the uploaded images
    $file_path = $upload_dir . basename($file['name']);

    // Ensure the upload directory exists
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0755, true);
    }

    // Move the uploaded file to the server
    if (move_uploaded_file($file['tmp_name'], $file_path)) {
        $avatar_url = 'http://localhost/Pet-Adoption/Backend/uploads/' . basename($file['name']);
    } else {
        echo json_encode(["message" => "Failed to upload image."]);
        http_response_code(500); // Internal Server Error
        exit;
    }
} else {
    $avatar_url = null;
}

if ($data) {
    $username = htmlspecialchars(strip_tags($data->username));
    $email = htmlspecialchars(strip_tags($data->email));
    $phone = htmlspecialchars(strip_tags($data->phone));
    $gender = htmlspecialchars(strip_tags($data->gender));
    $state = htmlspecialchars(strip_tags($data->state));
    $city = htmlspecialchars(strip_tags($data->city));

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["message" => "Invalid email format."]);
        http_response_code(400); // Bad Request
        exit;
    }

    // Validate gender
    $valid_genders = ['Male', 'Female', 'Other'];
    if (!in_array($gender, $valid_genders)) {
        echo json_encode(["message" => "Invalid gender value."]);
        http_response_code(400); // Bad Request
        exit;
    }

    try {
        $query = "UPDATE users SET username = :username, email = :email, phone = :phone, gender = :gender, state = :state, city = :city, avatar = :avatar WHERE id = :user_id";
        $stmt = $conn->prepare($query);

        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':phone', $phone);
        $stmt->bindParam(':gender', $gender);
        $stmt->bindParam(':state', $state);
        $stmt->bindParam(':city', $city);
        $stmt->bindParam(':avatar', $avatar_url);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Profile updated successfully."]);
            http_response_code(200); // OK
        } else {
            $errorInfo = $stmt->errorInfo();
            echo json_encode(["message" => "Unable to update profile. Error: " . $errorInfo[2]]);
            http_response_code(500); // Internal Server Error
        }
    } catch (PDOException $e) {
        echo json_encode(["message" => "Database error: " . $e->getMessage()]);
        http_response_code(500); // Internal Server Error
    }
} else {
    echo json_encode(["message" => "Invalid input."]);
    http_response_code(400); // Bad Request
}
?>
