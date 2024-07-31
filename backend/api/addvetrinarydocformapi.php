<?php

require('../config/config.php');

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

$user_id = authenticate(); // Ensure this function is correctly defined

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check for empty fields
    if (empty($_POST['name']) || empty($_POST['education']) || empty($_POST['phone']) 
        || empty($_POST['experience']) || empty($_POST['email']) || empty($_POST['have_a_clinic']) 
        || empty($_POST['specialist']) || empty($_POST['address']) || empty($_POST['available_timing']) 
        || empty($_POST['description']) || empty($_POST['home_visiting_available'])
        || empty($_POST['doctor_registerno']) || empty($_FILES['profile_img']['name']) || empty($_POST['state']) || empty($_POST['city'])) {
        echo json_encode(array("message" => "Please fill all the fields and upload an image."));
        die();
    }

    // Extract data and sanitize
    $doctorname = htmlspecialchars(strip_tags($_POST['name']));
    $docContact = htmlspecialchars(strip_tags($_POST['phone']));
    $docemail = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $education = htmlspecialchars(strip_tags($_POST['education']));
    $experience = htmlspecialchars(strip_tags($_POST['experience']));
    $specialisation = htmlspecialchars(strip_tags($_POST['specialist']));
    $availableTiming = htmlspecialchars(strip_tags($_POST['available_timing']));
    $haveAclinic = htmlspecialchars(strip_tags($_POST['have_a_clinic']));
    $address = htmlspecialchars(strip_tags($_POST['address']));
    $description = htmlspecialchars(strip_tags($_POST['description']));
    $homeVisiting = htmlspecialchars(strip_tags($_POST['home_visiting_available']));
    $doctor_registerno = htmlspecialchars(strip_tags($_POST['doctor_registerno']));
    $state = htmlspecialchars(strip_tags($_POST['state']));
    $city = htmlspecialchars(strip_tags($_POST['city']));

    // Phone number validation
    $phonePattern = '/^\+?[0-9\s\-()]+$/';
    if (!preg_match($phonePattern, $docContact)) {
        echo json_encode(array("message" => "Invalid phone number format."));
        die();
    }

    // Image handling
    $imagePath = null;
    if (isset($_FILES['profile_img']) && $_FILES['profile_img']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['profile_img']['tmp_name'];
        $fileName = basename($_FILES['profile_img']['name']);
        $uploadFileDir = '../docterprofile/';
        $dest_path = $uploadFileDir . $fileName;

        // Validate image type
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!in_array($_FILES['profile_img']['type'], $allowedTypes)) {
            echo json_encode(["message" => "Invalid image type. Only JPEG, PNG, and GIF are allowed."]);
            die();
        }

        // Check if the directory exists
        if (!is_dir($uploadFileDir)) {
            if (!mkdir($uploadFileDir, 0755, true)) {
                echo json_encode(["message" => "Failed to create upload directory."]);
                die();
            }
        }

        // Move the uploaded file
        if (move_uploaded_file($fileTmpPath, $dest_path)) {
            $imagePath = $dest_path;
        } else {
            echo json_encode(["message" => "Possible file upload attack or move failed!"]);
            die();
        }
    } else {
        echo json_encode(["message" => "Image upload failed. No file uploaded or upload error."]);
        die();
    }
    // Insert data into database
    $query = "INSERT INTO vetneries (name, education, have_a_clinic, specialist, available_timing, phone, home_visiting_available, experience, address, description, user_id, email, profile_img, doctor_registerno,state,city) 
              VALUES (:doctorname, :education, :haveAclinic, :specialisation, :availableTiming, :docContact, :homeVisiting, :experience, :address, :description, :user_id, :docemail, :imagePath, :doctor_registerno, :state, :city)";

    try {
        $stmt = $conn->prepare($query);

        $stmt->bindParam(':doctorname', $doctorname);
        $stmt->bindParam(':education', $education);
        $stmt->bindParam(':haveAclinic', $haveAclinic);
        $stmt->bindParam(':specialisation', $specialisation);
        $stmt->bindParam(':availableTiming', $availableTiming);
        $stmt->bindParam(':docContact', $docContact);
        $stmt->bindParam(':homeVisiting', $homeVisiting);
        $stmt->bindParam(':experience', $experience);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':docemail', $docemail);
        $stmt->bindParam(':imagePath', $imagePath);
        $stmt->bindParam(':doctor_registerno', $doctor_registerno);
        $stmt->bindParam(':state', $state);
        $stmt->bindParam(':city', $city);

        if ($stmt->execute()) {
            echo json_encode(array("message" => "Doctor registered successfully."));
        } else {
            $errorInfo = $stmt->errorInfo();
            echo json_encode(array("message" => "Unable to register doctor.", "error" => $errorInfo));
        }
    } catch (Exception $e) {
        echo json_encode(array("message" => "An error occurred.", "error" => $e->getMessage()));
    }
}
?>
