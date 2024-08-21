<?php
 
header("Access-Control-Allow-Origin: *"); // Allow from any origin
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Allowed methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allowed headers

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require '../vendor/autoload.php'; // Google API client library
// require '../config/database.php'; // Database configuration
require '../config/config.php'; // Config file for database connection

use Google\Client as GoogleClient;
use Firebase\JWT\JWT;

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
        // Insert the new user into the database
        $query = "INSERT INTO users (google_id, username, email) VALUES (:googleId, :name, :email)";
        $stmt = $conn->prepare($query);

        $stmt->bindParam(':googleId', $googleId);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);

        $stmt->execute();

        // Generate JWT after successful registration
        $newUserId = $conn->lastInsertId();
        $jwt = generateJWT($newUserId);

        echo json_encode([
            "message" => "Registration successful.",
            "jwt" => $jwt
        ]);
        http_response_code(200);
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

// Function to generate JWT
// function generateJWT($userId) {
//     $secretKey = getenv('JWT_SECRET');
//     $issuedAt = time();
//     $expirationTime = $issuedAt + 3600;  // jwt valid for 1 hour from the issued time
//     $payload = [
//         'iat' => $issuedAt,
//         'exp' => $expirationTime,
//         'sub' => $userId
//     ];

//     return JWT::encode($payload, $secretKey, 'HS256');
// }

?>
