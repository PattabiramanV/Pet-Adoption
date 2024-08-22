<?php
require '../config/database.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$data = json_decode(file_get_contents("php://input"));

if (isset($data->requestId)) {
    $requestId = $data->requestId;

    try {
        $stmt = $conn->prepare("
            UPDATE adoption_events
            SET status = 'rejected'
            WHERE id = :requestId
        ");
        $stmt->execute([':requestId' => $requestId]);

        echo json_encode(['message' => 'Request rejected successfully.']);
    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Invalid request.']);
}
?>
