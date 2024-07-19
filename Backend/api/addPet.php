<?php
include '../config/database.php';

error_reporting(E_ALL);
ini_set('display_errors', '1');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require '../config/config.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$user_id = authenticate();

$data = json_decode(file_get_contents("php://input"));

if ($data) {
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
    $add_for ='Sale';

    $photoData = base64_decode($photo);

    try {
        // $database = new database();
        // $db = $database->connect();

        $stmt = $conn->prepare("INSERT INTO pets (pet_name, gender, pet_category, age, breeds, price, state, city, description, photo, add_for, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bindParam(1, $petname);
        $stmt->bindParam(2, $gender);
        $stmt->bindParam(3, $petcategory);
        $stmt->bindParam(4, $age);
        $stmt->bindParam(5, $breed);
        $stmt->bindParam(6, $price);
        $stmt->bindParam(7, $location);
        $stmt->bindParam(8, $city);
        $stmt->bindParam(9, $petDescription);
        $stmt->bindParam(10, $photoData, PDO::PARAM_LOB);
        $stmt->bindParam(11, $add_for);
        $stmt->bindParam(12, $user_id);

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
