<?php

require '../config/config.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

use Dotenv\Dotenv;

require '../vendor/autoload.php';

$dotenv = Dotenv::createImmutable(__DIR__ . '/../..');
$dotenv->load();

// User authentication


// Start time and end time get method logic ?

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Retrieve doctor ID and date from query parameters
        $doctorId = isset($_GET['id']) ? intval($_GET['id']) : 0;
        $appointmentDate = isset($_GET['date']) ? $_GET['date'] : '';
    
        if ($doctorId <= 0 || empty($appointmentDate)) {
            echo json_encode(array("message" => "Invalid input."));
            exit;
        }
    
        // Prepare and execute the query to get availability
        $query = "SELECT available_timing_from AS start_time, available_timing_to AS end_time FROM vetneries WHERE id = :doctorId";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':doctorId', $doctorId, PDO::PARAM_INT);
        $stmt->execute();
        $availability = $stmt->fetch(PDO::FETCH_ASSOC);
    
        if ($availability) {
            $slots = generateSlots($availability['start_time'], $availability['end_time']);
            echo json_encode(array('slots' => $slots));
        } else {
            echo json_encode(array("message" => "No availability found for the specified doctor."));
        }
    }
    
    // Function to generate time slots
    function generateSlots($start_time, $end_time) {
        $slots = [];
        $start = new DateTime($start_time);
        $end = new DateTime($end_time);
        $interval = new DateInterval('PT30M'); // 30 minutes slots
    
        while ($start < $end) {
            $slotStart = $start->format('H:i');
            $start->add($interval);
            $slotEnd = $start->format('H:i');
            $slots[] = $slotStart . ' - ' . $slotEnd;
        }
    
        return $slots;
    }

    $user_id = authenticate();



// post method logic retriveing the data


    
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // print_r($_POST);
    // exit;
    // Check if all required fields are filled
    if (empty($_POST['name']) || empty($_POST['contact']) || empty($_POST['email']) 
    || empty($_POST['petType']) || empty($_POST['petGender']) || empty($_POST['petAge']) 
    || empty($_POST['selectdoctorname']) || empty($_POST['doctorAddress']) || empty($_FILES['petimage'])
    || empty($_POST['city']) || empty($_POST['needForPet']) || empty($_POST['appointmentDate'])) {
        echo json_encode(array("message" => "Please fill all the fields and upload an image.","status" => "error"));
        
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
    $service = htmlspecialchars(strip_tags($_POST['service']));
    $appoinmentDate = htmlspecialchars(strip_tags($_POST['appointmentDate']));
    $newSlots=$_POST['selectedSlots'];
    // print_r($slots);
 
    // Retrieve doctor_id based on doctor_name
    $doctorQuery = "SELECT id, email,phone FROM vetneries WHERE name = :doctorName";
    $stmt = $conn->prepare($doctorQuery);
    $stmt->bindParam(':doctorName', $doctorName);
    $stmt->execute();
    $doctor = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($doctor) {
        $doctorID = $doctor['id'];
        $doctorEmail = $doctor['email'];
        $doctorcontact = $doctor['phone'];
    } else {
        echo json_encode(array("message" => "Invalid doctor name.","status" => "error"));
        die();
    }

    // Image handling
    $imagePath = null;

    if (isset($_FILES['petimage']) && $_FILES['petimage']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['petimage']['tmp_name'];
        $fileName = basename($_FILES['petimage']['name']);
        $uploadFileDir ='../docterprofile/groomingpetspic/';
        $dest_path = $uploadFileDir . $fileName;
        // Validate image type
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif','image/jpg','image/wepb'];
        if (!in_array($_FILES['petimage']['type'], $allowedTypes)) {
            echo json_encode(["message" => "Invalid image type. Only JPEG, PNG, and GIF are allowed.","status" => "error"]);
            die();
        }

        // Check if the directory exists
        if (!is_dir($uploadFileDir)) {
            if (!mkdir($uploadFileDir, 0755, true)) {
                echo json_encode(["message" => "Failed to create upload directory.","status" => "error"]);
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
        echo json_encode(["message" => "Image upload failed. No file uploaded or upload error."," status"=> "error"]);
        die();
    }

    // Prepare SQL query
    $query = "INSERT INTO pet_grooming_users (name, phone, email, pet_type, pet_gender, pet_age, city, what_you_need_for_your_pet, user_id, doctor_id, doctor_address, pet_img ,service_type,appoinment_date) 
              VALUES (:username, :userContact, :email, :petType, :petGender, :petAge, :city, :needForYou, :user_id, :doctorID, :doctorAddress, :imagePath ,:sevice, :appointmentDate)";

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
    $stmt->bindParam(':sevice', $service);
    $stmt->bindParam(':appointmentDate', $appoinmentDate);
    try {
        if ($stmt->execute()) {

            // echo json_encode( array(" message" => "User registered successfully.",'status'=>'sucess'));
            global $conn;
          
     

             $query = "INSERT INTO slot (doctor_id, booking_date, bookingslot,user_id) VALUES (:doctorId, :date, :slots,:user_id)";
             $stmt = $conn->prepare($query);
             // Loop through each slot in the $newSlots array
          // Ensure $newSlots is an array
          if (is_string($newSlots)) {
            // Remove square brackets and double quotes from the string
            $newSlots = str_replace(['[', ']', '"'], '', $newSlots);
        
            // Convert the cleaned string into an array
            $newSlots = explode(',', $newSlots);
        }
        
        // print_r($newSlots);
        // exit;
        
        for ($i = 0; $i < count($newSlots); $i++) {
            $slot = trim($newSlots[$i]);
            $stmt->bindParam(':doctorId', $doctorID, PDO::PARAM_INT);
            $stmt->bindParam(':date', $appoinmentDate, PDO::PARAM_STR);
            $stmt->bindParam(':slots',  $slot, PDO::PARAM_STR);  // Bind the current slot value
            $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);  // Assuming user_id
            
            $stmt->execute();
        }
      


            //  echo json_encode(array("success" => true, "message" => "New record created successfully."));
 
            emailSendFun($email, $doctorName, $doctorEmail, $username, $doctorAddress, $petType, $petGender, $petAge, $city, $service, $userContact, $doctorcontact,$appoinmentDate);

        } else {
            echo json_encode(array("message" => "Unable to register user.","status"=>' error'));
           
        }
    } catch (PDOException $e) {
        echo json_encode(array("message" => "Error: " . $e->getMessage()));
    }


    
}

// email sending.......
function emailSendFun($toUserEmail, $doctorName, $doctorEmail, $username, $doctorAddress, $petType, $petGender, $petAge, $city, $service, $userContact, $doctorcontact,$appoinmentDate) {
    $mail = new PHPMailer(true);

    try {
        // SMTP server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'furryfriens123@gmail.com';
        $mail->Password = 'rtcgadrtpxgbepdd';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Set the sender's address
        $mail->setFrom('furryfriens123@gmail.com', 'Furry Friends');
        $header = file_get_contents('../mailtemplate/header.html');
        $footer = file_get_contents('../mailtemplate/footer.html');
        // Email content for the user
        $userBody = $header . "
        <div style='padding: 24px; font-family: Arial, sans-serif; background-color: #f9f9f9;'>
            <div style='padding: 16px; background-color: #4a90e2; color: white; text-align: center; border-radius: 8px 8px 0 0;'>
                <h1 style='font-size: 24px; font-weight: bold;'>New Booking confirmed</h1>
            </div>
            
            <div style='padding: 24px; background-color: white; border-radius: 0 0 8px 8px;'>
                <p>Dear {$username},</p>
                <p>You booking doctor was<strong>{$doctorName}</strong>.</p>
                <div style='margin-top: 24px;'>
                    <table style='width: 100%; border-collapse: collapse;'>
                        <thead>
                            <tr>
                                <th style='background-color: #f5f5f5; text-align: left; padding: 16px; border-bottom: 1px solid #e0e0e0;'>Doctor Info</th>
                                <th style='background-color: #f5f5f5; text-align: left; padding: 16px; border-bottom: 1px solid #e0e0e0;'>User Info</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style='padding: 16px;'>
                                    <div style='margin-bottom: 16px;'>
                                        <p><strong>Name:</strong> {$doctorName}</p>
                                        <p><strong>Email:</strong> {$doctorEmail}</p>
                                        <p><strong>Phone:</strong> {$doctorcontact}</p>
                                        <p><strong>Address:</strong> {$doctorAddress}</p>
                                    </div>
                                </td>
                                <td style='padding: 16px;'>
                                    <div style='display: grid; gap: 16px;'>                                                     
                                        <p><strong>Appointment Dates:</strong>{$appoinmentDate}</p>
                                        <p><strong>Pet Type:</strong> {$petType}</p>
                                        <p><strong>Pet Gender:</strong> {$petGender}</p>
                                        <p><strong>Pet Age:</strong> {$petAge} years</p>                                        
                                        <p><strong>What the client needs for their pet:</strong> {$service}</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p style='margin-top: 16px;'>Please prepare for their arrival.</p>
                <p>Thank you!</p>
            </div>
        </div>" . $footer;
    
    

        // Email content for the doctor
        $doctorBody = $header.'
        

           <div style="padding: 16px; background-color: #4a90e2; color: white; text-align: center; border-radius: 8px 8px 0 0;">
                <h1 style="font-size: 24px; font-weight: bold;">Grooming Service Booking Confirmation</h1>
            </div>
           
          doctorID      <div class="content">
                    <p>Dear Dr. ' . htmlspecialchars($doctorName) . ',</p>
                    <p>You have a new grooming booking request.</p>
                    <p>Here are the details:</p>
                    <ul>
                        <p><strong>Client Name:</strong> ' . htmlspecialchars($username) . '</p>
                        <p><strong>Client Email:</strong> ' . htmlspecialchars($toUserEmail) . '</p>
                        <p><strong>Client Phone:</strong> ' . htmlspecialchars($userContact) . '</p>
                        <p><strong>appoinmentDate:</strong> ' . htmlspecialchars($appoinmentDate) . '</p>
                        <p><strong>Pet Type:</strong> ' . htmlspecialchars($petType) . '</p>
                        <p><strong>Pet Gender:</strong> ' . htmlspecialchars($petGender) . '</p>
                        <p><strong>Pet Age:</strong> ' . htmlspecialchars($petAge) . ' years</p>
                        <p><strong>City:</strong> ' . htmlspecialchars($city) . '</p>
                        <p><strong>Service Type:</strong> ' . htmlspecialchars($service) . '</p>
                    </ul>
                    <p>Please contact the client to confirm the booking and arrange further details.</p>
                </div>
              
            </div>
        
        '.$footer;

        // Send the email to the user
        $mail->addAddress($toUserEmail, htmlspecialchars($username));
        $mail->isHTML(true);
        $mail->Subject = 'Grooming Service Booking Confirmation';
        $mail->Body = $userBody;
        $mail->send();

        // Reset the mailer and set email body for the doctor
        $mail->clearAddresses();
        $mail->addAddress($doctorEmail, htmlspecialchars($doctorName));
        $mail->Subject = 'New Pet Grooming Booking';
        $mail->Body = $doctorBody;

        // Send the email to the doctor
        $mail->send();
        echo json_encode( array(" message" => "User registered successfully.",'status'=>'sucess'));

    
        
    } catch (Exception $e) {
        echo json_encode(array("message" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"));
    }


    
}

?>
