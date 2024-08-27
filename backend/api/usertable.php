<?php

require('../config/config.php');
header('Content-Type: application/json');
$user_id = authenticate();

$image_base_url = 'http://localhost/petadoption/backend/images/';

try {
    $sql = "SELECT 
    vetneries.id AS doctor_id, 
    CONCAT(:image_base_url, vetneries.profile_img) AS doctor_profile, 
    vetneries.name AS doctor_name, 
    vetneries.city AS doctor_city, 
    vetneries.state AS doctor_state, 
    vetneries.address AS doctor_address, 
    vetneries.phone AS doctor_phone, 
    vetneries.email AS doctor_email, 
    vetneries.specialist AS specialization, 
    pet_grooming_users.pet_type AS pet_type, 
    pet_grooming_users.pet_gender AS pet_gender, 
    pet_grooming_users.appoinment_date AS appoinment_date, 
    pet_grooming_users.pet_age AS pet_age,
    pet_grooming_users.what_you_need_for_your_pet AS need_for_pet,
    pet_grooming_users.status,
    pet_grooming_users.id,
    GROUP_CONCAT(DISTINCT slot.bookingslot ORDER BY slot.bookingslot ASC SEPARATOR ', ') AS bookingslot
FROM 
    vetneries 
JOIN 
    pet_grooming_users 
ON 
    vetneries.id = pet_grooming_users.doctor_id
JOIN 
    slot
ON 
    slot.user_id = pet_grooming_users.user_id 
WHERE 
    pet_grooming_users.user_id = :user_id
GROUP BY 
    vetneries.id, pet_grooming_users.appoinment_date";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->bindParam(':image_base_url', $image_base_url, PDO::PARAM_STR);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($result)) {
        echo json_encode(["message" => "No data found for the provided user ID"]);
    } else {
        echo json_encode($result);
    }

} catch (PDOException $e) {
    echo json_encode(["message" => "Error fetching data from the database", "error" => $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(["message" => $e->getMessage()]);
}

?>
