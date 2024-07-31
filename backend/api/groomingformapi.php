<?php
require '../config/config.php';


$user_id = authenticate();



if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (empty($_POST['name']) || empty($_POST['contact']) || empty($_POST['email']) || empty($_POST['petType']) || empty($_POST['petGender']) || empty($_POST['petAge']) ) {
        echo json_encode(array("message" => "Please fill all the fields and upload an image."));
        die();
    }

    // Extract data and sanitize
    $username = htmlspecialchars(strip_tags($_POST['name']));
    $userContact = filter_var($_POST['contact'], FILTER_SANITIZE_NUMBER_INT);
    $userContact = filter_var($userContact, FILTER_VALIDATE_INT);
    $email = filter_var(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL), FILTER_VALIDATE_EMAIL);
    $petType = htmlspecialchars(strip_tags($_POST['petType']));
    $petGender = htmlspecialchars(strip_tags($_POST['petGender']));
    $petAge = filter_var($_POST['petAge'], FILTER_VALIDATE_INT, ["options" => ["min_range" => 0]]);
    $city = htmlspecialchars(strip_tags($_POST['city']));
    $needForYou = htmlspecialchars(strip_tags($_POST['needForPet']));

    // Image handling
    $imagePath = null;
    // if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
    //     $fileTmpPath = $_FILES['image']['tmp_name'];
    //     $fileName = $_FILES['image']['name'];
    //     // $uploadFileDir = 'uploads/';
    //     // $dest_path = $uploadFileDir . $fileName;

    //     if (move_uploaded_file($fileTmpPath, $dest_path)) {
    //         $imagePath = $dest_path;
    //     } else {
    //         echo json_encode(array("message" => "There was an error uploading the file."));
    //         die();
    //     }
    // } else {
    //     echo json_encode(array("message" => "Image upload error."));
    //     die();
    // }

    // Prepare SQL query
    $query = "INSERT INTO pet_grooming_users (name, phone, email, pet_type, pet_gender, pet_age, city, what_you_need_for_your_pet, user_id) 
              VALUES (:username, :userContact, :email, :petType, :petGender, :petAge, :city, :needForYou, :user_id)";

    $stmt = $conn->prepare($query);

    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':userContact', $userContact);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':petType', $petType);
    $stmt->bindParam(':petGender', $petGender);
    $stmt->bindParam(':petAge', $petAge);
    $stmt->bindParam(':city', $city);
    $stmt->bindParam(':needForYou', $needForYou);
    // $stmt->bindParam(':img', $imagePath);
    $stmt->bindParam(':user_id', $user_id);

    if ($stmt->execute()) {
        echo json_encode(array("message" => "User registered successfully."));
    } else {
        echo json_encode(array("message" => "Unable to register user."));
    }
}
?>
