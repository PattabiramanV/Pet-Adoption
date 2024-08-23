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

$user_id = authenticate(); // Retrieve the authenticated user ID
// $user_id = 2; // Retrieve the authenticated user ID


if ($user_id === null) {
    http_response_code(401);
    echo json_encode(["message" => "Unauthorized"]);
    exit();
}

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = 9; // Set limit for pagination
$offset = ($page - 1) * $limit; // Calculate offset

$query = "SELECT * FROM pet_losting_details WHERE user_id = :user_id LIMIT :limit OFFSET :offset";
$stmt = $conn->prepare($query);
$stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
$stmt->bindValue(':limit', $limit, PDO::PARAM_INT); // Use bindValue for LIMIT
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT); // Use bindValue for OFFSET

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

    // Fetch the total number of records for pagination
    $countQuery = "SELECT COUNT(*) as total FROM pet_losting_details WHERE user_id = :user_id";
    $countStmt = $conn->prepare($countQuery);
    $countStmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $countStmt->execute();
    $totalCount = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];

    echo json_encode([
        "pets" => $pets,
        "total" => $totalCount,
        "page" => $page,
        "limit" => $limit
    ]);
} catch (Exception $e) {
    error_log("Database Error: " . $e->getMessage()); // Log the error
    http_response_code(500);
    echo json_encode(["message" => "Database Error: " . $e->getMessage()]);
}
