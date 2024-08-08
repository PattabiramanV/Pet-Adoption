<?php
header('Content-Type: application/json');
require '../config/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $pet_id = $data['id'] ?? null;

    if ($pet_id) {
        $query = "UPDATE pet_losting_details SET status = 'active' WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('i', $pet_id);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to activate pet']);
        }

        $stmt->close();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Pet ID not provided']);
    }
}
?>
