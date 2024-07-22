<?php
require '../config/config.php';


error_reporting(E_ALL);
ini_set('display_errors', '1');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


// Preflight request handling
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$user_id = authenticate(); // Retrieve the authenticated user ID

// Get the POST data
$data = json_decode(file_get_contents("php://input"));

if ($data) {
    $petType = $data->petType;
    $breed = $data->breed;
    $age = $data->age;
    $gender = $data->gender;
    $contactNo = $data->contactNo;
    $dateFound = $data->dateFound;
    $photo = $data->photo; // assuming this is base64 encoded
    $address = $data->address;
    $description = $data->description;
    $photoData = base64_decode($photo);

    try {
       
        // Prepare the SQL statement with the correct column names
        $stmt = $conn->prepare("INSERT INTO found_pets_details (user_id, pet_type, breed, age, gender, contact_no, date_found, photo, address, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bindParam(1, $user_id);
        $stmt->bindParam(2, $petType);
        $stmt->bindParam(3, $breed);
        $stmt->bindParam(4, $age);
        $stmt->bindParam(5, $gender);
        $stmt->bindParam(6, $contactNo);
        $stmt->bindParam(7, $dateFound);
        $stmt->bindParam(8, $photoData, PDO::PARAM_LOB);
        $stmt->bindParam(9, $address);
        $stmt->bindParam(10, $description);

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
