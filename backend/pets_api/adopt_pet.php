<?php
include_once '../config/database.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

parse_str(file_get_contents("php://input"), $data);

$pet_id = filter_var($data['id'], FILTER_SANITIZE_NUMBER_INT);
$user_id = filter_var($data['user_id'], FILTER_SANITIZE_NUMBER_INT);
$address = isset($data['address']) ? filter_var($data['address'], FILTER_SANITIZE_STRING) : null;
$city = isset($data['city']) ? filter_var($data['city'], FILTER_SANITIZE_STRING) : null;
$state = isset($data['state']) ? filter_var($data['state'], FILTER_SANITIZE_STRING) : null;
$status = isset($data['status']) ? filter_var($data['status'], FILTER_SANITIZE_STRING) : 'pending';



if (empty($pet_id) || empty($user_id)) {
    echo json_encode(['success' => false, 'message' => 'Pet ID, adoption status, or user ID is missing.']);
    exit();
}

try {
    $conn->beginTransaction();

   

$query = "INSERT INTO adoption_events (pet_id, user_id, adoption_time" . 
        ($address ? ", address" : "") . 
        ($city ? ", city" : "") . 
        ($state ? ", state" : "") . 
        ", status) VALUES (:pet_id, :user_id, NOW()" . 
        ($address ? ", :address" : "") . 
        ($city ? ", :city" : "") . 
        ($state ? ", :state" : "") . 
        ", :status)";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':pet_id', $pet_id, PDO::PARAM_INT);
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    if ($address) $stmt->bindParam(':address', $address, PDO::PARAM_STR);
    if ($city) $stmt->bindParam(':city', $city, PDO::PARAM_STR);
    if ($state) $stmt->bindParam(':state', $state, PDO::PARAM_STR);
    $stmt->bindParam(':status', $status, PDO::PARAM_STR);
    if (!$stmt->execute()) {
        throw new Exception('Failed to insert adoption event.');
    }
    $conn->commit();
    echo json_encode(['success' => true, 'message' => 'Adoption status updated and event recorded successfully.']);
} catch (Exception $e) {
    $conn->rollBack();
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
