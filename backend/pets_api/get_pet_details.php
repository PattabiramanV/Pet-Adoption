<?php
include '../config/database.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$id = isset($_GET['id']) ? $_GET['id'] : die(json_encode(["message" => "Pet ID not provided."]));

try {
    $stmt = $conn->prepare("SELECT id, pet_name, gender, pet_category, age, breeds, price, state, city, description, size, color, photo ,user_id FROM pets WHERE id = :id AND status = 'available' ");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    $pet = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($pet) {
        // Encode the photo data in base64
        $pet['photo'] = base64_encode($pet['photo']);
        echo json_encode($pet);
    } else {
        echo json_encode(["message" => "Pet not found."]);
    }
} catch (Exception $e) {
    echo json_encode(["message" => "Database Error: " . $e->getMessage()]);
}
?>
