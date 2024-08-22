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
        SELECT 
users.username,
users.avatar,
users.city,
users.state,
users.phone,
pet_hostels.name,
pet_hostels.price_per_day,
hostel_bookings.craeted_at,
hostel_bookings.status,
hostel_bookings.id
   
  FROM hostel_bookings
        JOIN pet_hostels ON pet_hostels.id = hostel_bookings.hos_id
        JOIN users ON users.id = hostel_bookings.user_id
        WHERE pet_hostels.user_id = :user_id ORDER BY hostel_bookings.craeted_at asc;
        ";

        // Define parameters for binding
        $params = [':user_id' => $user_id];
        $hostelBookUserData = $hostel->getData($query, $params);
        echo json_encode($hostelBookUserData);
    }

   else if ($_GET['endpoint'] == 'normal_user') {
        $query = "
        SELECT 
    pet_hostels.photos ,
    pet_hostels.name ,
    pet_hostels.address ,
    pet_hostels.contact ,
    pet_hostels.price_per_day ,
    hostel_bookings.craeted_at,
    hostel_bookings.status,
    hostel_bookings.id  ,
    hostel_bookings.checkin_date   
FROM 
    pet_hostels 
JOIN 
    hostel_bookings 
ON 
    pet_hostels.id = hostel_bookings.hos_id 
WHERE 
    hostel_bookings.user_id = :user_id;

        ";

        // Define parameters for binding
        $params = [':user_id' => $user_id];
        $hostelBookUserData = $hostel->getData($query, $params);
        echo json_encode($hostelBookUserData);
        
    }

    
}