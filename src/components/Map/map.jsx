// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { notification } from 'antd'; // Import Ant Design notification
// import './map.css'; // Adjust the import path if necessary
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'antd/dist/reset.css'; // Import Ant Design CSS

// const GEOAPIFY_API_KEY = '092a4983401e47f78765fb35889c237c'; // Replace with your actual Geoapify API key

// // Define custom marker icons
// const defaultIcon = new L.Icon({
//     iconUrl: 'https://cdn-icons-png.flaticon.com/512/1189/1189615.png',
//     iconSize: [32, 32],
//     iconAnchor: [16, 32],
//     popupAnchor: [0, -32],
// });

// const lowestDistanceIcon = new L.Icon({
//     iconUrl: 'https://cdn-icons-png.flaticon.com/512/1828/1828856.png',
//     iconSize: [32, 32],
//     iconAnchor: [16, 32],
//     popupAnchor: [0, -32],
// });

// function Map() {
//     const [address, setAddress] = useState('');
//     const [locations, setLocations] = useState([]);
//     const [suggestions, setSuggestions] = useState([]);
//     const [error, setError] = useState('');
//     const [category, setCategory] = useState('');
//     const [mapCenter, setMapCenter] = useState([21.0000,78.0000]);

//     const debounceTimeoutRef = useRef(null);

//     useEffect(() => {
//         if (category) findLocations();
//     }, [category]);

//     useEffect(() => {
//         if (locations.length > 0) {
//             const minDistanceLocation = locations.reduce((prev, curr) => 
//                 curr.distance < prev.distance ? curr : prev, 
//                 locations[0]
//             );
//             setMapCenter([minDistanceLocation.latitude, minDistanceLocation.longitude]);
//         }
//     }, [locations]);

//     useEffect(() => {
//         getCurrentLocation();
//     }, []);

//     const openNotification = (message) => {
//         notification.error({
//             message: 'Error',
//             description: message,
//         });
//     };

//     const getCurrentLocation = () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(async ({ coords: { latitude, longitude } }) => {
//                 try {
//                     const response = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${GEOAPIFY_API_KEY}`);
//                     const userAddress = response.data.features[0].properties.formatted;
//                     setAddress(userAddress);
//                     setMapCenter([latitude, longitude]);
//                 } catch {
//                     const errorMsg = 'Unable to fetch your current location';
//                     setError(errorMsg);
//                     openNotification(errorMsg);
//                 }
//             }, () => {
//                 const errorMsg = 'Geolocation is not supported by this browser.';
//                 setError(errorMsg);
//                 openNotification(errorMsg);
//             });
//         } else {
//             const errorMsg = 'Geolocation is not supported by this browser.';
//             setError(errorMsg);
//             openNotification(errorMsg);
//         }
//     };

//     const findLocations = async () => {
//         setError('');
//         setLocations([]);

//         try {
//             const response = await axios.post('http://localhost/petadoption/backend/map/map.php', { address, category });
//             if (response.data.error || response.data.message) {
//                 const errorMsg = response.data.error || response.data.message;
//                 setError(errorMsg);
//                 openNotification(errorMsg);
//             } else {
//                 setLocations(response.data);
//             }
//         } catch {
//             const errorMsg = 'An error occurred while fetching the data';
//             setError(errorMsg);
//             openNotification(errorMsg);
//         }
//     };

//     const fetchSuggestions = async (input) => {
//         if (input.length > 2) {
//             try {
//                 const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=${GEOAPIFY_API_KEY}`);
//                 setSuggestions(response.data.features);
//             } catch (error) {
//                 console.error('Error fetching suggestions:', error);
//             }
//         } else {
//             setSuggestions([]);
//         }
//     };

//     const handleCategoryChange = (e) => {
//         setCategory(e.target.value);
//     };

//     const handleAddressChange = (e) => {
//         const newAddress = e.target.value;
//         setAddress(newAddress);
//         fetchSuggestions(newAddress);

//         if (debounceTimeoutRef.current) {
//             clearTimeout(debounceTimeoutRef.current);
//         }

//         debounceTimeoutRef.current = setTimeout(() => {
//             findLocations();
//         }, 300); // Adjust the debounce delay as necessary
//     };

//     const handleSuggestionClick = (suggestion) => {
//         setAddress(suggestion.properties.formatted);
//         setSuggestions([]);
//     };

//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         findLocations(); // Fetch locations based on the current address and category
//     };

//     return (
//         <div className="pet-hostel-finder">
//             <div className="map-table-container">
//             <div className='map-div-container'>
//             <div classname= "map-container">
//             <form onSubmit={handleFormSubmit}>
//             <div className='mapbuttons'>
//     <h1>Find Nearby Location {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
//     <button
//         type="button"
//         className={`map-categary-button ${category === 'hostal' ? 'selected' : ''}`}
//         onClick={() => setCategory('hostel')}
//     >
//         Hostel
//     </button>
//     <button
//         type="button"
//         className={`map-categary-button ${category === 'vetneries' ? 'selected' : ''}`}
//         onClick={() => setCategory('vetneries')}
//     >
//         Doctor
//     </button>
//     <button
//         type="button"
//         className={`map-categary-button ${category === 'pets' ? 'selected' : ''}`}
//         onClick={() => setCategory('pets')}
//     >
//         Pets
//     </button>
// </div>

//                 <label>       
//                     <input 
//                         type="text" 
//                         value={address} 
//                         onChange={handleAddressChange} 
//                         required
//                     />
//                 </label>
//                 {suggestions.length > 0 && (
//                     <ul className="suggestions-list">
//                         {suggestions.map((suggestion, index) => (
//                             <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
//                                 {suggestion.properties.formatted}
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </form>

//             {error && <p className="error-message">{error}</p>}
//             </div>

//             <div className="location-list">
//         {locations.length > 0 && (
//               <div>
//                   {locations
//                       .sort((a, b) => a.distance - b.distance) // Sort by distance in ascending order
//                       .map((location) => (
//                           <div className="location-item" key={location.id}>
//                            <div className='location-image-details'>
//                               <div className="location-image">
//                                   <img src="path_to_image" alt={location.name} /> {/* Replace with actual image source */}
//                               </div>
//                               <div className="location-details">
//                                   <div className="location-name">{location.name}</div>
//                                   <div className="location-address">{location.address}</div>
//                                   <div className="location-distance">
//                                       {location.distance ? `${location.distance.toFixed(2)} km` : 'N/A'}
//                                   </div>
//                               </div>
//                               </div>
//                           </div>
//                       ))
//                   }
//               </div>
      
//         )}
//     </div>
//                 </div>
//                 <div className="map-container">
//                     {locations.length > 0 && (
//                         <MapContainer center={mapCenter} zoom={13} style={{ height: '800px', width: '100%',borderRadius:'10px' }}>
//                             <TileLayer
//                                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                             />
//                             {locations.map((location) => {
//                                 const isLowestDistance = location === locations.reduce((prev, curr) => 
//                                     curr.distance < prev.distance ? curr : prev
//                                 );
//                                 return location.latitude && location.longitude && (
//                                     <Marker 
//                                         key={location.id} 
//                                         position={[location.latitude, location.longitude]}
//                                         // icon={isLowestDistance ? lowestDistanceIcon : defaultIcon}
//                                     >
//                                         <Popup>
//                                             <strong>{location.name}</strong><br />
//                                             Address: {location.address}<br />
//                                             {location.distance && `Distance: ${location.distance.toFixed(2)} km`}
//                                         </Popup>
//                                     </Marker>
//                                 );
//                             })}
//                         </MapContainer>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Map;

// -----------------------------------btn add



// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { notification } from 'antd'; // Import Ant Design notification
// import './map.css'; // Adjust the import path if necessary
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'antd/dist/reset.css'; // Import Ant Design CSS

// const GEOAPIFY_API_KEY = '092a4983401e47f78765fb35889c237c'; // Replace with your actual Geoapify API key

// // Define custom marker icons
// const defaultIcon = new L.Icon({
//     iconUrl: 'https://cdn-icons-png.flaticon.com/512/1189/1189615.png',
//     iconSize: [32, 32],
//     iconAnchor: [16, 32],
//     popupAnchor: [0, -32],
// });

// const lowestDistanceIcon = new L.Icon({
//     iconUrl: 'https://cdn-icons-png.flaticon.com/512/1828/1828856.png',
//     iconSize: [32, 32],
//     iconAnchor: [16, 32],
//     popupAnchor: [0, -32],
// });

// function Map() {
//     const [address, setAddress] = useState('');
//     const [locations, setLocations] = useState([]);
//     const [suggestions, setSuggestions] = useState([]);
//     const [error, setError] = useState('');
//     const [category, setCategory] = useState('');
//     const [mapCenter, setMapCenter] = useState([11.1271,78.6569]);

//     const debounceTimeoutRef = useRef(null);

//     useEffect(() => {
//         if (category) findLocations();
//     }, [category]);

//     useEffect(() => {
//         if (locations.length > 0) {
//             const minDistanceLocation = locations.reduce((prev, curr) => 
//                 curr.distance < prev.distance ? curr : prev, 
//                 locations[0]
//             );
//             setMapCenter([minDistanceLocation.latitude, minDistanceLocation.longitude]);
//         }
//     }, [locations]);

//     useEffect(() => {
//         getCurrentLocation();
//     }, []);

//     const openNotification = (message) => {
//         notification.error({
//             message: 'Error',
//             description: message,
//         });
//     };

//     const getCurrentLocation = () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(async ({ coords: { latitude, longitude } }) => {
//                 try {
//                     const response = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${GEOAPIFY_API_KEY}`);
//                     const userAddress = response.data.features[0].properties.formatted;
//                     setAddress(userAddress);
//                     setMapCenter([latitude, longitude]);
//                 } catch {
//                     const errorMsg = 'Unable to fetch your current location';
//                     setError(errorMsg);
//                     openNotification(errorMsg);
//                 }
//             }, () => {
//                 const errorMsg = 'Geolocation is not supported by this browser.';
//                 setError(errorMsg);
//                 openNotification(errorMsg);
//             });
//         } else {
//             const errorMsg = 'Geolocation is not supported by this browser.';
//             setError(errorMsg);
//             openNotification(errorMsg);
//         }
//     };

//     const findLocations = async () => {
//         setError('');
//         setLocations([]);

//         try {
//             const response = await axios.post('http://localhost/petadoption/backend/map/map.php', { address, category });
//             if (response.data.error || response.data.message) {
//                 const errorMsg = response.data.error || response.data.message;
//                 setError(errorMsg);
//                 openNotification(errorMsg);
//             } else {
//                 setLocations(response.data);
//             }
//         } catch {
//             const errorMsg = 'An error occurred while fetching the data';
//             setError(errorMsg);
//             openNotification(errorMsg);
//         }
//     };

//     const fetchSuggestions = async (input) => {
//         if (input.length > 2) {
//             try {
//                 const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=${GEOAPIFY_API_KEY}`);
//                 setSuggestions(response.data.features);
//             } catch (error) {
//                 console.error('Error fetching suggestions:', error);
//             }
//         } else {
//             setSuggestions([]);
//         }
//     };

//     const handleCategoryChange = (e) => {
//         setCategory(e.target.value);
//     };

//     const handleAddressChange = (e) => {
//         const newAddress = e.target.value;
//         setAddress(newAddress);
//         fetchSuggestions(newAddress);

//         // Clear any existing debounce timeout
//         if (debounceTimeoutRef.current) {
//             clearTimeout(debounceTimeoutRef.current);
//         }

//         // Immediately find locations based on the new address
//         findLocations();

//         // Optionally, you can debounce the findLocations call if you want to limit requests
//         debounceTimeoutRef.current = setTimeout(() => {
//             findLocations();
//         }, 300); // Adjust the debounce delay as necessary
//     };

//     const handleSuggestionClick = (suggestion) => {
//         setAddress(suggestion.properties.formatted);
//         setSuggestions([]);
//     };

//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         findLocations(); // Fetch locations based on the current address and category
//     };

//     return (
//         <div className="pet-hostel-finder">
//             <div className="map-table-container">
//                 <div className='map-div-container'>
//                     <div className="map-container">
//                         <form onSubmit={handleFormSubmit}>
//                             <div className='mapbuttons'>
//                                 <h1>Find Nearby Location {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
//                                 <button
//                                     type="button"
//                                     className={`map-categary-button ${category === 'hostel' ? 'selected' : ''}`}
//                                     onClick={() => setCategory('hostel')}
//                                 >
//                                     Hostel
//                                 </button>
//                                 <button
//                                     type="button"
//                                     className={`map-categary-button ${category === 'vetneries' ? 'selected' : ''}`}
//                                     onClick={() => setCategory('vetneries')}
//                                 >
//                                     Doctor
//                                 </button>
//                                 <button
//                                     type="button"
//                                     className={`map-categary-button ${category === 'pets' ? 'selected' : ''}`}
//                                     onClick={() => setCategory('pets')}
//                                 >
//                                     Pets
//                                 </button>
//                             </div>

//                             <label>       
//                                 <input 
//                                     type="text" 
//                                     value={address} 
//                                     onChange={handleAddressChange} 
//                                     required
//                                 />
//                             </label>
//                             {suggestions.length > 0 && (
//                                 <ul className="suggestions-list">
//                                     {suggestions.map((suggestion, index) => (
//                                         <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
//                                             {suggestion.properties.formatted}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             )}
//                             {/* Add the submit button */}
//                             <button type="submit" className="submit-button">Search</button>
//                         </form>

//                         {error && <p className="error-message">{error}</p>}
//                     </div>

//                     <div className="location-list">
//                         {locations.length > 0 && (
//                             <div>
//                                 {locations
//                                     .sort((a, b) => a.distance - b.distance) // Sort by distance in ascending order
//                                     .map((location) => (
//                                         <div className="location-item" key={location.id}>
//                                             <div className='location-image-details'>
//                                                 <div className="location-image">
//                                                     <img src="path_to_image" alt={location.name} /> {/* Replace with actual image source */}
//                                                 </div>
//                                                 <div className="location-details">
//                                                     <div className="location-name">{location.name}</div>
//                                                     <div className="location-address">{location.address}</div>
//                                                     <div className="location-distance">
//                                                         {location.distance ? `${location.distance.toFixed(2)} km` : 'N/A'}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//                 <div className="map-container">
//                     <MapContainer center={mapCenter} zoom={12} scrollWheelZoom={true} style={{ height: '400px', width: '100%' }}>
//                         <TileLayer
//                             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                         />
//                         {locations.map((location) => (
//                             <Marker
//                                 key={location.id}
//                                 position={[location.latitude, location.longitude]}
//                                 icon={location.distance === Math.min(...locations.map(loc => loc.distance)) ? lowestDistanceIcon : defaultIcon}
//                             >
//                                 <Popup>
//                                     <div>
//                                         <h3>{location.name}</h3>
//                                         <p>{location.address}</p>
//                                         <p>{location.distance ? `${location.distance.toFixed(2)} km` : 'N/A'}</p>
//                                     </div>
//                                 </Popup>
//                             </Marker>
//                         ))}
//                     </MapContainer>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Map;








import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { notification } from 'antd'; 
import './map.css'; 
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
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

        // Debounce the findLocations call to limit requests
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
        findLocations(); // Fetch locations based on the current address and category
    };

    return (
        <div className="pet-hostel-finder">
            <div className="map-table-container">
                <div className='map-div-container'>
                    <div className="map-container">
                        <form onSubmit={handleFormSubmit}>
                            <div className='mapbuttons'>
                                <h1>Find Nearby Location {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
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
                            <button type="submit" className="submit-button">Search</button>
                        </form>

                        {error && <p className="error-message">{error}</p>}
                    </div>

                    <div className="location-list">
                        {locations.length > 0 && (
                            <div>
                                {locations
                                    .sort((a, b) => a.distance - b.distance) 
                                    .map((location) => (
                                        <div className="location-item" key={location.id}>
                                            <div className='location-image-details'>
                                                <div className="location-image">
                                                    <img src="path_to_image" alt={location.name} /> 
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
                    </div>
                </div>
                <div className="map-container">
                    <MapContainer center={mapCenter} zoom={6} scrollWheelZoom={true} style={{ height: '400px', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {locations.length > 0 && locations.map((location) => (
                            <Marker
                                key={location.id}
                                position={[location.latitude, location.longitude]}
                                // icon={location.distance === Math.min(...locations.map(loc => loc.distance)) ? lowestDistanceIcon : } // Highlight the lowest distance
                            >
                                <Popup>
                                    <div>
                                        <h3>{location.name}</h3>
                                        <p>{location.address}</p>
                                        <p>{location.distance ? `${location.distance.toFixed(2)} km` : 'N/A'}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}

export default Map;
