<?php
// require '../config/config.php'; // Include your database connection details

// if ($_SERVER['REQUEST_METHOD'] == 'POST') {
//     $id = $_POST['id'];
//     $name = $_POST['name'];
//     $education = $_POST['education'];
//     $have_a_clinic = $_POST['have_a_clinic'];
//     $specialist = $_POST['specialist'];
//     $available_timing_from = $_POST['available_timing_from'];
//     $available_timing_to = $_POST['available_timing_to'];
//     $phone = $_POST['phone'];
//     $home_visiting_available = $_POST['home_visiting_available'];
//     $experience = $_POST['experience'];
//     $address = $_POST['address'];
//     $description = $_POST['description'];
//     $email = $_POST['email'];
//     $doctor_registerno = $_POST['doctor_registerno'];
//     $state = $_POST['state'];
//     $city = $_POST['city'];

//     // Handle profile image upload
//     if (!empty($_FILES['profile_img']['name'])) {
//         $target_dir = "uploads/";
//         $profile_img = $target_dir . basename($_FILES["profile_img"]["name"]);
//         move_uploaded_file($_FILES["profile_img"]["tmp_name"], $profile_img);
//     } else {
//         $profile_img = $_POST['current_profile_img'];
//     }

//     // Update query
//     $sql = "UPDATE vetneries SET 
//                 name = ?, education = ?, have_a_clinic = ?, specialist = ?, available_timing_from = ?, available_timing_to = ?, 
//                 phone = ?, home_visiting_available = ?, experience = ?, address = ?, description = ?, email = ?, 
//                 doctor_registerno = ?, state = ?, city = ?, profile_img = ?
//             WHERE id = ?";
    
//     $stmt = $conn->prepare($sql);
//     $stmt->bind_param('ssssssssssssssssi', $name, $education, $have_a_clinic, $specialist, $available_timing_from, $available_timing_to, 
//                       $phone, $home_visiting_available, $experience, $address, $description, $email, 
//                       $doctor_registerno, $state, $city, $profile_img, $id);
    
//     if ($stmt->execute()) {
//         echo "Record updated successfully";
//     } else {
//         echo "Error updating record: " . $conn->error;
//     }

//     $stmt->close();
//     $conn->close();
// }


?>
