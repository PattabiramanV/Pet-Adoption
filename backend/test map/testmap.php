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
//             if ($distance <= 100) {
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







// -------------------------------------------------------------------------


// ---------------------------night 

// header('Content-Type: application/json');
// header('Access-Control-Allow-Origin: http://localhost:3000');
// header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
// header('Access-Control-Allow-Headers: Content-Type');

// require '../config/config.php';

// if (!$conn) {
//     echo json_encode(['error' => 'Database connection failed']);
//     exit;
// }

// // Ideally, API key should be stored in a secure configuration file or environment variable.
// $apiKey = 'JCBiOq8POkfmmikOwf74lEzfLsnxFhx1'; // Replace with your actual API key

// function getGeocode($address, $apiKey) {
//     $url = "http://www.mapquestapi.com/geocoding/v1/address?key=" . urlencode($apiKey) . "&location=" . urlencode($address);
//     $response = file_get_contents($url);
//     if ($response === FALSE) {
//         return null;
//     }
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
//             if ($distance <= 3) { // distance in kilometers
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
//                 if ($distance <= 100) { // distance in kilometers
//                     $location['latitude'] = $lat;
//                     $location['longitude'] = $lng;
//                     $location['distance'] = $distance;
//                     $results[] = $location;
//                 }
//             }
//         }

//         // Include user coordinates in the response
//         $response = [
//             'userLat' => $userLat,
//             'userLng' => $userLng,
//             'locations' => $results
//         ];
//     } else {
//         // If no user location is provided, fetch all records
//         $stmt = $conn->prepare("SELECT * FROM $tableName");
//         $stmt->execute();
//         $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

//         $response = [
//             'userLat' => null,
//             'userLng' => null,
//             'locations' => $results
//         ];
//     }

//     echo json_encode($response);
// } catch (PDOException $e) {
//     echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
// } catch (Exception $e) {
//     echo json_encode(['error' => 'An unexpected error occurred: ' . $e->getMessage()]);
// }



<!-- import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { notification } from 'antd'; 
import './map.css'; 
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import catanddog from "../../assets/profile.png";
import 'leaflet/dist/leaflet.css';
import 'antd/dist/reset.css'; 

const GEOAPIFY_API_KEY = '092a4983401e47f78765fb35889c237c'; 

const defaultIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1189/1189615.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const lowestDistanceIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1828/1828856.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

function Map() {
    const [address, setAddress] = useState('');
    const [locations, setLocations] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState('');
    const [category, setCategory] = useState('');
    const [mapCenter, setMapCenter] = useState([11.1271, 78.6569]);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);
    const [showPagination, setShowPagination] = useState(false);

    const debounceTimeoutRef = useRef(null);

    useEffect(() => {
        if (category) findLocations();
    }, [category]);

    useEffect(() => {
        if (locations.length > 0) {
            const minDistanceLocation = locations.reduce((prev, curr) => 
                curr.distance < prev.distance ? curr : prev, 
                locations[0]
            );
            setMapCenter([minDistanceLocation.latitude, minDistanceLocation.longitude]);
        }
    }, [locations]);

    useEffect(() => {
        getCurrentLocation();
    }, []);

    useEffect(() => {
        // Update pagination visibility
        setShowPagination(locations.length > itemsPerPage);
    }, [locations]);

    const openNotification = (message) => {
        notification.error({
            message: 'Error',
            description: message,
        });
    };

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async ({ coords: { latitude, longitude } }) => {
                try {
                    const response = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${GEOAPIFY_API_KEY}`);
                    const userAddress = response.data.features[0].properties.formatted;
                    setAddress(userAddress);
                    setMapCenter([latitude, longitude]);
                } catch {
                    const errorMsg = 'Unable to fetch your current location';
                    setError(errorMsg);
                    openNotification(errorMsg);
                }
            }, () => {
                const errorMsg = 'Geolocation is not supported by this browser.';
                setError(errorMsg);
                openNotification(errorMsg);
            });
        } else {
            const errorMsg = 'Geolocation is not supported by this browser.';
            setError(errorMsg);
            openNotification(errorMsg);
        }
    };

    const findLocations = async () => {
        setError('');
        setLocations([]);

        try {
            const response = await axios.post('http://localhost/petadoption/backend/map/map.php', { address, category });
            if (response.data.error || response.data.message) {
                const errorMsg = response.data.error || response.data.message;
                setError(errorMsg);
                openNotification(errorMsg);
            } else {
                setLocations(response.data);
                setCurrentPage(1); // Reset to first page when new data is fetched
            }
        } catch {
            const errorMsg = 'An error occurred while fetching the data';
            setError(errorMsg);
            openNotification(errorMsg);
        }
    };

    const fetchSuggestions = async (input) => {
        if (input.length > 2) {
            try {
                const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=${GEOAPIFY_API_KEY}`);
                setSuggestions(response.data.features);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleAddressChange = (e) => {
        const newAddress = e.target.value;
        setAddress(newAddress);
        fetchSuggestions(newAddress);

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            findLocations();
        }, 300);
    };

    const handleSuggestionClick = (suggestion) => {
        setAddress(suggestion.properties.formatted);
        setSuggestions([]);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        findLocations();
    };

    const indexOfLastLocation = currentPage * itemsPerPage;
    const indexOfFirstLocation = indexOfLastLocation - itemsPerPage;
    const currentLocations = locations.slice(indexOfFirstLocation, indexOfLastLocation);

    const totalPages = Math.ceil(locations.length / itemsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="pet-hostel-finder">
            <div className="map-table-container">
                <div className="map-container">
                    <form onSubmit={handleFormSubmit}>
                        <div className='mapbuttons'>
                            <h1>Find Nearby {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
                            <button
                                type="button"
                                className={`map-categary-button ${category === 'hostel' ? 'selected' : ''}`}
                                onClick={() => setCategory('hostel')}
                            >
                                Hostel
                            </button>
                            <button
                                type="button"
                                className={`map-categary-button ${category === 'vetneries' ? 'selected' : ''}`}
                                onClick={() => setCategory('vetneries')}
                            >
                                Doctor
                            </button>
                            <button
                                type="button"
                                className={`map-categary-button ${category === 'pets' ? 'selected' : ''}`}
                                onClick={() => setCategory('pets')}
                            >
                                Pets
                            </button>
                        </div>

                        <label>
                            <input 
                                type="text" 
                                value={address} 
                                onChange={handleAddressChange} 
                                required
                            />
                        </label>
                        {suggestions.length > 0 && (
                            <ul className="suggestions-list">
                                {suggestions.map((suggestion, index) => (
                                    <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                        {suggestion.properties.formatted}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </form>

                    {error && <p className="error-message">{error}</p>}
                    
                    <div className="location-list">
                        {currentLocations.length > 0 && (
                            <div>
                                {currentLocations
                                    .sort((a, b) => a.distance - b.distance) 
                                    .map((location) => (
                                        <div className="location-item" key={location.id}>
                                            <div className='location-image-details'>
                                                <div className="location-image">
                                                    <img src={catanddog} alt={location.name} />
                                                </div>
                                                <div className="location-details">
                                                    <div className="location-name">{location.name}</div>
                                                    <div className="location-address">{location.address}</div>
                                                    <div className="location-distance">
                                                        {location.distance ? `${location.distance.toFixed(2)} km` : 'N/A'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                        {showPagination && (
                            <div className="location-pagination">
                                <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                                <span>{currentPage} / {totalPages}</span>
                                <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="map-container">
                    <MapContainer center={mapCenter} zoom={6} scrollWheelZoom={true} style={{ height: '800px', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {locations.map((location) => (
                            <Marker
                                key={location.id}
                                position={[location.latitude, location.longitude]}
                                icon={location.distance === Math.min(...locations.map(loc => loc.distance)) ? lowestDistanceIcon : defaultIcon}
                            >
                                <Popup>
                                    <strong>{location.name}</strong><br />
                                    {location.address}<br />
                                    {location.distance ? `${location.distance.toFixed(2)} km` : 'N/A'}
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}

export default Map; -->

