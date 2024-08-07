<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';


// Check if 'id' parameter is set
if (!isset($_GET['id'])) {
    echo json_encode(['error' => 'No pet ID provided']);
    exit();
}

$pet_id = intval($_GET['id']);

$sqlDeletePet = "DELETE FROM pets WHERE id = :id";
$sqlDeleteAdoption = "DELETE FROM adoption_events WHERE pet_id = :id";

$stmtDeletePet = $conn->prepare($sqlDeletePet);
$stmtDeletePet->bindParam(':id', $pet_id, PDO::PARAM_INT);

$stmtDeleteAdoption = $conn->prepare($sqlDeleteAdoption);
$stmtDeleteAdoption->bindParam(':id', $pet_id, PDO::PARAM_INT);

try {
    $stmtDeleteAdoption->execute();
    $stmtDeletePet->execute();

    echo json_encode(['success' => 'Pet and related adoption events deleted successfully']);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Delete failed: ' . $e->getMessage()]);
}
?>
