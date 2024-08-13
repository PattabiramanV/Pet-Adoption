<?php

require '../vendor/autoload.php'; // Google API client library
require '../config/config.php';  // Include your config file for database connection

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database configuration
use Google\Client as GoogleClient;

$googleClientId = getenv('GOOGLE_CLIENT_ID');
$googleClientSecret = getenv('GOOGLE_CLIENT_SECRET');
$googleRedirectUri = getenv('GOOGLE_REDIRECT_URI');


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

    if (!$payload) {
        echo json_encode(['message' => 'Invalid token']);
        http_response_code(400);
        exit();
    }

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
