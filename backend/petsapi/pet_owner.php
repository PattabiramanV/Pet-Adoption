<?php
// pet_owner.php

require '../config/config.php';

// Preflight request handling
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$user_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

$query = "SELECT username, email, phone, gender, state, city, avatar FROM users WHERE id = :user_id";
$stmt = $conn->prepare($query);
$stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
$stmt->execute();

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    if (!empty($user['avatar'])) {
        $user['avatar'] = 'http://localhost/petadoption/backend/profile/uploads/' . $user['avatar'];
    }
    echo json_encode($user);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "User not found."));
}
?>
