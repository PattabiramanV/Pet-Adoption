<?php
include '../config/database.php'; // Ensure this file connects to your database
include '../config/config.php'; // Include any other configuration or authentication

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', '1');

// Set CORS headers to allow access from different origins
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Function to authenticate user (should be defined in config.php or another file)
$user_id = authenticate(); // Ensure this function returns a valid user ID

// Get and decode JSON input data
$data = json_decode(file_get_contents("php://input"));

if ($data) {
    // Extract form data from JSON
    $petname = $data->petName;
    $petcategory = $data->petcategory;
    $city = $data->city;
    $location = $data->location;
    $petDescription = $data->petDescription;
    $breed = $data->breed;
    $gender = $data->gender;
    $age = $data->age;
    $size = $data->size;
    $price = $data->price;
    $color = $data->color;
    $address = $data->address;
    $photo = $data->profilePic;
    $add_for = 'Sale'; // Set this to 'Adopt' or 'Sale' based on your use case

    // Decode the base64-encoded image
    $photoData = base64_decode($photo);

    try {
        // Prepare SQL query
        $stmt = $conn->prepare("INSERT INTO pets (pet_name, gender, pet_category, age, breeds, price, state, city, description, add_for, user_id, size, color, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        // Bind parameters
        $stmt->bindParam(1, $petname);
        $stmt->bindParam(2, $gender);
        $stmt->bindParam(3, $petcategory);
        $stmt->bindParam(4, $age);
        $stmt->bindParam(5, $breed);
        $stmt->bindParam(6, $price);
        $stmt->bindParam(7, $location);
        $stmt->bindParam(8, $city);
        $stmt->bindParam(9, $petDescription);
        $stmt->bindParam(10, $add_for);
        $stmt->bindParam(11, $user_id);
        $stmt->bindParam(12, $size);
        $stmt->bindParam(13, $color);
        $stmt->bindParam(14, $photoData, PDO::PARAM_LOB);

        // Execute the statement
        if ($stmt->execute()) {
            echo json_encode(["message" => "Pet data inserted successfully"]);
        } else {
            echo json_encode(["message" => "Error: " . $stmt->errorInfo()[2]]);
        }
    } catch (Exception $e) {
        echo json_encode(["message" => "Database Error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["message" => "No data received"]);
}
?>