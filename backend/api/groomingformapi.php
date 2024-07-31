<?php
require '../config/config.php';

// User authentication
$user_id = authenticate();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if all required fields are filled
    if (empty($_POST['name']) || empty($_POST['contact']) || empty($_POST['email']) 
    || empty($_POST['petType']) || empty($_POST['petGender']) || empty($_POST['petAge']) 
    || empty($_POST['selectdoctorname']) || empty($_POST['doctorAddress']) || empty($_FILES['petimage'])
    || empty($_POST['city']) || empty($_POST['needForPet'])) {
        echo json_encode(array("message" => "Please fill all the fields and upload an image."));
        die();
    }

    // Extract and sanitize data
    $username = htmlspecialchars(strip_tags($_POST['name']));
    $userContact = filter_var($_POST['contact'], FILTER_SANITIZE_NUMBER_INT);
    $userContact = filter_var($userContact, FILTER_VALIDATE_INT);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $email = filter_var($email, FILTER_VALIDATE_EMAIL);
    $petType = htmlspecialchars(strip_tags($_POST['petType']));
    $petGender = htmlspecialchars(strip_tags($_POST['petGender']));
    $petAge = filter_var($_POST['petAge'], FILTER_VALIDATE_INT, ["options" => ["min_range" => 0]]);
    $city = htmlspecialchars(strip_tags($_POST['city']));
    $needForYou = htmlspecialchars(strip_tags($_POST['needForPet']));
    $doctorName = htmlspecialchars(strip_tags($_POST['selectdoctorname']));
    $doctorAddress = htmlspecialchars(strip_tags($_POST['doctorAddress']));

    // Retrieve doctor_id based on doctor_name
    $doctorQuery = "SELECT id FROM vetneries WHERE name = :doctorName";
    $stmt = $conn->prepare($doctorQuery);
    $stmt->bindParam(':doctorName', $doctorName);
    $stmt->execute();
    $doctor = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($doctor) {
        $doctorID = $doctor['id'];
    } else {
        echo json_encode(array("message" => "Invalid doctor name."));
        die();
    }

    // Image handling
    $imagePath = null;

    if (isset($_FILES['petimage']) && $_FILES['petimage']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['petimage']['tmp_name'];
        $fileName = basename($_FILES['petimage']['name']);
        $uploadFileDir = '../docterprofile/groomingpetspic/';
        $dest_path = $uploadFileDir . $fileName;

        // Validate image type
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!in_array($_FILES['petimage']['type'], $allowedTypes)) {
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

    // Prepare SQL query
    $query = "INSERT INTO pet_grooming_users (name, phone, email, pet_type, pet_gender, pet_age, city, what_you_need_for_your_pet, user_id, doctor_id, doctor_address, pet_img) 
              VALUES (:username, :userContact, :email, :petType, :petGender, :petAge, :city, :needForYou, :user_id, :doctorID, :doctorAddress, :imagePath)";

    $stmt = $conn->prepare($query);

    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':userContact', $userContact);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':petType', $petType);
    $stmt->bindParam(':petGender', $petGender);
    $stmt->bindParam(':petAge', $petAge);
    $stmt->bindParam(':city', $city);
    $stmt->bindParam(':needForYou', $needForYou);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':doctorID', $doctorID);
    $stmt->bindParam(':doctorAddress', $doctorAddress);
    $stmt->bindParam(':imagePath', $imagePath);

    try {
        if ($stmt->execute()) {
            echo json_encode(array("message" => "User registered successfully."));
        } else {
            echo json_encode(array("message" => "Unable to register user."));
        }
    } catch (PDOException $e) {
        echo json_encode(array("message" => "Error: " . $e->getMessage()));
    }
}
?>
