<?php

require('../config/config.php');
header('Content-Type: application/json');

try {
    // SQL query to fetch data from the `vetneries` table
    $query = "SELECT * FROM vetneries";
    $stmt = $conn->prepare($query);

    // Execute the query
    $stmt->execute();

    // Fetch all rows from the executed query
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Add the base URL for images
    $baseUrl = 'http://localhost/petadoption/'; // Adjust this base URL if necessary

    // Append base URL to image paths
    foreach ($results as &$result) {
        $result['profile_img'] = $baseUrl . $result['profile_img'];
    }

    // Return the data as JSON
    echo json_encode($results);
} catch (PDOException $e) {
    // Handle database connection errors
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
} catch (Exception $e) {
    // Handle general errors
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

?>
