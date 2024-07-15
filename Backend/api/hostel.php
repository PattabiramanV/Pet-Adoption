<?php
// Allow requests from any origin (CORS)
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
// echo "patano";
// Get the raw POST data
require "./hostelcrud.php";

$hostel=new Hostel();


$data = json_decode(file_get_contents("php://input"), true);
$data=array_values($data);
// print_r($data);
$method=$_SERVER['REQUEST_METHOD'];

$id=$_GET['id'];




switch($method){

  case 'GET';
  $all_Data= $hostel->getData($id);
//   echo json_decode($all_Data);
print_r($all_Data);
  break;

  case "POST";
  $storeData=$hostel->createData($data);
  echo $storeData;
  break;
  


    }








?>
