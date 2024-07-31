<?php
// read_items.php

// header("Access-Control-Allow-Origin: http://localhost:5173");
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type, Authorization");

require '../config/config.php';

// Preflight request handling
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
    
$user_id = authenticate(); // Retrieve the authenticated user ID

$query = "SELECT username, email, phone, gender, state, city , avatar FROM users WHERE id = :user_id";
$stmt = $conn->prepare($query);
$stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
$stmt->execute();

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    // If the avatar field contains a relative path, prepend the base URL
    if (!empty($user['avatar'])) {
        $user['avatar'] = 'http://localhost/petadoption/backend/profile/uploads/' . $user['avatar']; // Adjust the base URL as needed
    }
    echo json_encode($user);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "User not found."));
}
?>
