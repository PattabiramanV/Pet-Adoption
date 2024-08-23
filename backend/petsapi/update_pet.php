<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, PUT');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
require '../config/database.php';
error_reporting(E_ALL);
ini_set('display_errors', '1');

parse_str(file_get_contents('php://input'), $put_vars);
file_put_contents('debug.log', "Received data: " . print_r($put_vars, true), FILE_APPEND);

$petId = isset($put_vars['id']) ? intval($put_vars['id']) : null;
$name = isset($put_vars['name']) ? $put_vars['name'] : '';
$breed = isset($put_vars['breed']) ? $put_vars['breed'] : '';
$age = isset($put_vars['age']) ? intval($put_vars['age']) : null;
$size = isset($put_vars['size']) ? $put_vars['size'] : '';
$description = isset($put_vars['description']) ? $put_vars['description'] : '';

if ($petId !== null && $name !== '' && $breed !== '' && $age !== null && $size !== '' && $description !== '' ) {
    try {
        $query = "UPDATE pets SET name = :name, breeds = :breed, age = :age, size = :size, description = :description WHERE id = :id";
        $stmt = $conn->prepare($query);

        $stmt->bindParam(':id', $petId, PDO::PARAM_INT);
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':breed', $breed, PDO::PARAM_STR);
        $stmt->bindParam(':age', $age, PDO::PARAM_INT);
        $stmt->bindParam(':size', $size, PDO::PARAM_STR);
        $stmt->bindParam(':description', $description, PDO::PARAM_STR);

        $stmt->execute();
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        file_put_contents('debug.log', "SQL Error: " . $e->getMessage(), FILE_APPEND);
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
} else {
    file_put_contents('debug.log', "Error: Missing or invalid input data", FILE_APPEND);
    echo json_encode(['success' => false, 'error' => 'Invalid input data']);
}
