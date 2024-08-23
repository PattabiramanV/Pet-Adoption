<?php
require '../config/config.php';
header("Content-type:application/json");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

try {
    $stmt = $conn->prepare("SELECT id, user_id, name, pet_type, age, gender, contact_no, lost_date, photo, address, description, location ,status FROM pet_losting_details");
    $stmt->execute();
    $pets = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Encode the photo data in base64
    foreach ($pets as &$pet) {
        if ($pet['photo'] !== null) {
            $pet['photo'] = base64_encode($pet['photo']);
        }
    }

    echo json_encode($pets);
} catch (Exception $e) {
    echo json_encode(["message" => "Database Error: " . $e->getMessage()]);
}
?>
