<?php
include '../config/database.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$id = isset($_GET['id']) ? $_GET['id'] : die(json_encode(["message" => "Pet ID not provided."]));

try {

    // Prepare and execute the query to fetch pet details
    $stmt = $conn->prepare("SELECT id, name, gender, pet_category, age, breeds, price, state, city, description, size, color, photo, user_id FROM pets WHERE id = :id AND status = 'available'");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    $pet = $stmt->fetch(PDO::FETCH_ASSOC);
//  print_r($pet);
// exit;
    if ($pet) {
        // Check if the photo filename exists and encode the image
        // if (!empty($pet['photo'])) {
        //     $photoPath = '/backend/petsapi/hostelimg/' . $pet['photo']; // Adjust the path as needed
        //     if (file_exists($photoPath)) {
        //         $pet['photo'] = 'data:image/jpeg;base64,' . base64_encode(file_get_contents($photoPath));
        //     } else {
        //         $pet['photo'] = ''; // or a default placeholder image
        //     }
        // }

        // Prepare and execute the query to fetch similar pets
        $stmt_similar = $conn->prepare("SELECT id, name, pet_category, price, city, state, photo, gender, size, age, breeds, description FROM pets WHERE pet_category = :category AND id != :id AND status = 'available' LIMIT 10");
        $stmt_similar->bindParam(':category', $pet['pet_category']);
        $stmt_similar->bindParam(':id', $id);
        $stmt_similar->execute();
        $similar_pets = $stmt_similar->fetchAll(PDO::FETCH_ASSOC);

        // foreach ($similar_pets as &$similar_pet) {
        //     if (!empty($similar_pet['photo'])) {
        //         $photoPath = '/backend/petsapi/hostelimg/' . $similar_pet['photo']; 
        //         if (file_exists($photoPath)) {
        //             $similar_pet['photo'] = 'data:image/jpeg;base64,' . base64_encode(file_get_contents($photoPath));
        //         } else {
        //             $similar_pet['photo'] = ''; // or a default placeholder image
        //         }
        //     }
        // }

        // Return the pet details and similar pets as JSON
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
