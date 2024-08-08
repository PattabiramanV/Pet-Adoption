<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Database connection
require("../config/config.php");

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    echo "poomika";
    // header('HTTP/1.1 204 No Content');
    exit;
}
// Check the request method
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Get the input data
    $data = json_decode(file_get_contents("php://input"), true);
print_r($data);
    // Log the received data for debugging
    error_log(print_r($data, true));

    // Proceed with your logic, e.g., updating the database
    // Convert and format the lost_date
    if (isset($data['lost_date'])) {
        $date = new DateTime($data['lost_date']);
        $data['lost_date'] = $date->format('Y-m-d H:i:s'); // Format for MySQL
    }

    $sql = "UPDATE pet_losting_details SET 
                name = :name, 
                pet_type = :pet_type, 
                age = :age, 
                gender = :gender, 
                contact_no = :contactNo, 
                lost_date = :lostDate, 
                address = :address, 
                location = :location, 
                description = :description,
                status=:Status
            WHERE id = :user_id"; // Corrected SQL

    $stmt = $conn->prepare($sql);
    
    // Bind parameters
    $stmt->bindParam(':name', $data['name']);
    $stmt->bindParam(':pet_type', $data['pet_type']);
    $stmt->bindParam(':age', $data['age']);
    $stmt->bindParam(':gender', $data['gender']);
    $stmt->bindParam(':contactNo', $data['contact_no']);
    $stmt->bindParam(':lostDate', $data['lost_date']);
    $stmt->bindParam(':address', $data['address']);
    $stmt->bindParam(':location', $data['location']);
    $stmt->bindParam(':description', $data['description']);
    $stmt->bindParam(':Status', $data['status']);

    
    $stmt->bindParam(':user_id', $data['user_id']); // Ensure this corresponds to your WHERE clause

    // Execute the statement
    if ($stmt->execute()) {
        $affectedRows = $stmt->rowCount();
        error_log("Affected Rows: " . $affectedRows);
        
        echo json_encode(["status" => "success", "message" => "Record updated successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to update record."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method. Use PUT."]);
}
