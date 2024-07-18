<?php
// update_user.php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require '../config/config.php';

// Preflight request handling
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$user_id = authenticate(); // Retrieve the authenticated user ID

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

// Ensure required fields are present
if (!isset($data['username']) || !isset($data['email'])) {
    http_response_code(400);
    echo json_encode(array("message" => "Missing required fields."));
    exit();
}

// Update user information
$query = "UPDATE users SET username = :username, email = :email, phone = :phone, gender = :gender, state = :state, city = :city WHERE id = :user_id";
$stmt = $conn->prepare($query);

// Bind parameters
$stmt->bindParam(':username', $data['username']);
$stmt->bindParam(':email', $data['email']);
$stmt->bindParam(':phone', $data['phone']);
$stmt->bindParam(':gender', $data['gender']);
$stmt->bindParam(':state', $data['state']);
$stmt->bindParam(':city', $data['city']);
$stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);

// Execute query
if ($stmt->execute()) {
    // Return updated user data
    $updated_user = array(
        "username" => $data['username'],
        "email" => $data['email'],
        "phone" => $data['phone'],
        "gender" => $data['gender'],
        "state" => $data['state'],
        "city" => $data['city']
    );
    echo json_encode($updated_user);
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to update user."));
}
?>
