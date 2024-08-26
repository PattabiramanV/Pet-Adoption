<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

if (!isset($_GET['id'])) {
    echo json_encode(['error' => 'No user ID provided']);
    exit();
}

$user_id = intval($_GET['id']);

$sql = "SELECT id, name as name, gender, size, age, breeds as breed, user_id, photo, description, status 
        FROM pets 
        WHERE user_id = :user_id";
        
$stmt = $conn->prepare($sql);
$stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);

try {
    $stmt->execute();
    $pets = $stmt->fetchAll(PDO::FETCH_ASSOC);
  
    echo json_encode($pets);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Query failed: ' . $e->getMessage()]);
}
?>

