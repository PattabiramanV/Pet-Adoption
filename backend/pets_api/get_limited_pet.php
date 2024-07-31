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

// $limit = 3; 

try {
    $stmt = $conn->prepare("SELECT pet_name AS name, city, description, gender, breeds AS breed, age, size, photo AS profile FROM pets LIMIT 3");
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        $pets = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($pets);
    } else {
        echo json_encode([]);
    }

} catch (Exception $e) {
    echo json_encode(["error" => "Database Error: " . $e->getMessage()]);
}
?>
