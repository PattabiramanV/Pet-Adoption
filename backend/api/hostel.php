<?php



require '../config/config.php';
require "./hostelcrud.php";

$user_id = authenticate();

$hostel = new Hostel();

$data = json_decode(file_get_contents("php://input"), true);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
  case 'GET':
    if (isset($_GET['hosid'])) {
      $userId = $_GET['hosid'];
      $data = $hostel->getData( $query,$userId);
      echo json_encode($data);
    } else {
      $query = "SELECT * FROM pet_hostels";
      $all_Data = $hostel->getData( $query);
      echo json_encode($all_Data);
    }
    break;

  case 'POST':
    if (isset($_GET['hosid'])) {
      $hosId = $_GET['hosid'];
      $bookHostel = $hostel->bookHostel($hosId, $data, $user_id);
      echo json_encode($bookHostel);
       // getDataForEmail
    $all_Data = $hostel->getDataForEmail($hosId);

   

      emailSendFun( $all_Data); // Ensure this function is defined
    } else {
      $storeData = $hostel->createData($data);
      echo json_encode($storeData);
    }
    break;

  case 'PUT':
    if (isset($_GET['id'])) {
      $id = $_GET['id'];
      $updateData = $hostel->updateData($data, $id);
      echo json_encode($updateData);
    } else {
      echo json_encode(['error' => 'ID parameter is missing']);
    }
    break;

  case 'DELETE':
    if (isset($_GET['id'])) {
      $id = $_GET['id'];
      $deleteData = $hostel->deleteData($id);
      echo json_encode($deleteData);
    } else {
      echo json_encode(['error' => 'ID parameter is missing']);
    }
    break;

  default:
    echo json_encode(['error' => 'Invalid request method']);
    break;
}







use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';







   function emailSendFun($data){

   
 
   
        // $data=
        $mail = new PHPMailer(true);

        try {

          $toUser=$data['email'];
            //Server settings
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com'; // Set the SMTP server to send through
            $mail->SMTPAuth = true;
            $mail->Username = 'furryfriens123@gmail.com'; // SMTP username
            $mail->Password = 'rtcgadrtpxgbepdd'; // SMTP password (replace with the actual password)
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587; // TCP port to connect to
    
            // Set the sender's address
            $mail->setFrom('furryfriens123@gmail.com', 'Furry friends');
    
            // Add a recipient
            $mail->addAddress("$toUser", 'Pattabi');
    
            // Email content
            $mail->isHTML(true);
            $mail->Subject = 'Hostel Booking Confirmation';
            $mail->Body = "
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        color: #333;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        padding: 10px 0;
                        border-bottom: 2px solid #e4e4e4;
                    }
                    .header h1 {
                        margin: 0;
                        color: #4a90e2;
                    }
                    .content {
                        padding: 20px;
                    }
                    .footer {
                        text-align: center;
                        padding: 10px;
                        border-top: 2px solid #e4e4e4;
                        font-size: 14px;
                        color: #888;
                    }
                    .button {
                        display: inline-block;
                        padding: 10px 20px;
                        margin-top: 20px;
                        background-color: #4a90e2;
                        color: #fff;
                        text-decoration: none;
                        border-radius: 5px;
                    }
                    .button:hover {
                        background-color: #357abd;
                    }
                </style>
            </head>
            <body>
                <div class='container'>
                    <div class='header'>
                        <h1>Hostel Booking Confirmation</h1>
                    </div>
                    <div class='content'>
                        <p>Dear Pattabi,</p>
                        <p>Your booking at <strong>Doggy yogi</strong> has been confirmed.</p>
                        <p>Thank you for choosing us!</p>
                        <a href='#' class='button'>View Your Booking</a>
                    </div>
                    <div class='footer'>
                        <p>&copy; 2024 Furry Friends. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            ";
            
            $mail->AltBody = "Dear Pattabi,\n\nYour booking at Doggy yogi has been confirmed.\n\nThank you for choosing us!\n\nFor more details, please visit our website.";
            
            // // Send the email
            $mail->send();
            
        } catch (Exception $e) {
            echo json_encode(['message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}", 'trace' => $e->getTraceAsString()]);
       


     }

    }






    // // Allow from any origin (CORS)

// // header("Access-Control-Allow-Headers:  application/json");


// // Handle preflight request (OPTIONS)
// // if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
// //     http_response_code(200); // Set the status to 200 OK
// //     exit();
// // }


// if ($_SERVER['REQUEST_METHOD'] === 'POST') {




//     $data = json_decode(file_get_contents('php://input'), true);


//     $userEmail = $data['email']; // Recipient's email
//     $userName = $data['name'];   // Recipient's name
//     $hostelName = $data['hostel']; // Hostel name

    


// } else {
//     echo json_encode(['message' => 'Invalid request method']);
// }



?>









