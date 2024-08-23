<?php
require '../config/database.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

try {
    $stmt = $conn->prepare("
        SELECT
            a.id AS request_id,
            a.pet_id,
            a.user_id,
            a.address,
            a.status,
            p.name AS name,
            u.username AS user_name,  
            a.adoption_time
        FROM adoption_events a
        JOIN pets p ON a.pet_id = p.id
        JOIN users u ON a.user_id = u.id
        WHERE a.status = 'pending'
    ");
    $stmt->execute();
    
    
    $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($requests);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
