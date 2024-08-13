<?php

require '../vendor/autoload.php'; // Google API client library
require '../config/config.php';  

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

// Database configuration
use Google\Client as GoogleClient;

$googleClientId = '611093167877-hoigrr8d8srrv5lr2ho26aaafddpsla3.apps.googleusercontent.com';
$googleClientSecret = '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';
$googleRedirectUri = 'http://localhost:3000';

// Initialize Google client
$client = new GoogleClient();
$client->setClientId($googleClientId);
$client->setClientSecret($googleClientSecret);
$client->setRedirectUri($googleRedirectUri);
$client->addScope('profile');
$client->addScope('email');

header('Content-Type: application/json');

$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Check if key exists in the request data
if (!isset($data['key'])) {
    echo json_encode(['message' => 'Token is required']);
    http_response_code(400);
    exit();
}

$token = $data['key'];

try {
    // Verify the ID token using Google's API
    $payload = $client->verifyIdToken($token);

    // Extract Google ID, email, and name from the payload
    $googleId = $payload['sub'] ?? null;
    $email = $payload['email'] ?? null;
    $name = $payload['name'] ?? null;

    if (!$googleId || !$email) {
        echo json_encode(['message' => 'Invalid token']);
        http_response_code(400); // Bad Request
        exit();
    }

    // Assume $conn is your PDO database connection
    $query = "SELECT * FROM users WHERE google_id = :googleId OR email = :email";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':googleId', $googleId);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row) {
        // User exists, generate JWT
        $jwt = generateJWT($row['id']);
        echo json_encode([
            "message" => "Login successful.",
            "jwt" => $jwt
        ]);
        http_response_code(200); // login successful
    } else {
        // User does not exist
        echo json_encode(["message" => "Unable to login user. Invalid credentials."]);
        http_response_code(401); // Unauthorized
    }
} catch (\Google\Exception $e) {
    echo json_encode(['message' => 'Google API Error: ' . $e->getMessage()]);
    http_response_code(500);
} catch (PDOException $e) {
    echo json_encode(['message' => 'Database Error: ' . $e->getMessage()]);
    http_response_code(500);
} catch (Exception $e) {
    echo json_encode(['message' => 'Error: ' . $e->getMessage()]);
    http_response_code(500);
}
