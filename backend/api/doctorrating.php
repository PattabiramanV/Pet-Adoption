<?php


require '../config/config.php';

// Function to authenticate and get user ID
$user_id = authenticate();





$input = file_get_contents('php://input');
$data = json_decode($input, true);


if($_SERVER['REQUEST_METHOD']=='POST'){

    // SQL query to insert data into the doctor_rating table
$sql = "INSERT INTO doctor_rating (
    doctor_id, user_id, rating, comments
) VALUES (:doctor_id, :user_id, :rating, :comments)";

// Prepare the SQL statement
$stmt = $conn->prepare($sql);

// Bind parameters
$stmt->bindValue(':doctor_id', $data['doctor_id'] ?? null);
$stmt->bindValue(':user_id', $user_id ?? null);
$stmt->bindValue(':rating', $data['rating'] ?? null);
$stmt->bindValue(':comments', $data['review'] ?? null);

try {
    // Execute the statement
    $stmt->execute();
    // Return success message
    echo json_encode(["message" => "Operation successful"]);
} catch (PDOException $e) {
    // Return error message
    echo json_encode(["error" => $e->getMessage()]);
}

}





if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    // SQL query to select data
    $sql = "SELECT 
        users.id AS user_id,
        users.username AS user_name,
        users.phone AS user_phone,
        users.avatar,
        doctor_rating.rating AS user_rating,
        doctor_rating.comments,
        AVG(doctor_rating.rating) OVER (PARTITION BY doctor_rating.doctor_id) AS average_rating,
        vetneries.* 
    FROM 
        doctor_rating
    JOIN 
        users ON users.id = doctor_rating.user_id
    JOIN 
        vetneries ON vetneries.id = doctor_rating.doctor_id
    WHERE 
        doctor_rating.doctor_id = :doctor_id";

    // Prepare the SQL statement
    $stmt = $conn->prepare($sql);

    // Bind the doctor_id parameter
    $stmt->bindValue(':doctor_id', $_GET['doctor_id'] ?? null);

    try {
        // Execute the statement
        $stmt->execute();

        // Fetch the results
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Check if results were found
        if ($result) {
            // Return the fetched data as JSON
            echo json_encode([
                "message" => "Operation successful",
                "data" => $result,
                "status" => "success",

            ]);
        } else {
            // Return an error message if no data found
          
            echo json_encode([
                "message" => "No data found for the given doctor_id",
                // "data" => $result,
                "status" => "failure",

            ]);
        }

    } catch (PDOException $e) {
        // Return error message
        echo json_encode(["error" => $e->getMessage()]);
    }
}


?>
