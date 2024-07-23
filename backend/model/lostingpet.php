<?php


require '../config/config.php';

error_reporting(E_ALL);
ini_set('display_errors', '1');
header("Access-Control-Allow-Origin: *"); // Allow from any origin
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Allowed methods
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
    $name = $data->name;
    $petType = $data->petType;
    $age = $data->age;
    $gender = $data->gender;
    $contactNo = $data->contactNo;
    $lostDate = $data->lostDate;
    $photo = $data->photo; // assuming this is base64 encoded
    $address = $data->address;
    $description = $data->description;

    // Decode the photo from base64
    $photoData = base64_decode($photo);

    try {
        

        // Prepare the SQL statement with the correct column names
        $stmt = $conn->prepare("INSERT INTO pet_losting_details (user_id, name, pet_type, age, gender, contact_no, lost_date, photo, address, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bindParam(1, $user_id);
        $stmt->bindParam(2, $name);
        $stmt->bindParam(3, $petType);
        $stmt->bindParam(4, $age);
        $stmt->bindParam(5, $gender);
        $stmt->bindParam(6, $contactNo);
        $stmt->bindParam(7, $lostDate);
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
