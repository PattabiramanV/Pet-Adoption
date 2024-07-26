<?php
require '../config/config.php';

// Set CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$data = json_decode(file_get_contents("php://input"));

if ($data && isset($data->email) && isset($data->otp) && isset($data->new_password)) {
    $email = htmlspecialchars(strip_tags($data->email));
    $otp = htmlspecialchars(strip_tags($data->otp));
    $newPassword = password_hash($data->new_password, PASSWORD_BCRYPT);

    try {
        $query = "SELECT id FROM users WHERE email = :email AND otp = :otp";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':otp', $otp);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            $userId = $user['id'];

            $updateQuery = "UPDATE users SET password = :password, otp = NULL WHERE id = :id";
            $updateStmt = $conn->prepare($updateQuery);
            $updateStmt->bindParam(':password', $newPassword);
            $updateStmt->bindParam(':id', $userId);
            $updateStmt->execute();

            echo json_encode(array("message" => "Password reset successfully."));
            http_response_code(200);
        } else {
            echo json_encode(array("message" => "Invalid OTP or email."));
            http_response_code(400);
        }
    } catch (PDOException $e) {
        echo json_encode(array("message" => "Database error: " . $e->getMessage()));
        http_response_code(500);
    }
} else {
    echo json_encode(array("message" => "Invalid input."));
    http_response_code(400);
}
?>
