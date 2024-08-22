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
        $conn->beginTransaction();

        $update = $conn->prepare("
            UPDATE adoption_events
            SET status = 'accepted'
            WHERE id = :requestId
        ");
        $update->execute([':requestId' => $requestId]);

        $petId = $conn->prepare("
            SELECT pet_id FROM adoption_events WHERE id = :requestId
        ");
        $petId->execute([':requestId' => $requestId]);
        $petId = $petId->fetchColumn();

        $updateOtherRequests = $conn->prepare("
            UPDATE adoption_events
            SET status = 'rejected'
            WHERE pet_id = :petId
            AND id != :requestId
        ");
        $updateOtherRequests->execute([':petId' => $petId, ':requestId' => $requestId]);

        $updatePet = $conn->prepare("
            UPDATE pets
            SET status = 'adopted'
            WHERE id = :petId
        ");
        $updatePet->execute([':petId' => $petId]);

        $conn->commit();

        echo json_encode(['message' => 'Request accepted, pet status updated, and other users notified.']);
    } catch (PDOException $e) {
        $conn->rollBack();
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Invalid request.']);
}
?>
