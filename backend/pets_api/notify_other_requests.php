<?php
require '../config/database.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$pet_id = $_POST['pet_id'];
$accepted_user_id = $_POST['accepted_user_id'];

try {
    // Fetch email of all users who requested the same pet except the accepted one
    $stmt = $conn->prepare("SELECT users.email FROM adoption_events JOIN users ON adoption_events.user_id = users.id WHERE adoption_events.pet_id = ? AND adoption_events.user_id != ? AND adoption_events.status = 'pending'");
    $stmt->execute([$pet_id, $accepted_user_id]);
    $users = $stmt->fetchAll();

    // Notify each user
    foreach ($users as $user) {
        $user_email = $user['email'];
        $subject = "Pet Adoption Unavailable";
        $message = "Sorry, the pet you requested to adopt is no longer available. Please select another pet.";
        mail($user_email, $subject, $message);
    }

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
