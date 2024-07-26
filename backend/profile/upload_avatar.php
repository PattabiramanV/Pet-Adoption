<?php
require '../config/config.php'; // Ensure this path is correct

// Handle preflight requests (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    http_response_code(204); // No Content
    exit;
}

// Authenticate user and get user ID
$user_id = authenticate();

if (!$user_id) {
    header('Content-Type: application/json');
    echo json_encode(["message" => "User not authenticated."]);
    http_response_code(401); // Unauthorized
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['avatar']) && $_FILES['avatar']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['avatar'];
        $allowedTypes = ['image/jpeg', 'image/png'];
        
        // Validate file type
        if (!in_array($file['type'], $allowedTypes)) {
            header('Content-Type: application/json');
            echo json_encode(["message" => "Invalid file type. Only JPEG and PNG types are allowed."]);
            http_response_code(400); // Bad Request
            exit;
        }

        // Validate file size (max 2MB)
        if ($file['size'] > 2 * 1024 * 1024) {
            header('Content-Type: application/json');
            echo json_encode(["message" => "File size exceeds the limit of 2MB."]);
            http_response_code(400); // Bad Request
            exit;
        }

        $upload_dir = './uploads/';
        if (!is_dir($upload_dir)) {
            mkdir($upload_dir, 0755, true);
        }

        // Retrieve the current avatar filename from the database
        $stmt = $conn->prepare("SELECT avatar FROM users WHERE id = :id");
        $stmt->bindParam(':id', $user_id);
        $stmt->execute();
        $current_avatar = $stmt->fetchColumn();

        // Delete the current avatar file if it exists
        if ($current_avatar && file_exists($upload_dir . $current_avatar)) {
            unlink($upload_dir . $current_avatar);
        }

        // Use the user's ID as the filename
        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $file_name = $user_id . '.' . $extension;
        $file_path = $upload_dir . $file_name;

        if (move_uploaded_file($file['tmp_name'], $file_path)) {
            // Update the user's avatar in the database
            $stmt = $conn->prepare("UPDATE users SET avatar = :avatar WHERE id = :id");
            $stmt->bindParam(':avatar', $file_name);
            $stmt->bindParam(':id', $user_id);

            if ($stmt->execute()) {
                $full_url = "http://localhost/petadoption/backend/profile/" . $file_name; // Update with your domain
                header('Content-Type: application/json');
                echo json_encode(["message" => "Avatar uploaded and updated successfully.", "url" => $full_url]);
                http_response_code(200); // OK
            } else {
                header('Content-Type: application/json');
                echo json_encode(["message" => "Failed to update avatar in the database."]);
                http_response_code(500); // Internal Server Error
            }
        } else {
            header('Content-Type: application/json');
            echo json_encode(["message" => "Failed to move uploaded file."]);
            http_response_code(500); // Internal Server Error
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode(["message" => "No image file uploaded or upload error."]);
        http_response_code(400); // Bad Request
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(["message" => "Invalid request method."]);
    http_response_code(405); // Method Not Allowed
}
?>
