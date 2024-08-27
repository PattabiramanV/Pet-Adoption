<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, PUT');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
require '../config/database.php';

$petId = isset($_POST['id']) ? intval($_POST['id']) : null;
$name = isset($_POST['name']) ? $_POST['name'] : '';
$breed = isset($_POST['breed']) ? $_POST['breed'] : '';
$age = isset($_POST['age']) ? intval($_POST['age']) : null;
$size = isset($_POST['size']) ? $_POST['size'] : '';
$description = isset($_POST['description']) ? $_POST['description'] : '';
$photo = isset($_POST['photo']) ? $_POST['photo'] : '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Handle file upload
    if (!empty($_FILES['photo']['name'])) {
        $target_dir = __DIR__ . "/hostelimg/";
        $target_file = $target_dir . basename($_FILES['photo']['name']);
        
        if (move_uploaded_file($_FILES['photo']['tmp_name'], $target_file)) {
            // Update the image in the database
            $imagePath = basename($_FILES['photo']['name']);
            $query = "UPDATE pets SET name = :name, breeds = :breed, age = :age, size = :size, description = :description, photo = :photo WHERE id = :id";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':photo', $imagePath);
        } else {
            echo json_encode(['success' => false, 'error' => 'Image upload failed']);
            exit();
        }
    } else {
        // Image is not being updated, use the existing one
        $query = "UPDATE pets SET name = :name, breeds = :breed, age = :age, size = :size, description = :description WHERE id = :id";
        $stmt = $conn->prepare($query);
    }

    // Bind other parameters as usual
    $stmt->bindParam(':id', $petId, PDO::PARAM_INT);
    $stmt->bindParam(':name', $name, PDO::PARAM_STR);
    $stmt->bindParam(':breed', $breed, PDO::PARAM_STR);
    $stmt->bindParam(':age', $age, PDO::PARAM_INT);
    $stmt->bindParam(':size', $size, PDO::PARAM_STR);
    $stmt->bindParam(':description', $description, PDO::PARAM_STR);

    // Execute the statement
    try {
        $stmt->execute();
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}
