<?php
// read_items.php

require '../config/config.php';

$user_id = authenticate();

$query = "SELECT * FROM items";
$stmt = $conn->prepare($query);
$stmt->execute();

$items = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($items);
?>
