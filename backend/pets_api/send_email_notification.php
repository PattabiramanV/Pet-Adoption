<?php
require '../config/database.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


$requestId = $_POST['requestId'];
$action = $_POST['action']; // 'accepted' or 'rejected'

// Fetch details for the request
$sql = "SELECT pet_id, user_id FROM adoption_events WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$requestId]);
$request = $stmt->fetch(PDO::FETCH_ASSOC);

$petId = $request['pet_id'];
$userId = $request['user_id'];

// Fetch user email
$sql = "SELECT email FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$userId]);
$userEmail = $stmt->fetchColumn();

// Fetch pet details
$sql = "SELECT * FROM pets WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$petId]);
$pet = $stmt->fetch(PDO::FETCH_ASSOC);
$petName = $pet['name'] ?? 'Unknown Pet';

// Send email notification
$to = $userEmail;
$subject = $action === 'accepted' ? 'Adoption Request Accepted' : 'Adoption Request Rejected';
$message = $action === 'accepted' ? "Congratulations! Your request to adopt $petName has been accepted." : "Sorry, your request to adopt $petName has been rejected. Please select another pet.";
$headers = 'From: no-reply@petadoption.com';

mail($to, $subject, $message, $headers);

echo json_encode(['success' => true]);
?>