<?php
require '../config/config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$user_id = authenticate(); // Retrieve the authenticated user ID

if ($user_id === null) {
    http_response_code(401);
    echo json_encode(["message" => "Unauthorized"]);
    exit;
}

$query = "SELECT * FROM pet_losting_details WHERE user_id = :user_id";
$stmt = $conn->prepare($query);
$stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);

try {
    $stmt->execute();
    $pets = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Encode the photo data in base64 if it's not null
    foreach ($pets as &$pet) {
        if (!empty($pet['photo'])) {
            $pet['photo'] = base64_encode($pet['photo']);
        } else {
            $pet['photo'] = null; // Ensure null if no photo
        }
    }

    echo json_encode($pets);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => "Database Error: " . $e->getMessage()]);
}
?>
