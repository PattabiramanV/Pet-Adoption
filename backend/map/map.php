<?php


// header('Content-Type: application/json');
// header('Access-Control-Allow-Origin: http://localhost:3000');
// header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
// header('Access-Control-Allow-Headers: Content-Type');

// require '../config/config.php';

// if (!$conn) {
//     echo json_encode(['error' => 'Database connection failed']);
//     exit;
// }

// $apiKey = 'JCBiOq8POkfmmikOwf74lEzfLsnxFhx1';

// function getGeocode($address, $apiKey) {
//     $url = "http://www.mapquestapi.com/geocoding/v1/address?key=$apiKey&location=" . urlencode($address);
//     $response = file_get_contents($url);
//     $data = json_decode($response, true);
//     if (isset($data['results'][0]['locations'][0]['latLng'])) {
//         return $data['results'][0]['locations'][0]['latLng'];
//     }
//     return null;
// }

// function calculateDistance($lat1, $lng1, $lat2, $lng2) {
//     $earthRadius = 6371; // Radius of the Earth in kilometers
//     $latFrom = deg2rad($lat1);
//     $lngFrom = deg2rad($lng1);
//     $latTo = deg2rad($lat2);
//     $lngTo = deg2rad($lng2);
//     $latDelta = $latTo - $latFrom;
//     $lngDelta = $lngTo - $lngFrom;
//     $a = sin($latDelta / 2) ** 2 + cos($latFrom) * cos($latTo) * sin($lngDelta / 2) ** 2;
//     $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
//     return $earthRadius * $c;
// }

// try {
//     $inputData = json_decode(file_get_contents('php://input'), true);
    
//     if (isset($inputData['address']) && isset($inputData['category'])) {
//         $userAddress = $inputData['address'];
//         $category = $inputData['category'];

//         $tableMap = [
//             'hostal' => 'pet_hostels',
//             'vetneries' => 'vetneries',
//             'pet' => 'pets'
//         ];

//         if (!isset($tableMap[$category])) {
//             echo json_encode(['error' => 'Invalid category']);
//             exit;
//         }

//         $tableName = $tableMap[$category];
//     } else {
//         echo json_encode(['error' => 'Required parameters not provided']);
//         exit;
//     }

//     $userLatLng = $userAddress ? getGeocode($userAddress, $apiKey) : null;
//     $userLat = $userLatLng['lat'] ?? null;
//     $userLng = $userLatLng['lng'] ?? null;

//     // Initialize an empty array for results
//     $results = [];

//     if ($userLat && $userLng) {
//         // Fetch records with non-null coordinates
//         $stmt = $conn->prepare("SELECT * FROM $tableName WHERE latitude IS NOT NULL AND longitude IS NOT NULL");
//         $stmt->execute();
//         $locations = $stmt->fetchAll(PDO::FETCH_ASSOC);

//         foreach ($locations as $location) {
//             $distance = calculateDistance($userLat, $userLng, $location['latitude'], $location['longitude']);
//             if ($distance <=100) {
//                 $location['distance'] = $distance;
//                 $results[] = $location;
//             }
//         }

//         // Fetch records with null coordinates
//         $stmt = $conn->prepare("SELECT * FROM $tableName WHERE latitude IS NULL OR longitude IS NULL");
//         $stmt->execute();
//         $locationsToUpdate = $stmt->fetchAll(PDO::FETCH_ASSOC);

//         foreach ($locationsToUpdate as $location) {
//             $address = $location['address'];
//             $latLng = getGeocode($address, $apiKey);

//             if ($latLng) {
//                 $lat = $latLng['lat'];
//                 $lng = $latLng['lng'];
                
//                 // Update the database with the latitude and longitude
//                 $updateStmt = $conn->prepare("UPDATE $tableName SET latitude = :lat, longitude = :lng WHERE id = :id");
//                 $updateStmt->bindParam(':lat', $lat);
//                 $updateStmt->bindParam(':lng', $lng);
//                 $updateStmt->bindParam(':id', $location['id']);
//                 $updateStmt->execute();

//                 $distance = calculateDistance($userLat, $userLng, $lat, $lng);
//                 if ($distance <= 100) {
//                     $location['latitude'] = $lat;
//                     $location['longitude'] = $lng;
//                     $location['distance'] = $distance;
//                     $results[] = $location;
//                 }
//             }
//         }
//     } else {
//         // If no user location is provided, fetch all records
//         $stmt = $conn->prepare("SELECT * FROM $tableName");
//         $stmt->execute();
//         $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
//     }

//     if ($results) {
//         echo json_encode($results);
//     } else {
//         echo json_encode(['message' => 'No records found']);
//     }
// } catch (PDOException $e) {
//     echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
// }
// ----------------------------------------------------



header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require '../config/config.php';

if (!$conn) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

$apiKey = '092a4983401e47f78765fb35889c237c'; // Replace with your Geoapify API key

function getGeocode($address, $apiKey) {
    $url = "https://api.geoapify.com/v1/geocode/search?text=" . urlencode($address) . "&apiKey=$apiKey";
    $response = file_get_contents($url);
    $data = json_decode($response, true);
    if (isset($data['features'][0]['geometry']['coordinates'])) {
        return [
            'lng' => $data['features'][0]['geometry']['coordinates'][0],
            'lat' => $data['features'][0]['geometry']['coordinates'][1]
        ];
    }
    return null;
}

function calculateDistance($lat1, $lng1, $lat2, $lng2) {
    $earthRadius = 6371; // Radius of the Earth in kilometers
    $latFrom = deg2rad($lat1);
    $lngFrom = deg2rad($lng1);
    $latTo = deg2rad($lat2);
    $lngTo = deg2rad($lng2);
    $latDelta = $latTo - $latFrom;
    $lngDelta = $lngTo - $lngFrom;
    $a = sin($latDelta / 2) ** 2 + cos($latFrom) * cos($latTo) * sin($lngDelta / 2) ** 2;
    $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
    return $earthRadius * $c;
}

try {
    $inputData = json_decode(file_get_contents('php://input'), true);

   

    if (isset($inputData['address']) && isset($inputData['category'])) {
        $userAddress = $inputData['address'];
        $category = $inputData['category'];

        $tableMap = [
            'hostel' => 'pet_hostels',
            'vetneries' => 'vetneries',
            'pets' => 'pets'
        ];

       
        if (!isset($tableMap[$category])) {
            echo json_encode(['error' => 'Invalid category']);
            exit;
        }

        $tableName = $tableMap[$category];
   
    } else {
        echo json_encode(['error' => 'Required parameters not provided']);
        exit;
    }

    $userLatLng = $userAddress ? getGeocode($userAddress, $apiKey) : null;
    $userLat = $userLatLng['lat'] ?? null;
    $userLng = $userLatLng['lng'] ?? null;

    // Initialize an empty array for results
    $results = [];

    if ($userLat && $userLng) {
        // Fetch records with non-null coordinates
       
        $stmt = $conn->prepare("SELECT id ,longitude ,latitude, address,name FROM $tableName WHERE latitude IS NOT NULL AND longitude IS NOT NULL");

        $stmt->execute();
        $locations = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($locations as $location) {

            $distance = calculateDistance($userLat, $userLng, $location['latitude'], $location['longitude']);
           
            if ($distance <= 10) { // Adjust the distance threshold as needed
            
                $location['distance'] = $distance;
            
                $results[] = $location;
           
            }
            else if ($distance <= 200){
                $location['distance'] = $distance;
            
            $location['not'] = "not available";
                $results[] = $location;
            }
        }

        // Fetch records with null coordinates
        $stmt = $conn->prepare("SELECT id ,longitude ,latitude, address,name  FROM $tableName WHERE latitude IS NULL OR longitude IS NULL");
        $stmt->execute();
        $locationsToUpdate = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($locationsToUpdate as $location) {
            $address = $location['address'];
            $latLng = getGeocode($address, $apiKey);

            if ($latLng) {
                $lat = $latLng['lat'];
                $lng = $latLng['lng'];
                
                // Update the database with the latitude and longitude
                $updateStmt = $conn->prepare("UPDATE $tableName SET latitude = :lat, longitude = :lng WHERE id = :id");
                $updateStmt->bindParam(':lat', $lat);
                $updateStmt->bindParam(':lng', $lng);
                $updateStmt->bindParam(':id', $location['id']);
                $updateStmt->execute();

                $distance = calculateDistance($userLat, $userLng, $lat, $lng);
                if ($distance <= 100) {
                    $location['latitude'] = $lat;
                    $location['longitude'] = $lng;
                    $location['distance'] = $distance;
                    $results[] = $location;
                }else if($distance <= 200){
                    $location['latitude'] = $lat;
                    $location['longitude'] = $lng;
                    $location['distance'] = $distance;
                    $results[] = $location;
                
                } 
            }
        }
    } else {
        // If no user location is provided, fetch all records
        $stmt = $conn->prepare("SELECT * FROM $tableName");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    if ($results) {
        echo json_encode($results);
        // print_r($results);
        // exit();
    } else {
        echo json_encode(['message' => 'No records found']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}