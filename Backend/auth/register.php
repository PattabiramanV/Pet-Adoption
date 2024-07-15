<?php
// register.php
require '../config/config.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Handle preflight requests
    http_response_code(204); // No Content
    exit;
}

$data = json_decode(file_get_contents("php://input"));

if ($data) {
    $username = htmlspecialchars(strip_tags($data->username));
    $email = htmlspecialchars(strip_tags($data->email));
    $password = password_hash($data->password, PASSWORD_BCRYPT);

    try {
        // Check if email already exists
        $emailCheckQuery = "SELECT COUNT(*) FROM users WHERE email = :email";
        $emailCheckStmt = $conn->prepare($emailCheckQuery);
        $emailCheckStmt->bindParam(':email', $email);
        $emailCheckStmt->execute();
        $emailCount = $emailCheckStmt->fetchColumn();

        if ($emailCount > 0) {
            echo json_encode(array("message" => "Email already registered."));
            http_response_code(400); // Bad Request
            exit;
        }

        // Insert new user
        $query = "INSERT INTO users (username, email, password) VALUES (:username, :email, :password)";
        $stmt = $conn->prepare($query);

        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);

        if ($stmt->execute()) {
            echo json_encode(array("message" => "User registered successfully."));
            http_response_code(201); // Created
        } else {
            echo json_encode(array("message" => "Unable to register user."));
            http_response_code(500); // Internal Server Error
        }
    } catch (PDOException $e) {
        echo json_encode(array("message" => "Database error: " . $e->getMessage()));
        http_response_code(500); // Internal Server Error
    }
} else {
    echo json_encode(array("message" => "Invalid input."));
    http_response_code(400); // Bad Request
}
?>
