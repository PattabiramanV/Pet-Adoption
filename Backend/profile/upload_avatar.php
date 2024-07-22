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
    $upload_dir = './uploads/'; // Directory to save the uploaded images
    $file_path = $upload_dir . basename($file['name']);

    // Ensure the upload directory exists
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0755, true);
    }

    // Move the uploaded file to the server
    if (move_uploaded_file($file['tmp_name'], $file_path)) {
        // Prepare the SQL statement to update the user's avatar
        $stmt = $pdo->prepare("UPDATE users SET avatar = :avatar WHERE id = :id");
        $stmt->bindParam(':avatar', $file_path);
        $stmt->bindParam(':id', $user_id);
        
        if ($stmt->execute()) {
            echo json_encode(["message" => "Avatar uploaded and updated successfully."]);
            http_response_code(200); // OK
        } else {
            echo json_encode(["message" => "Failed to update avatar in the database."]);
            http_response_code(500); // Internal Server Error
        }
    } else {
        echo json_encode(["message" => "Failed to upload image."]);
        http_response_code(500); // Internal Server Error
    }
} else {
    echo json_encode(["message" => "No image file uploaded."]);
    http_response_code(400); // Bad Request
}
?>
