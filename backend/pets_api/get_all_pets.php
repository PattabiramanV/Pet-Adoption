<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include '../config/database.php';

try {
    $stmt = $conn->prepare("SELECT id, pet_name, gender, pet_category, age, breeds, price, state, city, description, size, color, photo FROM pets");
    $stmt->execute();
    $pets = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($pets as &$pet) {
        $pet['photo'] = base64_encode($pet['photo']);
    }

    echo json_encode($pets);
} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["message" => "Database error: " . $e->getMessage()]);
}
?>
