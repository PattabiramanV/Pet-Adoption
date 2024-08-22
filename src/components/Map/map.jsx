// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { notification, Pagination } from 'antd';
// import { Autocomplete, TextField, CircularProgress, InputAdornment } from '@mui/material';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import './map.css';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import catanddog from "../../assets/profile.png";
// import 'leaflet/dist/leaflet.css';
// import 'antd/dist/reset.css';

// const GEOAPIFY_API_KEY = "092a4983401e47f78765fb35889c237c"; // Use environment variable

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

// const defaultLocation = {
//     latitude: 11.1271,
//     longitude: 78.6569,
//     name: 'Default Location',
//     address: 'No locations found',
//     distance: 0
// };

// function Map() {
//     const [address, setAddress] = useState('');
//     const [locations, setLocations] = useState([]);
//     const [suggestions, setSuggestions] = useState([]);
//     const [error, setError] = useState('');
//     const [category, setCategory] = useState('');
//     const [mapCenter, setMapCenter] = useState([defaultLocation.latitude, defaultLocation.longitude]);
//     const [loading, setLoading] = useState(false);
//     const [noResults, setNoResults] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(3);
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
//                 // console.log(response.data);
                
//                 setCurrentPage(1); // Reset to first page when new data is fetched
//             }
//         } catch {
//             const errorMsg = 'An error occurred while fetching the data';
//             setError(errorMsg);
//             openNotification(errorMsg);
//         }
//     };

//     const fetchSuggestions = async (input) => {
//         if (input.length > 2) {
//             setLoading(true);
//             try {
//                 const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=${GEOAPIFY_API_KEY}`);
//                 if (response.data.features.length > 0) {
//                     setSuggestions(response.data.features);
//                     setNoResults(false);
//                 } else {
//                     setSuggestions([]);
//                     setNoResults(true);
//                 }
//             } catch (error) {
//                 console.error('Error fetching suggestions:', error);
//                 setSuggestions([]);
//                 setNoResults(true);
//             } finally {
//                 setLoading(false);
//             }
//         } else {
//             setSuggestions([]);
//             setNoResults(false);
//         }
//     };

//     const handleCategoryChange = (e) => {
//         setCategory(e.target.value);
//     };

//     const handleAddressChange = (event, newValue) => {
//         setAddress(newValue);
//         if (debounceTimeoutRef.current) {
//             clearTimeout(debounceTimeoutRef.current);
//         }

//         debounceTimeoutRef.current = setTimeout(() => {
//             fetchSuggestions(newValue); // Fetch suggestions when address changes
//         }, 300);
//     };

//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         findLocations();
//     };

//     // Pagination logic
//     const indexOfLastLocation = currentPage * itemsPerPage;
//     const indexOfFirstLocation = indexOfLastLocation - itemsPerPage;

//     // Sort locations by distance
//     const sortedLocations = locations.sort((a, b) => a.distance - b.distance);
//     const currentLocations = sortedLocations.slice(indexOfFirstLocation, indexOfLastLocation);

//     const totalPages = Math.ceil(locations.length / itemsPerPage);

//     const onPageChange = (page) => {
//         setCurrentPage(page);
//     };

//     return (
//         <div className="pet-hostel-finder">
//             <div className="map-table-container">
//                 <div className="div_map_fr_main">
//                     <div className="div_map_from">
//                         <form onSubmit={handleFormSubmit}>
//                             <div className="div_from_main">
//                                 <div className="mapbuttons">
//                                     <h1>Find Nearby {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
//                                     <button
//                                         type="button"
//                                         className={`map-categary-button ${category === 'hostel' ? 'selected' : ''}`}
//                                         onClick={() => setCategory('hostel')}
//                                     >
//                                         Hostel
//                                     </button>
//                                     <button
//                                         type="button"
//                                         className={`map-categary-button ${category === 'vetneries' ? 'selected' : ''}`}
//                                         onClick={() => setCategory('vetneries')}
//                                     >
//                                         Doctor
//                                     </button>
//                                     <button
//                                         type="button"
//                                         className={`map-categary-button ${category === 'pets' ? 'selected' : ''}`}
//                                         onClick={() => setCategory('pets')}
//                                     >
//                                         Pets
//                                     </button>
//                                 </div>
//                                 <Autocomplete
//                                     freeSolo
//                                     value={address}
//                                     onInputChange={handleAddressChange}
//                                     options={suggestions.map((suggestion) => suggestion.properties.formatted)}
//                                     renderInput={(params) => (
//                                         <TextField
//                                             {...params}
//                                             label="Search Address"
//                                             variant="outlined"
//                                             InputProps={{
//                                                 ...params.InputProps,
//                                                 endAdornment: (
//                                                     <>
//                                                         {loading ? <CircularProgress color="inherit" size={20} /> : (
//                                                             <InputAdornment position="end">
//                                                                 <LocationOnIcon />
//                                                             </InputAdornment>
//                                                         )}
//                                                         {params.InputProps.endAdornment}
//                                                     </>
//                                                 ),
//                                             }}
//                                         />
//                                     )}
//                                     renderOption={(props, option) => (
//                                         <li {...props} style={{ display: 'flex', alignItems: 'center' }}>
//                                             <LocationOnIcon style={{ marginRight: 10 }} />
//                                             {option}
//                                         </li>
//                                     )}
//                                 />
//                                 {noResults && <p className="no-results-message">No results found</p>}
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//                 <div className="map-container">
//                     {error && <p className="error-message">{error}</p>}
//                     <div className="location-list">
//                         {currentLocations.length > 0 && (
//                             <div className='card_list_map'>
//                                 {currentLocations.map((location) => (
//                                     <div className="location-item" key={location.id}>
//                                         <div className="location-image-details">
//                                             <div className="location-image">
//                                                 <img src={catanddog} alt={location.name} />
//                                             </div>
//                                             <div className="location-details">
//                                                 <div className="location-name">{location.name}</div>
//                                                 <div className="location-address">{location.address}</div>
//                                                 <div className="no_location_in_100km">
//                                                 {location.message} 

//                                                 </div>

//                                                 <div className="location-distance">
//                                                     {location.distance ? `${location.distance.toFixed(2)} km` : 'N/A'}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                     <div className="map-container_show">
//                         <MapContainer center={mapCenter} zoom={9} style={{ height: '570px', width: '100%' }}>
//                             <TileLayer
//                                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                             />
//                             {locations.length === 0 && (
//                                 <Marker 
//                                     position={[defaultLocation.latitude, defaultLocation.longitude]}
//                                     icon={defaultIcon}
//                                 >
//                                     <Popup>
//                                         <strong>{defaultLocation.name}</strong><br />
//                                         Address: {defaultLocation.address}
//                                     </Popup>
//                                 </Marker>
//                             )}
//                             {sortedLocations.map((location) => {
//                                 const isMinDistanceLocation = location.distance === Math.min(...sortedLocations.map(l => l.distance));
//                                 return location.latitude && location.longitude && (
//                                     <Marker 
//                                         key={location.id} 
//                                         position={[location.latitude, location.longitude]}
//                                         // icon={isMinDistanceLocation ? lowestDistanceIcon : defaultIcon}
//                                         ref={marker => {
//                                             if (marker && isMinDistanceLocation) {
//                                                 marker.openPopup();
//                                             }
//                                         }}
//                                     >
//                                         <Popup>
//                                             <strong>{location.name}</strong><br />
//                                             Address: {location.address}<br />
//                                             {location.distance && `Distance: ${location.distance.toFixed(2)} km`}<br />
//                                             {location.message} 

//                                         </Popup>
//                                     </Marker>
//                                 );
//                             })}
//                         </MapContainer>
//                     </div>
//                 </div>
//             </div>
//             <div className="div_page_map">
//                 <Pagination 
//                     current={currentPage}
//                     total={locations.length}
//                     pageSize={itemsPerPage}
//                     onChange={onPageChange}
//                     showSizeChanger={false}
//                 />
//             </div>
//         </div>
//     );
// }

// export default Map;











import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { notification, Pagination } from 'antd';
import { Autocomplete, TextField, CircularProgress, InputAdornment } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './map.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import catanddog from "../../assets/profile.png";
import 'leaflet/dist/leaflet.css';
import 'antd/dist/reset.css';

const GEOAPIFY_API_KEY = "092a4983401e47f78765fb35889c237c"; // Use environment variable

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

const defaultLocation = {
    latitude: 11.1271,
    longitude: 78.6569,
    name: 'Default Location',
    address: 'No locations found',
    distance: 0
};

function Map() {
    const [address, setAddress] = useState('');
    const [locations, setLocations] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState('');
    const [category, setCategory] = useState('');
    const [mapCenter, setMapCenter] = useState([defaultLocation.latitude, defaultLocation.longitude]);
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);
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
            setLoading(true);
            try {
                const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=${GEOAPIFY_API_KEY}`);
                if (response.data.features.length > 0) {
                    setSuggestions(response.data.features);
                    setNoResults(false);
                } else {
                    setSuggestions([]);
                    setNoResults(true);
                }
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
                setNoResults(true);
            } finally {
                setLoading(false);
            }
        } else {
            setSuggestions([]);
            setNoResults(false);
        }
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleAddressChange = (event, newValue) => {
        setAddress(newValue);
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            fetchSuggestions(newValue); // Fetch suggestions when address changes
        }, 300);
    };

    const handleSuggestionSelect = (event, value) => {
        if (value) {
            setAddress(value);
            findLocations(); // Call the API when a suggestion is selected
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        findLocations();
    };

    // Pagination logic
    const indexOfLastLocation = currentPage * itemsPerPage;
    const indexOfFirstLocation = indexOfLastLocation - itemsPerPage;

    // Sort locations by distance
    const sortedLocations = locations.sort((a, b) => a.distance - b.distance);
    const currentLocations = sortedLocations.slice(indexOfFirstLocation, indexOfLastLocation);

    const totalPages = Math.ceil(locations.length / itemsPerPage);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="pet-hostel-finder">
            <div className="map-table-container">
                <div className="div_map_fr_main">
                    <div className="div_map_from">
                        <form onSubmit={handleFormSubmit}>
                            <div className="div_from_main">
                                <div className="mapbuttons">
                                    <h1>Find Nearby <span className='map_name_span'> {category.charAt(0).toUpperCase() + category.slice(1)} </span> </h1>
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
                                <Autocomplete
                                    freeSolo
                                    value={address}
                                    onInputChange={handleAddressChange}
                                    onChange={handleSuggestionSelect} // Handle suggestion selection
                                    options={suggestions.map((suggestion) => suggestion.properties.formatted)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Search Address"
                                            variant="outlined"
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <>
                                                        {loading ? <CircularProgress color="inherit" size={20} /> : (
                                                            <InputAdornment position="end">
                                                                <LocationOnIcon />
                                                            </InputAdornment>
                                                        )}
                                                        {params.InputProps.endAdornment}
                                                    </>
                                                ),
                                            }}
                                        />
                                    )}
                                    renderOption={(props, option) => (
                                        <li {...props} style={{ display: 'flex', alignItems: 'center' }}>
                                            <LocationOnIcon style={{ marginRight: 10 }} />
                                            {option}
                                        </li>
                                    )}
                                />
                                {noResults && <p className="no-results-message">No results found</p>}
                            </div>
                        </form>
                    </div>
                </div>
                <div className="map-container">
                {error && (
    <div className="error-container">
        <p className="error-message">{error}</p>
    </div>
)}
                    <div className="location-list">
                        {currentLocations.length > 0 && (
                            <div className='card_list_map'>
                                {currentLocations.map((location) => (
                                    <div className="location-item" key={location.id}>
                                        <div className="location-image-details">
                                            <div className="location-image">
                                                <img src={catanddog} alt={location.name} />
                                            </div>
                                            <div className="location-details">
                                                <div className="location-name">{location.name}</div>
                                                <div className="location-address">{location.address}</div>
                                                <div className="no_location_in_100km">
                                                    {location.message}
                                                </div>
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
                    <div className="map-container_show">
                        <MapContainer center={mapCenter} zoom={9} style={{ height: '570px', width: '100%' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            {locations.length === 0 && (
                                <Marker 
                                    position={[defaultLocation.latitude, defaultLocation.longitude]}
                                    icon={defaultIcon}
                                >
                                    <Popup>
                                        <strong>{defaultLocation.name}</strong><br />
                                        Address: {defaultLocation.address}
                                    </Popup>
                                </Marker>
                            )}
                            {sortedLocations.map((location) => {
                                const isMinDistanceLocation = location.distance === Math.min(...sortedLocations.map(l => l.distance));
                                return location.latitude && location.longitude && (
                                    <Marker 
                                        key={location.id} 
                                        position={[location.latitude, location.longitude]}
                                        // icon={isMinDistanceLocation ? lowestDistanceIcon : defaultIcon}
                                        ref={marker => {
                                            if (marker && isMinDistanceLocation) {
                                                marker.openPopup();
                                            }
                                        }}
                                    >
                                        <Popup>
                                            {/* <strong>{location.name}</strong><br />
                                            Address: {location.address}<br />
                                            {location.distance && `Distance: ${location.distance.toFixed(2)} km`}<br />
                                            {location.message} */}
        <strong>{location.name}</strong><br />
        <span className="popup-address">Address: {location.address}</span><br />
        {location.distance && <span className="popup-distance">Distance: {location.distance.toFixed(2)} km</span>}<br />
        <span className="popup-message">{location.message}</span>
                                        </Popup>
                                    </Marker>
                                );
                            })}
                        </MapContainer>
                    </div>
                </div>
            </div>
            <div className="div_page_map">
                <Pagination 
                    current={currentPage}
                    total={locations.length}
                    pageSize={itemsPerPage}
                    onChange={onPageChange}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
}

export default Map;







