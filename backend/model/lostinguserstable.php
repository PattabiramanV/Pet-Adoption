<?php
require '../config/config.php'; // DB connection
header('Content-Type: application/json');

header("Access-Control-Allow-Origin: *"); // Allow all origins
header("Access-Control-Allow-Headers: *"); // Allow all headers
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// $user_id = authenticate(); // Uncomment this line when implementing authentication
$user_id = authenticate(); // Retrieve the authenticated user ID

if ($user_id === null) {
    http_response_code(401);
    echo json_encode(["message" => "Unauthorized"]);
    exit();
}

$query = "SELECT * FROM pet_losting_details ";
$stmt = $conn->prepare($query);
// $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);

try {
    $stmt->execute();
    $pets = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // Encode the photo data in base64 if it's not null
    foreach ($pets as &$pet) {
        if (!empty($pet['photo'])) {
            $pet['photo'] = base64_encode($pet['photo']);
            $pet['currentUserId']=$user_id;

        } else {
            $pet['photo'] = null; // Ensure null if no photo
            $pet['currentUserId']=$user_id;
        }
    }
    

    // Return the result as JSON
    echo json_encode($pets);
} catch (Exception $e) {
    error_log("Database Error: " . $e->getMessage()); // Log the error
    http_response_code(500);
    echo json_encode(["message" => "Database Error: " . $e->getMessage()]);
}
