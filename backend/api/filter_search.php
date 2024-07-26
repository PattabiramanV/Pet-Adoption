<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pet_adoption";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$conditions = [];
$params = [];

// Add conditions based on the received parameters
if (!empty($_GET['petType'])) {
    $conditions[] = "pet_category = ?";
    $params[] = $_GET['petType'];
}
if (!empty($_GET['searchLocation'])) {
    $conditions[] = "city LIKE ?";
    $params[] = "%" . $_GET['searchLocation'] . "%";
}
if (!empty($_GET['size'])) {
    $conditions[] = "size = ?";
    $params[] = $_GET['size'];
}
if (!empty($_GET['breed'])) {
    $conditions[] = "breeds = ?";
    $params[] = $_GET['breed'];
}
if (!empty($_GET['age'])) {
    $conditions[] = "age = ?";
    $params[] = $_GET['age'];
}
if (!empty($_GET['color'])) {
    $conditions[] = "color = ?";
    $params[] = $_GET['color'];
}
if (!empty($_GET['gender'])) {
    $conditions[] = "gender = ?";
    $params[] = $_GET['gender'];
}

$sql = "SELECT * FROM pets";
if (count($conditions) > 0) {
    $sql .= " WHERE " . implode(" AND ", $conditions);
}

$stmt = $conn->prepare($sql);
if (count($params) > 0) {
    $stmt->bind_param(str_repeat("s", count($params)), ...$params);
}

$stmt->execute();
$result = $stmt->get_result();

$pets = [];
while ($row = $result->fetch_assoc()) {
    $pets[] = $row;
}

$stmt->close();
$conn->close();

echo json_encode($pets);
?>
