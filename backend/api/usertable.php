<?php
require '../config/config.php';

// Ensure the correct content type is set
header('Content-Type: application/json');

try {
    // Check if user_id is set and is a valid number
    if (!isset($_GET['user_id']) || !is_numeric($_GET['user_id'])) {
        throw new Exception('Invalid user_id');
    }

    // Prepare SQL query with a placeholder for user_id
    $sql = "SELECT 
                vetneries.id AS doctor_id, 
                vetneries.name AS doctor_name, 
                vetneries.address AS doctor_address, 
                vetneries.phone AS doctor_phone, 
                vetneries.email AS doctor_email, 
                vetneries.specialist AS specialization, 
                pet_grooming_users.id AS user_id, 
                pet_grooming_users.contact AS user_contact, 
                pet_grooming_users.email AS user_email,
                pet_grooming_users.pet_type AS pet_type, 
                pet_grooming_users.pet_gender AS pet_gender, 
                pet_grooming_users.pet_age AS pet_age, 
                pet_grooming_users.city AS city, 
                pet_grooming_users.need_for_pet AS need_for_pet
            FROM vetneries 
            JOIN pet_grooming_users 
            ON vetneries.id = pet_grooming_users.doctor_id 
            WHERE pet_grooming_users.user_id = :user_id";

    // Prepare and execute the SQL statement
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':user_id', $_GET['user_id'], PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Output the result as JSON
    echo json_encode($result);
} catch (PDOException $e) {
    echo json_encode(["message" => "Error fetching data", "error" => $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(["message" => $e->getMessage()]);
}
?>
