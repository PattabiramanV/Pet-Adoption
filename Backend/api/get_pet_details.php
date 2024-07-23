<?php
include '../config/database.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

try {
    // Check if the 'name' parameter is provided
    if (!isset($_GET['name']) || empty($_GET['name'])) {
        echo json_encode(["message" => "Pet name is required"]);
        exit();
    }

    // Prepare the SQL statement to fetch details for the specific pet
$stmt = $conn->prepare("SELECT pet_name, gender, pet_category, age, breeds,  price, state, city, description, photo, size ,color FROM pets WHERE pet_name = :pet_name");
    $stmt->bindParam(':pet_name', $_GET['name'], PDO::PARAM_STR);
    $stmt->execute();

    // Fetch the pet details
    $pet = $stmt->fetch(PDO::FETCH_ASSOC);

    // Check if pet was found
    if ($pet) {
        // Encode the photo data in base64
        $pet['photo'] = base64_encode($pet['photo']);
        echo json_encode($pet);
    } else {
        echo json_encode(["message" => "Pet not found"]);
    }
} catch (Exception $e) {
    echo json_encode(["message" => "Database Error: " . $e->getMessage()]);
}
?>
