<?php

require '../vendor/autoload.php';

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

$key = 'Manoj';


function generateJWT($user_id) {
    global $key;
    $payload = array(
        "iss" => "localhost", 
        
        "aud" => "localhost",
        "iat" => time(),
        // "exp" => time() + 3600,
        "exp" => time() + (60 * 60 * 24), // Expires in 1 day
            // "exp" => time() + 60, // Expires in 1 minute (60 seconds)

        "data" => array(
            "id" => $user_id
        )
    );

    return JWT::encode($payload, $key,'HS256');
    
}

function validateJWT($jwt) {
    global $key;
    try {
        $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
        return $decoded->data->id;
    } catch (Exception $e) {
        return false;
    }
}

function authenticate() {
    global $key;
    $headers = getallheaders();
 
  
    if (isset($headers['Authorization'])) {
        $jwt = str_replace('Bearer ', '', $headers['Authorization']);
        $jwt = trim($jwt);
    

        try {
        
            $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
            return $decoded->data->id;
        } catch (Exception $e) {
            echo json_encode(array("message" => "Access denied. Invalid token."));
            exit();
            // http_response_code(401);

        }
    } else {
       

        // http_response_code(401); 
        echo json_encode(array("message" => "Access denied. No token provided."));
        exit();
    }
}


?>
