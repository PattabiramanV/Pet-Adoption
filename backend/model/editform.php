<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require("../config/config.php");

// Check the request method
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Get the input data
    $data = json_decode(file_get_contents("php://input"), true);
    error_log(print_r($data, true)); // Log the received data for debugging

    // Validate and format the lost_date
    if (isset($data['lost_date'])) {
        $date = DateTime::createFromFormat('Y-m-d', $data['lost_date']);
        if ($date !== false) {
            $data['lost_date'] = $date->format('Y-m-d'); // Format for MySQL date type
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid date format."]);
            exit;
        }
    }

// Prepare the SQL statement
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
            status = :status
        WHERE id = :id"; // Ensure this is the correct ID column

$stmt = $conn->prepare($sql);

// Bind parameters
$stmt->bindParam(':name', $data['name']);
$stmt->bindParam(':pet_type', $data['pet_type']);
$stmt->bindParam(':age', $data['age'], PDO::PARAM_INT);
$stmt->bindParam(':gender', $data['gender']);
$stmt->bindParam(':contactNo', $data['contact_no']);
$stmt->bindParam(':lostDate', $data['lost_date']);
$stmt->bindParam(':address', $data['address']);
$stmt->bindParam(':location', $data['location']);
$stmt->bindParam(':description', $data['description']);
$stmt->bindParam(':status', $data['status']);
$stmt->bindParam(':id', $data['id'], PDO::PARAM_INT); // Ensure this corresponds to your WHERE clause


    // Execute the statement
// Execute the statement
if ($stmt->execute()) {
    $affectedRows = $stmt->rowCount();
    error_log("Affected Rows: " . $affectedRows);
    echo json_encode(["status" => "success", "message" => "Recordsss updated successfully.","affectedRows" => $affectedRows]);
} else {
    $errorInfo = $stmt->errorInfo();
    error_log("SQL Error: " . print_r($errorInfo, true)); // Log detailed SQL error
    echo json_encode(["status" => "error", "message" => "Failed to update record. Error: " . $errorInfo[2]]);
}

} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method. Use PUT."]);
}
?>
