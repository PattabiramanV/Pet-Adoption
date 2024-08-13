<?php
//     // ini_set('display_errors', '1');
//     header("Access-Control-Allow-Origin: *"); // Allow from any origin
//     header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Allowed methods
//     header("Access-Control-Allow-Headers: Content-Type");



//     $token = file_get_contents('php://input');
//     $data = json_decode($token, true);

//     // print_r ($data);
// // exit();
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

// require '../vendor/autoload.php'; // Google API client library
// require '../config/database.php'; // Database configuration

// use Google\Client as GoogleClient;
// use Google\Service\Oauth2 as GoogleOauth2;

// $googleClientId = '611093167877-hoigrr8d8srrv5lr2ho26aaafddpsla3.apps.googleusercontent.com';
// $googleClientSecret = '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';
// $googleRedirectUri = 'http://localhost:3000';


// // $dbDsn = 'mysql:dbname=pet_adoption;host=localhost'; // Adjust as needed
// // $dbUser = 'dckap';
// // $dbPassword = 'Dckap2023Ecommerce';

// header('Content-Type: application/json');



// // Initialize Google client
// $client = new GoogleClient();
// $client->setClientId($googleClientId);
// $client->setClientSecret($googleClientSecret);
// $client->setRedirectUri($googleRedirectUri);
// $client->addScope('profile');
// $client->addScope('email');


// $payload = $client->verifyIdToken($data['key']);

// // print ($_POST['key']);



// // exit();
// // Get token from POST request
// // $token = $data['key'] ;

// print_r($payload);
// exit();


// if (empty($payload)) {
//     echo json_encode(['message' => 'Token is required']);
//     http_response_code(400);
//     exit();
// }

// try {
//     // Verify token with Google
//     $client->setAccessToken($token);
//     $oauth = new GoogleOauth2($client);
//     $userInfo = $oauth->userinfo->get();

//     $googleId = $userInfo->id;
//     $email = $userInfo->email;
//     $name = $userInfo->name;

//     // Database connection
//     $pdo = new PDO($dbDsn, $dbUser, $dbPassword);
//     $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

//     // Check if user exists
//     $stmt = $pdo->prepare('SELECT * FROM users WHERE google_id = ?');
//     $stmt->execute([$googleId]);
//     $user = $stmt->fetch(PDO::FETCH_ASSOC);

//     if ($user) {
//         // User exists
//         echo json_encode(['message' => 'User logged in successfully']);
//         http_response_code(200);
//     } else {
//         // New user - create record
//         $stmt = $pdo->prepare('INSERT INTO users (google_id, name, email) VALUES (?, ?, ?)');
//         $stmt->execute([$googleId, $name, $email]);
//         echo json_encode(['message' => 'User registered successfully']);
//         http_response_code(201);
//     }
// } catch (\Google\Exception $e) {
//     echo json_encode(['message' => 'Google API Error: ' . $e->getMessage()]);
//     http_response_code(500);
// } catch (PDOException $e) {
//     echo json_encode(['message' => 'Database Error: ' . $e->getMessage()]);
//     http_response_code(500);
// } catch (Exception $e) {
//     echo json_encode(['message' => 'Error: ' . $e->getMessage()]);
//     http_response_code(500);
// }


// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);



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
require '../config/database.php'; // Database configuration

use Google\Client as GoogleClient;
use Google\Service\Oauth2 as GoogleOauth2;

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

if (!isset($data['key'])) {
    echo json_encode(['message' => 'Token is required']);
    http_response_code(400);
    exit();
}

try {
    // Verify the ID token using Google's API
    $payload = $client->verifyIdToken($data['key']);

    if (!$payload) {
        throw new Exception('Invalid token');
    }

    // Extract Google ID, email, and name from the payload
    $googleId = $payload['sub'] ?? null;
    $email = $payload['email'] ?? null;
    $name = $payload['name'] ?? null;

    if (!$googleId) {
        throw new Exception('Google ID is missing');
    }

    // Check if the user with the Google ID already exists in the database
    $stmt = $conn->prepare('SELECT COUNT(*) FROM users WHERE google_id = :googleId');
    $stmt->bindParam(':googleId', $googleId);
    $stmt->execute();
    $userCount = $stmt->fetchColumn();

    if ($userCount > 0) {
            echo json_encode(["message" => "Email already registered."]);
        http_response_code(400); 
        exit();
    }

    // Insert the new user into the database
    $query = "INSERT INTO users (google_id, username, email) VALUES (:googleId, :name, :email)";
    $stmt = $conn->prepare($query);

    $stmt->bindParam(':googleId', $googleId);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);

    $stmt->execute();

    echo json_encode(['message' => 'Registration successful.']);
    http_response_code(200);

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

?>
