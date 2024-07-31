<?php
require '../config/config.php';
// require "../api/hostelcrud.php";
require '../model/dbconnect.php';
$user_id = authenticate();

$db = new Database();

$data = json_decode(file_get_contents("php://input"), true);

$method = $_SERVER['REQUEST_METHOD'];
// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// // Handle preflight requests (CORS)
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: POST, OPTIONS');
// header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit;
}
// echo json_encode(["message" => "User not authenticated."]);

// Authenticate user and get user ID
$user_id = authenticate();

if (!$user_id) {
    header('Content-Type: application/json');
    echo json_encode(["message" => "User not authenticated."]);
    http_response_code(401); // Unauthorized
    exit;
}




$imagePath = null;
// print_r($_FILES['fiels']);
// print_r($data);
echo json_encode($data);
// print_r($data['photos'][0]);
    //  if (isset($_FILES['photos']) && $_FILES['photos']['error'] === UPLOAD_ERR_OK) {
    //     $fileTmpPath = $_FILES['profile_img']['tmp_name'];
    //     $fileName = basename($_FILES['profile_img']['name']);
    //     $uploadFileDir = '../docterprofile/';
    //     $dest_path = $uploadFileDir . $fileName;

    //     // Validate image type
    //     $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    //     if (!in_array($_FILES['profile_img']['type'], $allowedTypes)) {
    //         echo json_encode(["message" => "Invalid image type. Only JPEG, PNG, and GIF are allowed."]);
    //         die();
    //     }

    //     // Check if the directory exists
    //     if (!is_dir($uploadFileDir)) {
    //         if (!mkdir($uploadFileDir, 0755, true)) {
    //             echo json_encode(["message" => "Failed to create upload directory."]);
    //             die();
    //         }
    //     }

    //     // Move the uploaded file
    //     if (move_uploaded_file($fileTmpPath, $dest_path)) {
    //         $imagePath = $dest_path;
    //     } else {
    //         echo json_encode(["message" => "Possible file upload attack or move failed!"]);
    //         die();
    //     }
    // } else {
    //     echo json_encode(["message" => "Image upload failed. No file uploaded or upload error."]);
    //     die();
    // }









// if ($_SERVER['REQUEST_METHOD'] === 'POST') {


//     try {
//         // Prepare the SQL query
//         $stmt = $db->conn->prepare("INSERT INTO pet_hostels (name, address, price_per_day, description, contact, user_id, available_time) VALUES (:name, :address, :price_per_day, :description, :contact, :user_id, :available_time)");
    
//         // Bind parameters
//         $stmt->bindParam(':name', $data['name']);
//         $stmt->bindParam(':address', $data['address']);
//         $stmt->bindParam(':price_per_day', $data['price_per_day']);
//         $stmt->bindParam(':description', $data['description']);
//         $stmt->bindParam(':contact', $data['contact']);
//         $stmt->bindParam(':user_id', $user_id);
//         $stmt->bindParam(':available_time', $data['available_time']);
    
//         // Execute the query
//         if ($stmt->execute()) {
//             echo json_encode(["message" => "Record inserted successfully."]);
//         } else {
//             // If execute fails, fetch and display the error info
//             $errorInfo = $stmt->errorInfo();
//             echo json_encode(["message" => "Failed to execute query.", "error" => $errorInfo]);
//         }
//     } catch (PDOException $e) {
//         // Handle and display PDO exceptions
//         echo json_encode(["message" => "Database error occurred.", "error" => $e->getMessage()]);
//     }
    















    // $uploadedFiles = [];
    // $errors = [];




    // Handle form fields
    // $formData = [
    //     'name' => $_POST['name'] ?? '',
    //     'contact' => $_POST['contact'] ?? '',
    //     'price_per_day' => $_POST['price_per_day'] ?? '',
    //     'available_time' => $_POST['available_time'] ?? '',
    //     'address' => $_POST['address'] ?? '',
    //     'description' => $_POST['description'] ?? ''
    // ];

    // echo json_encode($_POST['name']);

    // // Validate and process files
    // if (isset($_FILES['photos']) && $_FILES['photos']['error'][0] === UPLOAD_ERR_OK) {
    //     $files = $_FILES['photos'];
    //     $allowedTypes = ['image/jpeg', 'image/png'];

    //     foreach ($files['name'] as $key => $name) {
    //         if ($files['error'][$key] === UPLOAD_ERR_OK) {
    //             $file = [
    //                 'name' => $files['name'][$key],
    //                 'type' => $files['type'][$key],
    //                 'tmp_name' => $files['tmp_name'][$key],
    //                 'error' => $files['error'][$key],
    //                 'size' => $files['size'][$key]
    //             ];

    //             // Validate file type
    //             if (!in_array($file['type'], $allowedTypes)) {
    //                 $errors[] = "Invalid file type for $name. Only JPEG and PNG types are allowed.";
    //                 continue;
    //             }

    //             // Validate file size (max 2MB)
    //             if ($file['size'] > 2 * 1024 * 1024) {
    //                 $errors[] = "File size exceeds the limit of 2MB for $name.";
    //                 continue;
    //             }

    //             $upload_dir = __DIR__ . '/uploads/';
    //             if (!is_dir($upload_dir)) {
    //                 mkdir($upload_dir, 0755, true);
    //             }

    //             // Use a unique filename
    //             $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    //             $file_name = uniqid() . '.' . $extension;
    //             $file_path = $upload_dir . $file_name;

    //             if (move_uploaded_file($file['tmp_name'], $file_path)) {
    //                 $uploadedFiles[] = $file_name;
    //             } else {
    //                 $errors[] = "Failed to move uploaded file $name.";
    //             }
    //         } else {
    //             $errors[] = "Upload error for $name.";
    //         }
    //     }
    // } else {
    //     $errors[] = "No files uploaded or upload error.";
    // }

    // if (!empty($errors)) {
    //     header('Content-Type: application/json');
    //     echo json_encode(["errors" => $errors]);
    //     http_response_code(400); // Bad Request
    //     exit;
    // }

    // $photos = implode(', ', $uploadedFiles);

    // try {
    //     $stmt = $conn->prepare("INSERT INTO pet_hostels (name, address, price_per_day, description, contact, user_id, photos, available_time) VALUES (:name, :address, :price_per_day, :description, :contact, :user_id, :photos, :available_time)");
    //     $stmt->bindParam(':name', $formData['name']);
    //     $stmt->bindParam(':address', $formData['address']);
    //     $stmt->bindParam(':price_per_day', $formData['price_per_day']);
    //     $stmt->bindParam(':description', $formData['description']);
    //     $stmt->bindParam(':contact', $formData['contact']);
    //     $stmt->bindParam(':user_id', $user_id);
    //     $stmt->bindParam(':photos', $photos);
    //     $stmt->bindParam(':available_time', $formData['available_time']);

    //     if ($stmt->execute()) {
    //         $full_url = "http://localhost/petadoption/backend/uploads/" . implode(', ', $uploadedFiles);
    //         header('Content-Type: application/json');
    //         echo json_encode(["message" => "Request submitted successfully.", "photos" => $full_url]);
    //         http_response_code(200); // OK
    //     } else {
    //         throw new Exception("Failed to save request to the database.");
    //     }
    // } catch (Exception $e) {
    //     header('Content-Type: application/json');
    //     echo json_encode(["message" => $e->getMessage()]);
    //     http_response_code(500); // Internal Server Error
    // }



// } else {
//     header('Content-Type: application/json');
//     echo json_encode(["message" => "Invalid request method."]);
//     http_response_code(405); // Method Not Allowed
// }
