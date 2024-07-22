<?php
// read_items.php

require '../config/config.php';
// require './dbconnect.php';


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

try {
   

    // If you want to fetch items only for the authenticated user
    $query = "SELECT * FROM pet_losting_details WHERE user_id = :user_id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();

    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($items);
} catch (Exception $e) {
    echo json_encode(["message" => "Database Error: " . $e->getMessage()]);
}
?>
