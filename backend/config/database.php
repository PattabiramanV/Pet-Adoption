<?php

$host = 'localhost';
$db_name = 'pet_adoption';
$username = 'dckap';
// $password = 'Dckap2023Ecommerce';
$password = 'Dckap2023Ubuntu';


try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Connection error: " . $e->getMessage();
    die();
}



?>

