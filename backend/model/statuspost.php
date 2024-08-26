<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // For development, replace * with the specific origin for production
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require '../config/config.php'; // Adjust the path to your config file

// Database connection
$host = 'localhost';
$db_name = 'pet_adoption';
$username = 'dckap';
$password = 'Dckap2023Ubuntu';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Connection error: " . $e->getMessage();
    die();
}

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method');
    }

    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    error_log("Raw input: " . $input);

    if (!isset($data['pet_id']) || !isset($data['status'])) {
        error_log("Invalid input received. Data: " . json_encode($data));
        throw new Exception('Invalid input');
    }

    $petId = $data['pet_id'];
    $status = $data['status'];

    error_log("Received pet_id: $petId, status: $status");

    if (!is_numeric($petId) || !is_string($status)) {
        error_log("Invalid data types. pet_id: " . gettype($petId) . ", status: " . gettype($status));
        throw new Exception('Invalid data types');
    }

    $sql = "UPDATE pet_losting_details SET status = ? WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    if ($stmt->execute([$status, $petId])) {
        echo json_encode(['success' => true]);
    } else {
        throw new Exception('Failed to update status');
    }
} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}

?>
