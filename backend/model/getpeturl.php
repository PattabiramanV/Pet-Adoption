<?php
// getlostingpet.php

header("Content-Type: application/json");

include_once 'database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["message" => "Method not allowed"]);
    exit();
}

if (!isset($_GET['id'])) {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "Missing pet ID"]);
    exit();
}

$petId = intval($_GET['id']);

try {
    $query = "SELECT * FROM lost_pets WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $petId, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $pet = $stmt->fetch(PDO::FETCH_ASSOC);

        // Encode the photo as a base64 string, if not null
        if (!empty($pet['photo'])) {
            $pet['photo'] = base64_encode($pet['photo']);
        }

        echo json_encode($pet);
    } else {
        http_response_code(404); // Not Found
        echo json_encode(["message" => "Pet not found"]);
    }
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(["message" => "Error fetching pet details"]);
}
?>

