<?php
include_once '../config/database.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

try {
    $userId = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;
    
    if ($userId > 0) {
        $query = "
            SELECT p.id, p.age, p.name, p.breeds, p.city, p.price, p.state, p.gender, p.photo, ae.adoption_time, ae.status
            FROM adoption_events ae
            JOIN pets p ON ae.pet_id = p.id
            WHERE ae.user_id = :user_id";
        
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
        $stmt->execute();
        
        $adoptedPets = $stmt->fetchAll(PDO::FETCH_ASSOC);


        echo json_encode(['success' => true, 'data' => $adoptedPets]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid user ID']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
