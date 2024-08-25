<?php

// Include the config file
require('../config/config.php');

$user_id=authenticate();
// echo json_encode(['id'=>10]);
// exit;
// echo $user_id;
// exit;
// // Handle CORS (optional, depending on your needs)
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type");

// header('Content-Type: application/json');

   try {
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
//         // Retrieve doctor ID from query parameters
//         $doctorId = isset($_GET['id']) ? intval($_GET['id']) : 0;
//         $date = $_GET['date'];
//         // echo $date.'  '.$doctorId;
//         // exit;

//         if ($doctorId <= 0) {
//             echo json_encode(array("message" => "Invalid doctor ID."));
//             exit;
//         }

//         // Prepare and execute the query
//         // $query = "SELECT available_timing_from AS start_time, available_timing_to AS end_time FROM vetneries WHERE id = :doctorId";

//         $query = " SELECT 
//     vetneries.name,
//     vetneries.available_timing_from AS start_time,
//     vetneries.available_timing_to AS end_time,
//     slot.booking_date,
//     slot.bookingslot
// FROM 
//     vetneries
// JOIN 
//     slot ON vetneries.id = slot.doctor_id
//      WHERE 
//     slot.booking_date =:date AND slot.doctor_id=:doctorId";

       
//         $stmt = $conn->prepare($query);
//         $stmt->bindParam(':date', $date);
//         $stmt->bindParam(':doctorId', $doctorId, PDO::PARAM_INT);

        
//         $stmt->execute();
//         $availability = $stmt->fetchall(PDO::FETCH_ASSOC);

//         // Return the availability data as JSON
//         if ($availability) {
//             echo json_encode($availability);
//         } else {
//             echo json_encode(array("message" => "No availability found for the specified doctor."));
//         }

if ($_SERVER['REQUEST_METHOD'] === 'GET') {


//     echo "pattabi";
//     exit;


    if(isset($_GET['endpoint'])){


// echo $user_id;
// exit;
        // =34;
        $query = "SELECT id FROM vetneries WHERE user_id= :doctorId ";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':doctorId', $user_id, PDO::PARAM_INT);
        $stmt->execute();
        $doctorId = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode([
            'data' => $doctorId,
            'status' => 'success',
            'message' => 'Doctor ID fetched successfully'
        ]);
        

      exit;

    }

    
    // Retrieve doctor ID from query parameters
    $doctorId = isset($_GET['id']) ? intval($_GET['id']) : 0;
    $date = isset($_GET['date']) ? $_GET['date'] : '';

    // Check if the doctor ID and date are valid
    if ($doctorId <= 0 || empty($date)) {
        echo json_encode(array("message" => "Invalid doctor ID or date."));
        exit;
    }

    // Prepare and execute the query
    $query = "SELECT 
                vetneries.name,
                vetneries.available_timing_from AS start_time,
                vetneries.available_timing_to AS end_time,
                slot.booking_date,
                slot.bookingslot
              FROM 
                vetneries
              LEFT JOIN 
                slot ON vetneries.id = slot.doctor_id AND slot.booking_date = :date
              WHERE 
                vetneries.id = :doctorId";

    $stmt = $conn->prepare($query);
    $stmt->bindParam(':date', $date, PDO::PARAM_STR);
    $stmt->bindParam(':doctorId', $doctorId, PDO::PARAM_INT);

    $stmt->execute();
    $availability = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the availability data as JSON
    if ($availability) {
        echo json_encode($availability);
    } else {
        echo json_encode(array("message" => "No availability found for the specified doctor on this date."));
    }
}






    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Get the request data
        $data = json_decode(file_get_contents('php://input'), true);
     echo json_encode($data);
    //  exit;

        if (json_last_error() !== JSON_ERROR_NONE) {
            echo json_encode(array("success" => false, "message" => "Invalid JSON input."));
            exit;
        }

        $doctorId = isset($data['doctorId']) ? intval($data['doctorId']) : 0;
        $date = isset($data['date']) ? $data['date'] : '';
        $newSlots = isset($data['slots']) ? $data['slots'] : [];

        if ($doctorId <= 0 || empty($date) || empty($newSlots)) {
            echo json_encode(array("success" => false, "message" => "Invalid input."));
            exit;
        }

        // // Fetch the existing slots for the specific doctor and date
        $query = "SELECT bookingslot FROM slot WHERE doctor_id = :doctorId AND booking_date = :date";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':doctorId', $doctorId, PDO::PARAM_INT);
        $stmt->bindParam(':date', $date, PDO::PARAM_STR);
        $stmt->execute();
        $existingRecord = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($existingRecord) {
        //     // Merge new slots with existing ones
        //     $existingSlotsArray = json_decode($existingRecord['bookingslot'], true);
        //     $mergedSlots = array_unique(array_merge($existingSlotsArray, $newSlots));
        //     sort($mergedSlots);

        //     $slotsJson = json_encode($mergedSlots);

        //     // Update the existing record in the database
            // $query = "UPDATE slot SET bookingslot = :slots WHERE doctor_id = :doctorId AND booking_date = :date";
            // $stmt = $conn->prepare($query);

         
            $query = "DELETE FROM slot WHERE doctor_id = :doctorId AND booking_date = :date";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':doctorId', $doctorId, PDO::PARAM_INT);
            $stmt->bindParam(':date', $date, PDO::PARAM_STR);
        //     $stmt->bindParam(':slots', $slotsJson, PDO::PARAM_STR);
            $stmt->execute();

            doctorSlotBooking($doctorId,$date,$user_id,$newSlots);

        //     echo json_encode(array("success" => true, "message" => "Record updated successfully."));
        } 
        else{
            doctorSlotBooking($doctorId,$date,$user_id,$newSlots);
        }
    } else {
        echo json_encode(array("success" => false, "message" => "Invalid request method."));
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("success" => false, "message" => "An error occurred.", "error" => $e->getMessage()));
}






      function  doctorSlotBooking($doctorId,$date,$user_id,$newSlots){

    global $conn;
           // echo json_encode(array("success" => true, "message" => "Record updated successfully."));
            // Insert a new record
            // $slotsJson = json_encode($newSlots);
// exit;
          echo "patt";
    
            $query = "INSERT INTO slot (doctor_id, booking_date, bookingslot,user_id) VALUES (:doctorId, :date, :slots,:user_id)";
            $stmt = $conn->prepare($query);
            // Loop through each slot in the $newSlots array
   foreach ($newSlots as $slot) {
    $stmt->bindParam(':doctorId', $doctorId, PDO::PARAM_INT);
    $stmt->bindParam(':date', $date, PDO::PARAM_STR);
    $stmt->bindParam(':slots', $slot, PDO::PARAM_STR);
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_STR);
    
    // Execute the query for each slot
    $stmt->execute();
}
            // $stmt->bindParam(':doctorId', $doctorId, PDO::PARAM_INT);
            // $stmt->bindParam(':date', $date, PDO::PARAM_STR);
            // $stmt->bindParam(':slots',   $newSlots, PDO::PARAM_STR);
            // $stmt->bindParam(':user_id', $user_id, PDO::PARAM_STR);

            // $stmt->execute();

            echo json_encode(array("success" => true, "message" => "New record created successfully."));



        }



//  .................................................................................




// // Include the config file
// require('../config/config.php');

// // Handle CORS (optional, depending on your needs)
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type");

// header('Content-Type: application/json');

// try {
//     if ($_SERVER['REQUEST_METHOD'] === 'GET') {
//         // Retrieve doctor ID and date from query parameters
//         $doctorId = isset($_GET['id']) ? intval($_GET['id']) : 0;
//         $date = isset($_GET['date']) ? $_GET['date'] : '';

//         if ($doctorId <= 0 || empty($date)) {
//             echo json_encode(array("message" => "Invalid doctor ID or date."));
//             exit;
//         }

//         // Prepare and execute the query to get booked slots
//         $query = "SELECT bookingslot FROM slot WHERE doctor_id = :doctorId AND booking_date = :date";
//         $stmt = $conn->prepare($query);
//         $stmt->bindParam(':doctorId', $doctorId, PDO::PARAM_INT);
//         $stmt->bindParam(':date', $date, PDO::PARAM_STR);
//         $stmt->execute();
//         $bookedSlotsRecord = $stmt->fetch(PDO::FETCH_ASSOC);

//         if ($bookedSlotsRecord) {
//             // Decode the JSON slots to return them as an array
//             $bookedSlots = json_decode($bookedSlotsRecord['bookingslot'], true);
//             echo json_encode(array("date" => $date, "booked_slots" => $bookedSlots));
//         } else {
//             echo json_encode(array("message" => "No booked slots found for the specified doctor on the given date."));
//         }

//     } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
//         // Existing POST logic here for saving slots
//         // ...
//     } else {
//         echo json_encode(array("success" => false, "message" => "Invalid request method."));
//     }
// } catch (PDOException $e) {
//     http_response_code(500);
//     echo json_encode(array("success" => false, "message" => "An error occurred.", "error" => $e->getMessage()));
// }





?>
