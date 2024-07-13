<?php
// Allow requests from any origin (CORS)
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
echo "patano";
// Get the raw POST data
// require "../controller/hostelcrud.php";

// $hostel=new Hostel();


// $data = json_decode(file_get_contents("php://input"), true);
// print_r($data);
// $method=($_SERVER['REQUEST_METHOD']);
// $data=['pattabi','pattabi@gamil.com','123'];
// switch($method){

//   case 'POST';
//    echo $hostel->createData($data);


//     }

// print_r($_SERVER['REQUEST_METHOD']);


// if ($data && isset($data['request']) && $data['request'] === 'get_name') {
//     echo json_encode(["name" => "pattabi"]);
// } else {
//     echo json_encode(["error" => "Invalid request"]);
// }


?>
