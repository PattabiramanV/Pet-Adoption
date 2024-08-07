<?php
require '../config/config.php';

// SQL query
$sql = "SELECT vetneries.id AS doctor_id, vetneries.name AS vetneries_name, vetneries.address AS vetneries_address, 
        vetneries.phone AS vetneries_phone, vetneries.email AS vetneries_email, vetneries.specialization AS vetneries_specialization, 
        pet_grooming_users.user_id, pet_grooming_users.name AS user_name, pet_grooming_users.phone AS user_phone, 
        pet_grooming_users.email AS user_email, pet_grooming_users.pet_type, pet_grooming_users.pet_gender, 
        pet_grooming_users.pet_age, pet_grooming_users.city, pet_grooming_users.what_you_need_for_your_pet
        FROM vetneries
        JOIN pet_grooming_users ON vetneries.id = pet_grooming_users.doctor_id
        WHERE pet_grooming_users.user_id = :user_id";

try {
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':user_id', $_GET['user_id'], PDO::PARAM_INT); // Assuming you pass user_id as a query parameter
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);
} catch (PDOException $e) {
    echo json_encode(["message" => "Error fetching data", "error" => $e->getMessage()]);
}
?>
