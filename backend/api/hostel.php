<?php



// require '../config/config.php';
// require "./hostelcrud.php";

// $user_id = authenticate();

// $hostel = new Hostel();

// $data = json_decode(file_get_contents("php://input"), true);

// $method = $_SERVER['REQUEST_METHOD'];

// switch ($method) {
//   case 'GET':
//     if (isset($_GET['hosid'])) {
//       $userId = $_GET['hosid'];
//       $data = $hostel->getData( $query,$userId);
//       echo json_encode($data);
//     } else {
//       $query = "SELECT * FROM pet_hostels";
//       $all_Data = $hostel->getData( $query);
//       echo json_encode($all_Data);
//     }
//     break;

//   case 'POST':
//     if (isset($_GET['hosid'])) {
//       $hosId = $_GET['hosid'];
//       $bookHostel = $hostel->bookHostel($hosId, $data, $user_id);
//       echo json_encode($bookHostel);
//        // getDataForEmail
//     $all_Data = $hostel->getDataForEmail($hosId);


//       emailSendFun( $all_Data); // Ensure this function is defined
//     } else {
//       $storeData = $hostel->createData($data);
//       echo json_encode($storeData);
//     }
//     break;

//   case 'PUT':
//     if (isset($_GET['id'])) {
//       $id = $_GET['id'];
//       $updateData = $hostel->updateData($data, $id);
//       echo json_encode($updateData);
//     } else {
//       echo json_encode(['error' => 'ID parameter is missing']);
//     }
//     break;

//   case 'DELETE':
//     if (isset($_GET['id'])) {
//       $id = $_GET['id'];
//       $deleteData = $hostel->deleteData($id);
//       echo json_encode($deleteData);
//     } else {
//       echo json_encode(['error' => 'ID parameter is missing']);
//     }
//     break;

//   default:
//     echo json_encode(['error' => 'Invalid request method']);
//     break;
// }







// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;

// require '../vendor/autoload.php';







//    function emailSendFun($data){

   
 
   
//         // $data=
//         $mail = new PHPMailer(true);

//         try {

//           $toUser=$data['email'];
//             //Server settings
//             $mail->isSMTP();
//             $mail->Host = 'smtp.gmail.com'; // Set the SMTP server to send through
//             $mail->SMTPAuth = true;
//             $mail->Username = 'furryfriens123@gmail.com'; // SMTP username
//             $mail->Password = 'rtcgadrtpxgbepdd'; // SMTP password (replace with the actual password)
//             $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
//             $mail->Port = 587; // TCP port to connect to
    
//             // Set the sender's address
//             $mail->setFrom('furryfriens123@gmail.com', 'Furry friends');
    
//             // Add a recipient
//             $mail->addAddress("$toUser", 'Pattabi');
    

//             $header = file_get_contents('../mailtemplate/header.html');
//             $footer = file_get_contents('../mailtemplate/footer.html');
            
//             // Email content
//             $mail->isHTML(true);
//             $mail->Subject = 'Hostel Booking Confirmation';
//             $mail->Body = $header . '
//                 <div style="padding: 20px; border: 1px solid #ddd; border-radius: 5px; max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #f9f9f9;">
//                     <h1 style="color: #333; font-size: 24px; text-align: center;">Hostel Booking Confirmation</h1>
//                     <p style="color: #555; font-size: 16px;">Dear Pattabi,</p>
//                     <p style="color: #555; font-size: 16px;">Your booking at <strong style="color: #000;">Doggy yogi</strong> has been confirmed.</p>
//                     <p style="color: #555; font-size: 16px;">Thank you for choosing us!</p>
//                 </div>' . $footer;
            
            
//             $mail->AltBody = "Dear Pattabi,\n\nYour booking at Doggy yogi has been confirmed.\n\nThank you for choosing us!\n\nFor more details, please visit our website.";
            
//             // // Send the email
//             $mail->send();
            
//         } catch (Exception $e) {
//             echo json_encode(['message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}", 'trace' => $e->getTraceAsString()]);
       

    // $mail->AltBody = "Dear Pattabi,\n\nYour booking at Doggy yogi has been confirmed.\n\nThank you for choosing us!\n\nFor more details, please visit our website.";

//      }

//     }






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




require '../config/config.php';
require './hostelcrud.php';
require '../vendor/autoload.php'; // Ensure this is correct based on your project's structure

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;  

// Load the .env file
$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$user_id = authenticate();

$hostel = new Hostel();

$data = json_decode(file_get_contents("php://input"), true);
$data['userId']=$user_id;
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['hosid'])) {

            $userId = $_GET['hosid'];
            $query = "SELECT 
    users.id AS user_id,
    users.username AS user_name,
    users.phone AS user_phone,
    users.avatar,
    hostel_ratings.rating AS user_rating,
    hostel_ratings.comments,
    hostel_ratings.	craeted_at,
    AVG(hostel_ratings.rating) OVER (PARTITION BY hostel_ratings.hos_id) AS average_rating,
    pet_hostels.id AS hostel_id,
    pet_hostels.name AS hostel_name,
    pet_hostels.address AS hostel_address,
    pet_hostels.price_per_day,
    pet_hostels.description,
    pet_hostels.facilities,
    pet_hostels.contact,
    pet_hostels.photos,
    pet_hostels.available_time
FROM 
    pet_hostels
LEFT JOIN 
    hostel_ratings ON pet_hostels.id = hostel_ratings.hos_id
LEFT JOIN 
    users ON users.id = hostel_ratings.user_id
WHERE 
    pet_hostels.id = :hosid";

            $params=[':hosid'=>$_GET['hosid']];
            $data = $hostel->getData($query,  $params);

            $sql = "SELECT * FROM pet_hostels";
            $all_Data = $hostel->getData($sql);
           
            // echo json_encode($all_Data);
            echo json_encode([
                'status' => 'success',
                'message' => 'Operation completed successfully.',
                'reviewData' => $data,
                'hostels' =>  $all_Data,
                'user_id' =>  $user_id

            ]);
            
        } else {
            $query = "SELECT * FROM pet_hostels";
            $all_Data = $hostel->getData($query);
            echo json_encode($all_Data);
        }
        
        break;

    case 'POST':
        if (isset($_GET['hosid'])) {
            // echo json_encode($data);

            $hosId = $_GET['hosid'];
            $bookHostel = $hostel->bookHostel($hosId, $data, $user_id);
            echo json_encode($bookHostel);

            // Get data for email
            $all_Data = $hostel->getDataForEmail($hosId);
            $all_Data['price']=$data['price'];
            $all_Data['days']=$data['days'];
            $all_Data['dates']=$data['checkin'].' to '.$data['checkout'];


            emailSendFun($all_Data);
            
        }  else {
            
            // print_r($data);
            // exit;
            $sql = "INSERT INTO hostel_ratings (
               	hos_id , user_id,rating,comments
            ) VALUES (:hostel_id ,:userId,:rating,:review)";
    
            $storeData = $hostel->createData($data,$sql);
            echo json_encode($storeData);
            
        }
        break;

    case 'PUT':
        if(isset($_GET['id']) && isset($_GET['value'])){
            $sql = "UPDATE hostel_bookings SET status = :status WHERE id = :id";
            $params = [':status' => $_GET['value'], ':id' => $_GET['id']];
            $updateUserType = $hostel->updateData($sql, $params);
        
            if ($updateUserType) {
                echo "Update successful";
            } else {
                echo "Update failed";
            }
        }
        
       elseif (isset($_GET['id'])) {
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



function emailSendFun($data) {

    // print_r($data);
    // exit;
    
    global $hostel;
    global $user_id;
    $query = "SELECT * FROM users WHERE id = :id";
    $params = [':id' => $user_id];

    $userData = $hostel->getData($query, $params);
    // echo json_encode($userData);
//    print_r($userData);
    // Email configurations
    $emailConfig = [
        'Host' => $_ENV['SMTP_HOST'],
        'SMTPAuth' => $_ENV['SMTP_AUTH'] === 'true',
        'Username' => $_ENV['SMTP_USERNAME'],
        'Password' => $_ENV['SMTP_PASSWORD'],
        'SMTPSecure' => PHPMailer::ENCRYPTION_STARTTLS,
        'Port' => $_ENV['SMTP_PORT'],
        'FromAddress' => $_ENV['SMTP_FROM_ADDRESS'],
        'FromName' => $_ENV['SMTP_FROM_NAME'],
    ];

    // Load email templates
    $header = file_get_contents('../mailtemplate/header.html');
    $footer = file_get_contents('../mailtemplate/footer.html');

    // Example variables
    $hostelName = $data['name'];
    $bookingUserEmail = $userData[0]['email'];
    $bookingUsername = $userData[0]['username'];
    $bookingUserContact = $userData[0]['phone'];
    $totalPrice = $data['price']; // assuming contact field exists
    $totaldays = $data['days']; // assuming contact field exists
    $bookingDates=$data['dates'];

    
    // Recipients and their respective email bodies
    $recipients = [
        // Email to the hostel owner
        [
            'email' => $data['email'],  // Owner's email
            'name' => $data['username'], // Owner's name
            'body' => $header . "
                <div style=\"padding: 20px; border-radius: 5px; max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;\">
                    <h1 style=\"color: #333; font-size: 24px; text-align: center;\">New Booking Notification</h1>
                    <p style=\"color: #555; font-size: 16px;\">Dear {$data['username']},</p>
                    <p style=\"color: #555; font-size: 16px;\">A new booking has been made at <strong style=\"color: #000;\">{$hostelName}</strong>.</p>
                    <p style=\"color: #555; font-size: 16px;\">Booking details:</p>
                    <ul style=\"color: #555; font-size: 16px;\">
                        <li><strong>Name:</strong> {$bookingUsername}</li>
                        <li><strong>Email:</strong> $bookingUserEmail</li>
                        <li><strong>Phone:</strong> {$bookingUserContact}</li>
                        <li><strong>Dates:</strong> {$bookingDates}</li>
                        <li><strong>totaldays:</strong> {$totaldays}</li>
                        <li><strong>totalPrice:</strong> {$totalPrice}</li>

                        

             
                    </ul>
                    <p style=\"color: #555; font-size: 16px;\">Please prepare for their arrival.</p>
                    <p style=\"color: #555; font-size: 16px;\">Thank you!</p>
                </div>" . $footer,
            'altBody' => "Dear {$data['username']},\n\nA new booking has been made at {$hostelName}.\n\nBooking details:\nName: {$bookingUsername}\nEmail: {$bookingUserEmail}\nContact: {$bookingUserContact}\n\nPlease prepare for their arrival.\n\nThank you!"
        ],
        // Email to the booking user
        [
            'email' => $bookingUserEmail,
            'name' => $bookingUsername,
            'body' => $header . "
                <div style='padding: 24px; font-family: Arial, sans-serif; background-color: #f9f9f9;'>
                    <div style='padding: 16px; background-color: #4a90e2; color: white; text-align: center; border-radius: 8px 8px 0 0;'>
                        <h1 style='font-size: 24px; font-weight: bold;'>New Booking Notification</h1>
                    </div>
                    <div style='padding: 24px; background-color: white; border-radius: 0 0 8px 8px;'>
                        <p>Dear Pattabi,</p>
                        <p>A new booking has been made at <strong>Pamela Bates</strong>.</p>
                        
                        <div style='margin-top: 24px;'>
                            <table style='width: 100%; border-collapse: collapse;'>
                                <thead>
                                    <tr>
                                        <th style='background-color: #f5f5f5; text-align: left; padding: 16px; border-bottom: 1px solid #e0e0e0;'>Hostel Info</th>
                                        <th style='background-color: #f5f5f5; text-align: left; padding: 16px; border-bottom: 1px solid #e0e0e0;'>User Info</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style='padding: 16px;'>
                                            <div style='margin-bottom: 16px;'>
                                                <p><strong>Name:</strong> {$hostelName}</p>
                                                <p><strong>Email:</strong> {$bookingUserEmail}</p>
                                                <p><strong>Phone:</strong> {$data['contact']}</p>
                                                <p><strong>Address:</strong>{$data['address']} </p>
                                                
                                            </div>
                                        </td>
                                        
                                        <td style='padding: 16px;'>
                                            <div style='display: grid; gap: 16px;'>

                                                 <p><strong>Dates:</strong> {$bookingDates}</p>
                                                <p><strong>Total Days:</strong> {$totaldays}</p>
                                                <p><strong>Total Price:</strong> {$totalPrice}</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <p style='margin-top: 16px;'>Please prepare for their arrival.</p>
                        <p>Thank you!</p>
                    </div>
                </div>" . $footer,
            'altBody' => "Dear {$bookingUsername},\n\nYour booking at {$hostelName} has been confirmed.\n\nThank you for choosing us!\n\nFor more details, please visit our website."
        ]
        
    ];

    foreach ($recipients as $recipient) {
        $mail = new PHPMailer(true);

        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host = $emailConfig['Host'];
            $mail->SMTPAuth = $emailConfig['SMTPAuth'];
            $mail->Username = $emailConfig['Username'];
            $mail->Password = $emailConfig['Password'];
            $mail->SMTPSecure = $emailConfig['SMTPSecure'];
            $mail->Port = $emailConfig['Port'];

            // Recipients
            $mail->setFrom($emailConfig['FromAddress'], $emailConfig['FromName']);
            $mail->addAddress($recipient['email'], $recipient['name']);

            // Email content
            $mail->isHTML(true);
            $mail->Subject = 'Hostel Booking Confirmation';
            $mail->Body = $recipient['body'];
            $mail->AltBody = $recipient['altBody'];

            // Send the email
            $mail->send();
        } catch (Exception $e) {
            echo json_encode(['message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}", 'trace' => $e->getTraceAsString()]);
        }
    }
}




?>









