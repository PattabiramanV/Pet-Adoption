<?php
// Allow requests from any origin (CORS)
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
// echo "patano";
// Get the raw POST data
// Report all PHP errors (see changelog)
error_reporting(E_ALL);

// Display errors in output
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

require "./hostelcrud.php";

$hostel=new Hostel();


$data = json_decode(file_get_contents("php://input"), true);
// $data=array_values($data);
// print_r($data);
$method=$_SERVER['REQUEST_METHOD'];

$id=$_GET['id'];

// echo $id;


switch($method){

  case 'GET';
  // echo "pjp";

  $all_Data= $hostel->getData($id);
  // echo "pop";

  echo json_encode($all_Data);
// print_r($all_Data);
  break;

  case "POST";
  $storeData=$hostel->createData($data);
  echo json_encode($storeData);
  break;

  case "PUT";
  $updateData=$hostel->updateData($data,$id);
  echo json_encode($updateData);
  break;
  
  case "DELETE";
  $updateData=$hostel->deleteData($id);
  echo json_encode($updateData);
  break;

    }








?>
