<?php
// login.php
require '../config/config.php';




if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Handle preflight requests
    http_response_code(204); // No Content
    exit;
}



$data = json_decode(file_get_contents("php://input"));

if ($data) {
    $email = htmlspecialchars(strip_tags($data->email));
    $password = htmlspecialchars(strip_tags($data->password));

    try {
        $query = "SELECT id, password FROM users WHERE email = :email";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row && password_verify($password, $row['password'])) {
            $jwt = generateJWT($row['id']);
   
            echo json_encode(array(
                "message" => "Login successful.",
                "jwt" => $jwt

            ));
            
            http_response_code(200); // login successful

        } else {
            echo json_encode(array("message" => "Unable to login user. Invalid credentials."));
            http_response_code(401); // Unauthorized
        }

    } catch (PDOException $e) {
        echo json_encode(array("message" => "Database error: " . $e->getMessage()));
        http_response_code(500); // Internal Server Error
    }
} else {
    echo json_encode(array("message" => "Invalid input."));
    http_response_code(400); // Bad Request
    exit;
}
?>
