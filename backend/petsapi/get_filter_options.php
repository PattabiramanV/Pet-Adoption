<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

try {
    // Fetch distinct ages
    $ageQuery = "SELECT DISTINCT age FROM pets where status = 'available'    ORDER BY age ASC";
    $ageStmt = $conn->prepare($ageQuery);
    $ageStmt->execute();
    $ages = $ageStmt->fetchAll(PDO::FETCH_COLUMN, 0);

    // Fetch distinct breeds
    $breedQuery = "SELECT DISTINCT breeds FROM pets where status = 'available'  ORDER BY breeds ASC";
    $breedStmt = $conn->prepare($breedQuery);
    $breedStmt->execute();
    $breeds = $breedStmt->fetchAll(PDO::FETCH_COLUMN, 0);

    http_response_code(200);
    echo json_encode([
        'ages' => $ages,
        'breeds' => $breeds
    ]);
} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(array("message" => "Server error."));
}
?>
