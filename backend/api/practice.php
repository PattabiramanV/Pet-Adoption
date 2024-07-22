<?php


require "../middleware/authentication.php";


$jwt= generateJWT(100);

// echo $jwt;

echo validateJWT($jwt);

echo "<br>";

echo authenticate();    