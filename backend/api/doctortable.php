<?php
require '../config/config.php';

// Ensure the correct content type is set
header('Content-Type: application/json');

try {
    // Prepare SQL query with a placeholder for user_id
    $sql = "SELECT 
                pet_grooming_users.name AS grooming_user_name, 
                pet_grooming_users.phone AS grooming_user_phone, 
                pet_grooming_users.email AS grooming_user_email, 
                pet_grooming_users.pet_type, 
                pet_grooming_users.pet_gender, 
                pet_grooming_users.pet_age, 
                pet_grooming_users.city, 
                pet_grooming_users.what_you_need_for_your_pet, 
                vetneries.name AS doctor_name, 
                vetneries.address AS doctor_address 
            FROM pet_grooming_users 
            JOIN vetneries ON vetneries.id = pet_grooming_users.doctor_id 
            JOIN users ON users.id = pet_grooming_users.user_id 
            WHERE vetneries.id = pet_grooming_users.doctor_id";

    // Prepare and execute the SQL statement
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Check if results are fetched and return JSON response
    if (empty($result)) {
        echo json_encode(["message" => "No data found"]);
    } else {
        echo json_encode($result);
    }
} catch (PDOException $e) {
    // Handle SQL errors
    echo json_encode(["message" => "Error fetching data", "error" => $e->getMessage()]);
} catch (Exception $e) {
    // Handle general errors
    echo json_encode(["message" => $e->getMessage()]);
}
?>
