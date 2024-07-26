<?php  

require '../config/config.php';
require "./hostelcrud.php";


$user_id = authenticate();

$hostel = new Hostel();

$data = json_decode(file_get_contents("php://input"), true);

$method = $_SERVER['REQUEST_METHOD'];
if ($method == 'GET') {
    if ($_GET['endpoint'] == 'hostel_user') {
        $query = "
        SELECT *
        FROM hostel_bookings
        JOIN pet_hostels ON pet_hostels.id = hostel_bookings.hos_id
        JOIN users ON users.id = hostel_bookings.user_id
        WHERE pet_hostels.user_id = :user_id;
        ";

        // Define parameters for binding
        $params = [':user_id' => $user_id];
        $hostelBookUserData = $hostel->getData($query, $params);
        echo json_encode($hostelBookUserData);
    }

   else if ($_GET['endpoint'] == 'normal_user') {
        $query = "
        SELECT * FROM pet_hostels JOIN hostel_bookings on pet_hostels.id=hostel_bookings.hos_id 
        WHERE hostel_bookings.user_id=:user_id;

        ";

        // Define parameters for binding
        $params = [':user_id' => $user_id];
        $hostelBookUserData = $hostel->getData($query, $params);
        echo json_encode($hostelBookUserData);
        
    }

    
}