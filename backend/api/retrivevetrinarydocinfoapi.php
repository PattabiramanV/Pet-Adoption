<?php

require('../config/config.php');
header('Content-Type: application/json');

function normalizePath($path) {
    $parts = array_filter(explode('/', $path));
    $result = [];
    
    foreach ($parts as $part) {
        if ($part === '..') {
            array_pop($result);
        } else {
            $result[] = $part;
        }
    }
    
    return implode('/', $result);
}

try {
    // SQL query to fetch data from the `vetneries` table
    $query = "SELECT * FROM vetneries";
    $stmt = $conn->prepare($query);

    // Execute the query
    $stmt->execute();

    // Fetch all rows from the executed query
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Add the base URL for images
    $baseUrl = 'http://localhost/petadoption/backend/'; // Adjust this base URL if necessary

    // Append base URL to image paths
    foreach ($results as &$result) {
        if (isset($result['profile_img']) && !empty($result['profile_img'])) {
            // Normalize the path
            $normalizedPath = normalizePath($result['profile_img']);
            $result['profile_img'] = $baseUrl . $normalizedPath;
        } else {
            // Provide a default image path if no profile image is available
            $result['profile_img'] = $baseUrl . 'default.jpg';
        }
    }
  
    // Return the data as JSON
    echo json_encode($results);
} catch (PDOException $e) {
    // Handle database connection errors
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
} catch (Exception $e) {
    // Handle general errors
    http_response_code(500);
    echo json_encode(['error' => 'General error: ' . $e->getMessage()]);
}

?>
