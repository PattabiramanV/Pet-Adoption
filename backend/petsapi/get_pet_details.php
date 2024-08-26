<?php
include '../config/database.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$id = isset($_GET['id']) ? $_GET['id'] : die(json_encode(["message" => "Pet ID not provided."]));

try {

    $stmt = $conn->prepare("SELECT id, name, gender, pet_category, age, breeds, price, state, city, description, size, color, photo, user_id , status FROM pets WHERE id = :id AND status = 'available'");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    $pet = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($pet) {
        
        $stmt_similar = $conn->prepare("SELECT id, name, pet_category, price, city, state, photo, gender, size, age, breeds, description FROM pets WHERE pet_category = :category AND id != :id AND status = 'available' LIMIT 10");
        $stmt_similar->bindParam(':category', $pet['pet_category']);
        $stmt_similar->bindParam(':id', $id);
        $stmt_similar->execute();
        $similar_pets = $stmt_similar->fetchAll(PDO::FETCH_ASSOC);

       
        echo json_encode([
            'pet' => $pet,
            'similar_pets' => $similar_pets
        ]);
    } else {
        echo json_encode(["message" => "Pet not found."]);
    }
} catch (Exception $e) {
    echo json_encode(["message" => "Database Error: " . $e->getMessage()]);
}
?>
