<?php
// create_item.php

require '../config/config.php';

$user_id = authenticate();

$data = json_decode(file_get_contents("php://input"));

$name = htmlspecialchars(strip_tags($data->name));
$description = htmlspecialchars(strip_tags($data->description));

$query = "INSERT INTO items (name, description) VALUES (:name, :description)";
$stmt = $conn->prepare($query);
$stmt->bindParam(':name', $name);
$stmt->bindParam(':description', $description);

if ($stmt->execute()) {
    echo json_encode(array("message" => "Item created successfully."));
} else {
    echo json_encode(array("message" => "Unable to create item."));
}
?>
