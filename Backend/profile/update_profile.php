<?php
require '../config/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit;
}

$user_id = authenticate(); 

if (!$user_id) {
    echo json_encode(["message" => "User not authenticated."]);
    http_response_code(401); // Unauthorized
    exit;
}

$data = json_decode(file_get_contents("php://input"));

if ($data) {
    $username = htmlspecialchars(strip_tags($data->username));
    $email = htmlspecialchars(strip_tags($data->email));
    $phone = htmlspecialchars(strip_tags($data->phone));
    $gender = htmlspecialchars(strip_tags($data->gender));
    $state = htmlspecialchars(strip_tags($data->state));
    $city = htmlspecialchars(strip_tags($data->city));

    // Validate gender
    $valid_genders = ['Male', 'Female', 'Other'];
    if (!in_array($gender, $valid_genders)) {
        echo json_encode(["message" => "Invalid gender value."]);
        http_response_code(400); // Bad Request
        exit;
    }

    try {
        $query = "UPDATE users SET username = :username, email = :email, phone = :phone, gender = :gender, state = :state, city = :city WHERE id = :user_id";
        $stmt = $conn->prepare($query);

        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':phone', $phone);
        $stmt->bindParam(':gender', $gender);
        $stmt->bindParam(':state', $state);
        $stmt->bindParam(':city', $city);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Profile updated successfully."]);
            http_response_code(200); // OK
        } else {
            $errorInfo = $stmt->errorInfo();
            echo json_encode(["message" => "Unable to update profile. Error: " . $errorInfo[2]]);
            http_response_code(500); // Internal Server Error
        }
    } catch (PDOException $e) {
        echo json_encode(["message" => "Database error: " . $e->getMessage()]);
        http_response_code(500); // Internal Server Error
    }
} else {
    echo json_encode(["message" => "Invalid input."]);
    http_response_code(400); // Bad Request
}
?>
