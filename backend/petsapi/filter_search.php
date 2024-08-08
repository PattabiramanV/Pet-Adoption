<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Include database connection file
include_once '../config/database.php';

try {
    // Start with base query
    $query = "SELECT * FROM pets WHERE 1=1 AND status = 'available' ";

    // Prepare parameters array
    $params = [];
    $filterResults = [
        'petType' => true,
        'size' => true,
        'breed' => true,
        'age' => true,
        'color' => true,
        'gender' => true,
        'searchLocation' => true
    ];

    // Append conditions based on filters
    if (isset($_GET['petType']) && !empty($_GET['petType'])) {
        $query .= " AND pet_category = :petType";
        $params[':petType'] = htmlspecialchars(strip_tags($_GET['petType']));
    } else {
        $filterResults['petType'] = false;
    }

    if (isset($_GET['size']) && !empty($_GET['size'])) {
        $query .= " AND size = :size";
        $params[':size'] = htmlspecialchars(strip_tags($_GET['size']));
    } else {
        $filterResults['size'] = false;
    }

    if (isset($_GET['breed']) && !empty($_GET['breed'])) {
        $query .= " AND breeds = :breed";
        $params[':breed'] = htmlspecialchars(strip_tags($_GET['breed']));
    } else {
        $filterResults['breed'] = false;
    }

    if (isset($_GET['age']) && !empty($_GET['age'])) {
        $query .= " AND age = :age";
        $params[':age'] = htmlspecialchars(strip_tags($_GET['age']));
    } else {
        $filterResults['age'] = false;
    }

    if (isset($_GET['color']) && !empty($_GET['color'])) {
        $query .= " AND color = :color";
        $params[':color'] = htmlspecialchars(strip_tags($_GET['color']));
    } else {
        $filterResults['color'] = false;
    }

    if (isset($_GET['gender']) && !empty($_GET['gender'])) {
        $query .= " AND gender = :gender";
        $params[':gender'] = htmlspecialchars(strip_tags($_GET['gender']));
    } else {
        $filterResults['gender'] = false;
    }

    if (isset($_GET['searchLocation']) && !empty($_GET['searchLocation'])) {
        $query .= " AND (city LIKE :searchLocation OR state LIKE :searchLocation)";
        $params[':searchLocation'] = "%" . htmlspecialchars(strip_tags($_GET['searchLocation'])) . "%";
    } else {
        $filterResults['searchLocation'] = false;
    }

    $stmt = $conn->prepare($query);

    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value);
    }

    $stmt->execute();
    $num = $stmt->rowCount();

    if ($num > 0) {
        $pets_arr = array();
        $pets_arr["records"] = array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $pet_item = array(
                "id" => $row['id'],
                "pet_name" => $row['pet_name'],
                "gender" => $row['gender'],
                "pet_category" => $row['pet_category'],
                "age" => $row['age'],
                "breeds" => $row['breeds'],
                "price" => $row['price'],
                "state" => $row['state'],
                "city" => $row['city'],
                "description" => $row['description'],
                "add_for" => $row['add_for'],
                "user_id" => $row['user_id'],
                "size" => $row['size'],
                "color" => $row['color'],
                "photo" => base64_encode($row['photo']),
               
            );

            array_push($pets_arr["records"], $pet_item);
        }

        http_response_code(200);
        echo json_encode([
            'status' => 'success',
            'data' => $pets_arr["records"],
            'noMatchFilters' => array_filter($filterResults, function($match) { return !$match; })
        ]);
    } else {
        http_response_code(404);
        echo json_encode([
            'status' => 'error',
            'message' => 'No pets found.',
            'noMatchFilters' => array_filter($filterResults, function($match) { return $match; })
        ]);
    }
} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(array("message" => "Server error."));
}
?>
