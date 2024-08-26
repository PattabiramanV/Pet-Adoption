<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

try {
    $query = "SELECT * FROM pets WHERE status = 'available'";
    $filters = [];
    
    if (isset($_GET['pet_category']) && !empty($_GET['pet_category'])) {
        $filters[] = "category = :petType";
    }
    if (isset($_GET['searchLocation']) && !empty($_GET['searchLocation'])) {
        $filters[] = "city LIKE :searchLocation";
    }
    if (isset($_GET['size']) && !empty($_GET['size'])) {
        $filters[] = "size = :size";
    }
    if (isset($_GET['breed']) && !empty($_GET['breed'])) {
        $filters[] = "breeds = :breed";
    }
    if (isset($_GET['age']) && !empty($_GET['age'])) {
        $filters[] = "age = :age";
    }
    if (isset($_GET['color']) && !empty($_GET['color'])) {
        $filters[] = "color = :color";
    }
    if (isset($_GET['gender']) && !empty($_GET['gender'])) {
        $filters[] = "gender = :gender";
    }
    
    if (count($filters) > 0) {
        $query .= " AND " . implode(" AND ", $filters);
    }

    error_log("SQL Query: " . $query);

    $stmt = $conn->prepare($query);

    if (isset($_GET['pet_category']) && !empty($_GET['pet_category'])) {
        $stmt->bindParam(':pet_category', $_GET['pet_category']);
    }
    if (isset($_GET['searchLocation']) && !empty($_GET['searchLocation'])) {
        $searchLocation = '%' . $_GET['searchLocation'] . '%';
        $stmt->bindParam(':searchLocation', $searchLocation);
    }
    if (isset($_GET['size']) && !empty($_GET['size'])) {
        $stmt->bindParam(':size', $_GET['size']);
    }
    if (isset($_GET['breed']) && !empty($_GET['breed'])) {
        $stmt->bindParam(':breed', $_GET['breed']);
    }
    if (isset($_GET['age']) && !empty($_GET['age'])) {
        $stmt->bindParam(':age', $_GET['age']);
    }
    if (isset($_GET['color']) && !empty($_GET['color'])) {
        $stmt->bindParam(':color', $_GET['color']);
    }
    if (isset($_GET['gender']) && !empty($_GET['gender'])) {
        $stmt->bindParam(':gender', $_GET['gender']);
    }
    
    $stmt->execute();
    
    $pets = $stmt->fetchAll(PDO::FETCH_ASSOC);

    error_log("Number of pets found: " . count($pets));

    if ($pets) {
        echo json_encode(['status' => 'success', 'data' => $pets]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No pets found']);
    }

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'An error occurred: ' . $e->getMessage()]);
}
