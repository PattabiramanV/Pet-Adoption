

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Loader from '../Loader/Loader'; // Adjust the import path if necessary
// import './map.css'; // Adjust the import path if necessary


// function Map() {
//     const [address, setAddress] = useState('');
//     const [locations, setLocations] = useState([]);
//     const [error, setError] = useState('');
//     const [category, setCategory] = useState('hostal'); // Default category
//     const [loading, setLoading] = useState(false); // Added loading state

//     useEffect(() => {
//         // Fetch locations when category changes
//         findLocations();
//     }, [category]);

//     const findLocations = async () => {
//         setError('');
//         setLocations([]);
//         setLoading(true); // Show loader

//         try {
//             const response = await axios.post('http://localhost/petadoption/backend/map/map.php', {
//                 address: address,  // Pass address even if it's empty
//                 category: category
//             });

//             if (response.data.error) {
//                 setError(response.data.error);
//             } else if (response.data.message) {
//                 setError(response.data.message);
//             } else {
//                 setLocations(response.data);
//             }
//         } catch (err) {
//             setError('An error occurred while fetching the data');
//         } finally {
//             setLoading(false); // Hide loader
//         }
//     };

//     const handleCategoryChange = (e) => {
//         setCategory(e.target.value);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         findLocations();  // Recalculate distances based on the address input
//     };

//     return (
//         <div className="pet-hostel-finder">
//             <h1>Find Nearby {category.charAt(0).toUpperCase() + category.slice(1)}s</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Select Category: </label>
//                     <label>
//                         <input 
//                             type="radio" 
//                             value="hostal" 
//                             checked={category === 'hostal'} 
//                             onChange={handleCategoryChange} 
//                         />
//                         Hostal
//                     </label>
//                     <label>
//                         <input 
//                             type="radio" 
//                             value="vetneries" 
//                             checked={category === 'vetneries'} 
//                             onChange={handleCategoryChange} 
//                         />
//                         Doctor
//                     </label>
//                     <label>
//                         <input 
//                             type="radio" 
//                             value="pet" 
//                             checked={category === 'pet'} 
//                             onChange={handleCategoryChange} 
//                         />
//                         Pet
//                     </label>
//                 </div>
//                 <label>
//                     Enter Your Address:
//                     <input 
//                         type="text" 
//                         value={address} 
//                         onChange={(e) => setAddress(e.target.value)} 
//                         required
//                     />
//                 </label>
//                 <button type="submit">Search</button> {/* Submit button */}
//             </form>

//             {loading && <Loader />} {/* Display loader when loading is true */}

//             {error && <p className="error-message">{error}</p>}

//             {locations.length > 0 && (
//                 <div>
//                     <h2>{category.charAt(0).toUpperCase() + category.slice(1)}s within 100 km:</h2>
//                     <ul>
//                         {locations.map((location, index) => (
//                             <li key={index}>
//                                 <strong>{location.name}</strong><br />
//                                 Address: {location.address}<br />
//                                 {location.distance && `Distance: ${location.distance.toFixed(2)} km`}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Map;






// ----------------------------------  list in map

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Loader from '../Loader/Loader'; // Adjust the import path if necessary
// import './map.css'; // Adjust the import path if necessary
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// function Map() {
//     const [address, setAddress] = useState('');
//     const [locations, setLocations] = useState([]);
//     const [error, setError] = useState('');
//     const [category, setCategory] = useState('hostal'); // Default category
//     const [loading, setLoading] = useState(false); // Added loading state
//     const [mapCenter, setMapCenter] = useState([11.4058, 76.6836]); // Default center

//     useEffect(() => {
//         // Fetch locations when category changes
//         findLocations();
//     }, [category]);

//     const findLocations = async () => {
//         setError('');
//         setLocations([]);
//         setLoading(true); // Show loader

//         try {
//             const response = await axios.post('http://localhost/petadoption/backend/map/map.php', {
//                 address: address,  // Pass address even if it's empty
//                 category: category
//             });

//             if (response.data.error) {
//                 setError(response.data.error);
//             } else if (response.data.message) {
//                 setError(response.data.message);
//             } else {
//                 setLocations(response.data);
//             }
//         } catch (err) {
//             setError('An error occurred while fetching the data');
//         } finally {
//             setLoading(false); // Hide loader
//         }
//     };

//     const handleCategoryChange = (e) => {
//         setCategory(e.target.value);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         findLocations();  // Recalculate distances based on the address input
//     };

//     return (
//         <div className="pet-hostel-finder">
//             <h1>Find Nearby {category.charAt(0).toUpperCase() + category.slice(1)}s</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Select Category: </label>
//                     <label>
//                         <input 
//                             type="radio" 
//                             value="hostal" 
//                             checked={category === 'hostal'} 
//                             onChange={handleCategoryChange} 
//                         />
//                         Hostal
//                     </label>
//                     <label>
//                         <input 
//                             type="radio" 
//                             value="vetneries" 
//                             checked={category === 'vetneries'} 
//                             onChange={handleCategoryChange} 
//                         />
//                         Doctor
//                     </label>
//                     <label>
//                         <input 
//                             type="radio" 
//                             value="pet" 
//                             checked={category === 'pet'} 
//                             onChange={handleCategoryChange} 
//                         />
//                         Pet
//                     </label>
//                 </div>
//                 <label>
//                     Enter Your Address:
//                     <input 
//                         type="text" 
//                         value={address} 
//                         onChange={(e) => setAddress(e.target.value)} 
//                         required
//                     />
//                 </label>
//                 <button type="submit">Search</button> {/* Submit button */}
//             </form>

//             {loading && <Loader />} {/* Display loader when loading is true */}

//             {error && <p className="error-message">{error}</p>}

//             {locations.length > 0 && (
//                 <div>
//                     <h2>{category.charAt(0).toUpperCase() + category.slice(1)}s within 100 km:</h2>
//                     <MapContainer center={mapCenter} zoom={13} style={{ height: '500px', width: '100%' }}>
//                         <TileLayer
//                             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                         />
//                         {locations.map((location) => (
//                             location.latitude && location.longitude && (
//                                 <Marker 
//                                     key={location.id} 
//                                     position={[location.latitude, location.longitude]}
//                                 >
//                                     <Popup>
//                                         <strong>{location.name}</strong><br />
//                                         Address: {location.address}<br />
//                                         {location.distance && `Distance: ${location.distance.toFixed(2)} km`}
//                                     </Popup>
//                                 </Marker>
//                             )
//                         ))}
//                     </MapContainer>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Map;




// -------------------------------------------------
// navget 




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Loader from '../Loader/Loader'; // Adjust the import path if necessary
// import './map.css'; // Adjust the import path if necessary
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// function Map() {
//     const [address, setAddress] = useState('');
//     const [locations, setLocations] = useState([]);
//     const [error, setError] = useState('');
//     const [category, setCategory] = useState('hostal'); // Default category
//     const [loading, setLoading] = useState(false); // Added loading state
//     const [mapCenter, setMapCenter] = useState([11.4058, 76.6836]); // Default center

//     useEffect(() => {
//         // Fetch locations when category changes
//         findLocations();
//     }, [category]);

//     useEffect(() => {
//         // Update map center when locations change
//         if (locations.length > 0) {
//             const minDistanceLocation = locations.reduce((prev, curr) => 
//                 curr.distance < prev.distance ? curr : prev
//             );
//             if (minDistanceLocation) {
//                 setMapCenter([minDistanceLocation.latitude, minDistanceLocation.longitude]);
//             }
//         }
//     }, [locations]);

//     const findLocations = async () => {
//         setError('');
//         setLocations([]);
//         setLoading(true); // Show loader

//         try {
//             const response = await axios.post('http://localhost/petadoption/backend/map/map.php', {
//                 address: address,  // Pass address even if it's empty
//                 category: category
//             });

//             if (response.data.error) {
//                 setError(response.data.error);
//             } else if (response.data.message) {
//                 setError(response.data.message);
//             } else {
//                 setLocations(response.data);
//             }
//         } catch (err) {
//             setError('An error occurred while fetching the data');
//         } finally {
//             setLoading(false); // Hide loader
//         }
//     };

//     const handleCategoryChange = (e) => {
//         setCategory(e.target.value);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         findLocations();  // Recalculate distances based on the address input
//     };

//     return (
//         <div className="pet-hostel-finder">
//             <h1>Find Nearby {category.charAt(0).toUpperCase() + category.slice(1)}s</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Select Category: </label>
//                     <label>
//                         <input 
//                             type="radio" 
//                             value="hostal" 
//                             checked={category === 'hostal'} 
//                             onChange={handleCategoryChange} 
//                         />
//                         Hostal
//                     </label>
//                     <label>
//                         <input 
//                             type="radio" 
//                             value="vetneries" 
//                             checked={category === 'vetneries'} 
//                             onChange={handleCategoryChange} 
//                         />
//                         Doctor
//                     </label>
//                     <label>
//                         <input 
//                             type="radio" 
//                             value="pet" 
//                             checked={category === 'pet'} 
//                             onChange={handleCategoryChange} 
//                         />
//                         Pet
//                     </label>
//                 </div>
//                 <label>
//                     Enter Your Address:
//                     <input 
//                         type="text" 
//                         value={address} 
//                         onChange={(e) => setAddress(e.target.value)} 
//                         required
//                     />
//                 </label>
//                 <button type="submit">Search</button> {/* Submit button */}
//             </form>

//             {loading && <Loader />} {/* Display loader when loading is true */}

//             {error && <p className="error-message">{error}</p>}

//             {locations.length > 0 && (
//                 <div>
//                     <h2>{category.charAt(0).toUpperCase() + category.slice(1)}s within 100 km:</h2>
//                     <MapContainer center={mapCenter} zoom={13} style={{ height: '500px', width: '100%' }}>
//                         <TileLayer
//                             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                         />
//                         {locations.map((location) => (
//                             location.latitude && location.longitude && (
//                                 <Marker 
//                                     key={location.id} 
//                                     position={[location.latitude, location.longitude]}
//                                 >
//                                     <Popup>
//                                         <strong>{location.name}</strong><br />
//                                         Address: {location.address}<br />
//                                         {location.distance && `Distance: ${location.distance.toFixed(2)} km`}
//                                     </Popup>
//                                 </Marker>
//                             )
//                         ))}
//                     </MapContainer>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Map;




// ------------------------------------------




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Loader from '../Loader/Loader'; // Adjust the import path if necessary
// import './map.css'; // Adjust the import path if necessary
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// // Define custom marker icons
// const defaultIcon = new L.Icon({
//     iconUrl: 'https://cdn-icons-png.flaticon.com/512/1189/1189615.png', // Default marker icon URL
//     iconSize: [32, 32], // Size of the icon
//     iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
//     popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
// });

// const lowestDistanceIcon = new L.Icon({
//     iconUrl: 'https://cdn-icons-png.flaticon.com/512/1828/1828856.png', // Red marker icon URL
//     iconSize: [32, 32], // Size of the icon
//     iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
//     popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
// });

// function Map() {
//     const [address, setAddress] = useState('');
//     const [locations, setLocations] = useState([]);
//     const [error, setError] = useState('');
//     const [category, setCategory] = useState('hostal'); // Default category
//     const [loading, setLoading] = useState(false); // Added loading state
//     const [mapCenter, setMapCenter] = useState([11.4058, 76.6836]); // Default center

//     useEffect(() => {
//         // Fetch locations when category changes
//         findLocations();
//     }, [category]);

//     useEffect(() => {
//         // Update map center when locations change
//         if (locations.length > 0) {
//             const minDistanceLocation = locations.reduce((prev, curr) => 
//                 curr.distance < prev.distance ? curr : prev
//             );
//             if (minDistanceLocation) {
//                 setMapCenter([minDistanceLocation.latitude, minDistanceLocation.longitude]);
//             }
//         }
//     }, [locations]);

//     const findLocations = async () => {
//         setError('');
//         setLocations([]);
//         setLoading(true); // Show loader

//         try {
//             const response = await axios.post('http://localhost/petadoption/backend/map/map.php', {
//                 address: address,  // Pass address even if it's empty
//                 category: category
//             });

//             if (response.data.error) {
//                 setError(response.data.error);
//             } else if (response.data.message) {
//                 setError(response.data.message);
//             } else {
//                 setLocations(response.data);
//             }
//         } catch (err) {
//             setError('An error occurred while fetching the data');
//         } finally {
//             setLoading(false); // Hide loader
//         }
//     };

//     const handleCategoryChange = (e) => {
//         setCategory(e.target.value);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         findLocations();  // Recalculate distances based on the address input
//     };

//     return (
//         <div className="pet-hostel-finder">
//             <h1>Find Nearby {category.charAt(0).toUpperCase() + category.slice(1)}s</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Select Category: </label>
//                     <label>
//                         <input 
//                             type="radio" 
//                             value="hostal" 
//                             checked={category === 'hostal'} 
//                             onChange={handleCategoryChange} 
//                         />
//                         Hostal
//                     </label>
//                     <label>
//                         <input 
//                             type="radio" 
//                             value="vetneries" 
//                             checked={category === 'vetneries'} 
//                             onChange={handleCategoryChange} 
//                         />
//                         Doctor
//                     </label>
//                     <label>
//                         <input 
//                             type="radio" 
//                             value="pet" 
//                             checked={category === 'pet'} 
//                             onChange={handleCategoryChange} 
//                         />
//                         Pet
//                     </label>
//                 </div>
//                 <label>
//                     Enter Your Address:
//                     <input 
//                         type="text" 
//                         value={address} 
//                         onChange={(e) => setAddress(e.target.value)} 
//                         required
//                     />
//                 </label>
//                 <button type="submit">Search</button> {/* Submit button */}
//             </form>

//             {loading && <Loader />} {/* Display loader when loading is true */}

//             {error && <p className="error-message">{error}</p>}

//             {locations.length > 0 && (
//                 <div>
//                     <h2>{category.charAt(0).toUpperCase() + category.slice(1)}s within 100 km:</h2>
//                     <MapContainer center={mapCenter} zoom={13} style={{ height: '500px', width: '100%' }}>
//                         <TileLayer
//                             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                         />
//                         {locations.map((location) => {
//                             const isLowestDistance = location === locations.reduce((prev, curr) => 
//                                 curr.distance < prev.distance ? curr : prev
//                             );
//                             return location.latitude && location.longitude && (
//                                 <Marker 
//                                     key={location.id} 
//                                     position={[location.latitude, location.longitude]}
//                                     icon={isLowestDistance ? lowestDistanceIcon : defaultIcon}
//                                 >
//                                     <Popup>
//                                         <strong>{location.name}</strong><br />
//                                         Address: {location.address}<br />
//                                         {location.distance && `Distance: ${location.distance.toFixed(2)} km`}
//                                     </Popup>
//                                 </Marker>
//                             )
//                         })}
//                     </MapContainer>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Map;




// -------------------night work 




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Loader from '../Loader/Loader'; // Adjust the import path if necessary
// import './map.css'; // Adjust the import path if necessary
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// // Define custom marker icons
// const defaultIcon = new L.Icon({
//     iconUrl: 'https://cdn-icons-png.flaticon.com/512/1189/1189615.png', // Default marker icon URL
//     iconSize: [32, 32], // Size of the icon
//     iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
//     popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
// });

// const lowestDistanceIcon = new L.Icon({
//     iconUrl: 'https://cdn-icons-png.flaticon.com/512/1828/1828856.png', // Red marker icon URL
//     iconSize: [32, 32], // Size of the icon
//     iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
//     popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
// });

// function Map() {
//     const [address, setAddress] = useState('');
//     const [locations, setLocations] = useState([]);
//     const [error, setError] = useState('');
//     const [category, setCategory] = useState('hostal'); // Default category
//     const [loading, setLoading] = useState(false); // Added loading state
//     const [mapCenter, setMapCenter] = useState([11.4058, 76.6836]); // Default center

//     useEffect(() => {
//         // Fetch locations when category changes
//         findLocations();
//     }, [category]);

//     useEffect(() => {
//         // Update map center when locations change
//         if (locations.length > 0) {
//             const minDistanceLocation = locations.reduce((prev, curr) => 
//                 curr.distance < prev.distance ? curr : prev
//             );
//             if (minDistanceLocation) {
//                 setMapCenter([minDistanceLocation.latitude, minDistanceLocation.longitude]);
//             }
//         }
//     }, [locations]);

//     const findLocations = async () => {
//         setError('');
//         setLocations([]);
//         setLoading(true); // Show loader

//         try {
//             const response = await axios.post('http://localhost/petadoption/backend/map/map.php', {
//                 address: address,  // Pass address even if it's empty
//                 category: category
//             });

//             if (response.data.error) {
//                 setError(response.data.error);
//             } else if (response.data.message) {
//                 setError(response.data.message);
//             } else {
//                 setLocations(response.data);
//             }
//         } catch (err) {
//             setError('An error occurred while fetching the data');
//         } finally {
//             setLoading(false); // Hide loader
//         }
//     };

//     const handleCategoryChange = (e) => {
//         setCategory(e.target.value);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         findLocations();  // Recalculate distances based on the address input
//     };

//     return (
//         <div className="pet-hostel-finder">
//             <h1>Find Nearby {category.charAt(0).toUpperCase() + category.slice(1)}s</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Select Category: </label>
//                     <label>
//                         <input 
//                             type="radio" 
//                             value="hostal" 
//                             checked={category === 'hostal'} 
//                             onChange={handleCategoryChange} 
//                         />
//                         Hostal
//                     </label>
//                     <label>
//                         <input 
//                             type="radio" 
//                             value="vetneries" 
//                             checked={category === 'vetneries'} 
//                             onChange={handleCategoryChange} 
//                         />
//                         Doctor
//                     </label>
//                     <label>
//                         <input 
//                             type="radio" 
//                             value="pet" 
//                             checked={category === 'pet'} 
//                             onChange={handleCategoryChange} 
//                         />
//                         Pet
//                     </label>
//                 </div>
//                 <label>
//                     Enter Your Address:
//                     <input 
//                         type="text" 
//                         value={address} 
//                         onChange={(e) => setAddress(e.target.value)} 
//                         required
//                     />
//                 </label>
//                 <button type="submit">Search</button> {/* Submit button */}
//             </form>

//             {loading && <Loader />} {/* Display loader when loading is true */}

//             {error && <p className="error-message">{error}</p>}

//             <div className="map-table-container">
//                 <div className="map-container">
//                     {locations.length > 0 && (
//                         <MapContainer center={mapCenter} zoom={13} style={{ height: '500px', width: '100%' }}>
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
//                                         icon={isLowestDistance ? lowestDistanceIcon : defaultIcon}
//                                     >
//                                         <Popup>
//                                             <strong>{location.name}</strong><br />
//                                             Address: {location.address}<br />
//                                             {location.distance && `Distance: ${location.distance.toFixed(2)} km`}
//                                         </Popup>
//                                     </Marker>
//                                 )
//                             })}
//                         </MapContainer>
//                     )}
//                 </div>
//                 <div className="table-container">
//                     {locations.length > 0 && (
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>Name</th>
//                                     <th>Address</th>
//                                     <th>Distance (km)</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {locations.map((location) => (
//                                     <tr key={location.id}>
//                                         <td>{location.name}</td>
//                                         <td>{location.address}</td>
//                                         <td>{location.distance ? location.distance.toFixed(2) : 'N/A'}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Map;





// make map ----------------------evry table have smaill map----------------------------------------------------





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Loader from '../Loader/Loader'; // Adjust the import path if necessary
// import './map.css'; // Adjust the import path if necessary
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// // Define custom marker icons
// const defaultIcon = new L.Icon({
//     iconUrl: 'https://cdn-icons-png.flaticon.com/512/1189/1189615.png', // Default marker icon URL
//     iconSize: [32, 32], // Size of the icon
//     iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
//     popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
// });

// const lowestDistanceIcon = new L.Icon({
//     iconUrl: 'https://cdn-icons-png.flaticon.com/512/1828/1828856.png', // Red marker icon URL
//     iconSize: [32, 32], // Size of the icon
//     iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
//     popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
// });

// function Map() {
//     const [address, setAddress] = useState('');
//     const [locations, setLocations] = useState([]);
//     const [error, setError] = useState('');
//     const [category, setCategory] = useState('hostal'); // Default category
//     const [loading, setLoading] = useState(false); // Added loading state
//     const [mapCenter, setMapCenter] = useState([11.4058, 76.6836]); // Default center

//     useEffect(() => {
//         // Fetch locations when category changes
//         findLocations();
//     }, [category]);

//     useEffect(() => {
//         // Update map center when locations change
//         if (locations.length > 0) {
//             const minDistanceLocation = locations.reduce((prev, curr) => 
//                 curr.distance < prev.distance ? curr : prev
//             );
//             if (minDistanceLocation) {
//                 setMapCenter([minDistanceLocation.latitude, minDistanceLocation.longitude]);
//             }
//         }
//     }, [locations]);

//     const findLocations = async () => {
//         setError('');
//         setLocations([]);
//         setLoading(true); // Show loader

//         try {
//             const response = await axios.post('http://localhost/petadoption/backend/map/map.php', {
//                 address: address,  // Pass address even if it's empty
//                 category: category
//             });

//             if (response.data.error) {
//                 setError(response.data.error);
//             } else if (response.data.message) {
//                 setError(response.data.message);
//             } else {
//                 setLocations(response.data);
//             }
//         } catch (err) {
//             setError('An error occurred while fetching the data');
//         } finally {
//             setLoading(false); // Hide loader
//         }
//     };

//     const handleCategoryChange = (e) => {
//         setCategory(e.target.value);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         findLocations();  // Recalculate distances based on the address input
//     };

//     return (
//         <div className="pet-hostel-finder">
//             <h1>Find Nearby {category.charAt(0).toUpperCase() + category.slice(1)}s</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Select Category: </label>
//                     <label>
//                         <input 
//                             type="radio" 
//                             value="hostal" 
//                             checked={category === 'hostal'} 
//                             onChange={handleCategoryChange} 
//                         />
//                         Hostal
//                     </label>
//                     <label>
//                         <input 
//                             type="radio" 
//                             value="vetneries" 
//                             checked={category === 'vetneries'} 
//                             onChange={handleCategoryChange} 
//                         />
//                         Doctor
//                     </label>
//                     <label>
//                         <input 
//                             type="radio" 
//                             value="pet" 
//                             checked={category === 'pet'} 
//                             onChange={handleCategoryChange} 
//                         />
//                         Pet
//                     </label>
//                 </div>
//                 <label>
//                     Enter Your Address:
//                     <input 
//                         type="text" 
//                         value={address} 
//                         onChange={(e) => setAddress(e.target.value)} 
//                         required
//                     />
//                 </label>
//                 <button type="submit">Search</button> {/* Submit button */}
//             </form>

//             {loading && <Loader />} {/* Display loader when loading is true */}

//             {error && <p className="error-message">{error}</p>}

//             <div className="map-table-container">
//                 <div className="map-container">
//                     {locations.length > 0 && (
//                         <MapContainer center={mapCenter} zoom={13} style={{ height: '500px', width: '100%' }}>
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
//                                         icon={isLowestDistance ? lowestDistanceIcon : defaultIcon}
//                                     >
//                                         <Popup>
//                                             <strong>{location.name}</strong><br />
//                                             Address: {location.address}<br />
//                                             {location.distance && `Distance: ${location.distance.toFixed(2)} km`}
//                                         </Popup>
//                                     </Marker>
//                                 )
//                             })}
//                         </MapContainer>
//                     )}
//                 </div>
//                 <div className="table-container">
//                     {locations.length > 0 && (
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>Name</th>
//                                     <th>Address</th>
//                                     <th>Distance (km)</th>
//                                     <th>Location</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {locations.map((location) => (
//                                     <tr key={location.id}>
//                                         <td>{location.name}</td>
//                                         <td>{location.address}</td>
//                                         <td>{location.distance ? location.distance.toFixed(2) : 'N/A'}</td>
//                                         <td>
//                                             <div style={{ height: '200px', width: '200px' }}>
//                                                 <MapContainer 
//                                                     center={[location.latitude, location.longitude]} 
//                                                     zoom={15} 
//                                                     style={{ height: '100%', width: '100%' }}
//                                                     scrollWheelZoom={false}
//                                                 >
//                                                     <TileLayer
//                                                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                                                     />
//                                                     <Marker 
//                                                         position={[location.latitude, location.longitude]}
//                                                         icon={defaultIcon}
//                                                     >
//                                                         <Popup>
//                                                             <strong>{location.name}</strong><br />
//                                                             Address: {location.address}
//                                                         </Popup>
//                                                     </Marker>
//                                                 </MapContainer>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Map;


// -----------------------------------------------------------aug 19







// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Loader from '../Loader/Loader'; // Adjust the import path if necessary
// import './map.css'; // Adjust the import path if necessary
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// // Define custom marker icons
// const defaultIcon = new L.Icon({
//     iconUrl: 'https://cdn-icons-png.flaticon.com/512/1189/1189615.png', // Default marker icon URL
//     iconSize: [32, 32], // Size of the icon
//     iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
//     popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
// });

// const lowestDistanceIcon = new L.Icon({
//     iconUrl: 'https://cdn-icons-png.flaticon.com/512/1828/1828856.png', // Red marker icon URL
//     iconSize: [32, 32], // Size of the icon
//     iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
//     popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
// });

// function Map() {
//     const [address, setAddress] = useState('');
//     const [locations, setLocations] = useState([]);
//     const [error, setError] = useState('');
//     const [category, setCategory] = useState('hostal'); // Default category
//     const [loading, setLoading] = useState(false); // Added loading state
//     const [mapCenter, setMapCenter] = useState([11.4058, 76.6836]); // Default center

//     useEffect(() => {
//         // Fetch locations when category changes
//         findLocations();
//     }, [category]);

//     useEffect(() => {
//         // Update map center when locations change
//         if (locations.length > 0) {
//             const validLocations = locations.filter(location => location.latitude && location.longitude);
//             const minDistanceLocation = validLocations.reduce((prev, curr) => 
//                 curr.distance < prev.distance ? curr : prev
//             );
//             if (minDistanceLocation) {
//                 setMapCenter([minDistanceLocation.latitude, minDistanceLocation.longitude]);
//             }
//         }
//     }, [locations]);

//     const findLocations = async () => {
//         setError('');
//         setLocations([]);
//         setLoading(true); // Show loader

//         try {
//             const response = await axios.post('http://localhost/petadoption/backend/map/map.php', {
//                 address: address,  // Pass address even if it's empty
//                 category: category
//             });

//             if (response.data.error) {
//                 setError(response.data.error);
//             } else if (response.data.message) {
//                 setError(response.data.message);
//             } else {
//                 setLocations(response.data.filter(location => location.latitude && location.longitude));
//             }
//         } catch (err) {
//             setError('An error occurred while fetching the data');
//         } finally {
//             setLoading(false); // Hide loader
//         }
//     };

//     const handleCategoryChange = (e) => {
//         setCategory(e.target.value);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         findLocations();  // Recalculate distances based on the address input
//     };

//     return (
//         <div className="pet-hostel-finder">
//             <h1>Find Nearby {category.charAt(0).toUpperCase() + category.slice(1)}s</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Select Category: </label>
//                     <label>
//                         <input 
//                             type="radio" 
//                             value="hostal" 
//                             checked={category === 'hostal'} 
//                             onChange={handleCategoryChange} 
//                         />
//                         Hostal
//                     </label>
//                     <label>
//                         <input 
//                             type="radio" 
//                             value="vetneries" 
//                             checked={category === 'vetneries'} 
//                             onChange={handleCategoryChange} 
//                         />
//                         Doctor
//                     </label>
//                     <label>
//                         <input 
//                             type="radio" 
//                             value="pet" 
//                             checked={category === 'pet'} 
//                             onChange={handleCategoryChange} 
//                         />
//                         Pet
//                     </label>
//                 </div>
//                 <label>
//                     Enter Your Address:
//                     <input 
//                         type="text" 
//                         value={address} 
//                         onChange={(e) => setAddress(e.target.value)} 
//                         required
//                     />
//                 </label>
//                 <button type="submit">Search</button> {/* Submit button */}
//             </form>

//             {loading && <Loader />} {/* Display loader when loading is true */}

//             {error && <p className="error-message">{error}</p>}

//             <div className="map-table-container">
//                 <div className="map-container">
//                     {locations.length > 0 && (
//                         <MapContainer center={mapCenter} zoom={13} style={{ height: '500px', width: '100%' }}>
//                             <TileLayer
//                                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                             />
//                             {locations.map((location) => {
//                                 const isLowestDistance = location === locations.reduce((prev, curr) => 
//                                     curr.distance < prev.distance ? curr : prev
//                                 );
//                                 return (
//                                     <Marker 
//                                         key={location.id} 
//                                         position={[location.latitude, location.longitude]}
//                                         icon={isLowestDistance ? lowestDistanceIcon : defaultIcon}
//                                     >
//                                         <Popup>
//                                             <strong>{location.name}</strong><br />
//                                             Address: {location.address}<br />
//                                             {location.distance && `Distance: ${location.distance.toFixed(2)} km`}
//                                         </Popup>
//                                     </Marker>
//                                 )
//                             })}
//                         </MapContainer>
//                     )}
//                 </div>
//                 <div className="table-container">
//                     {locations.length > 0 && (
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>Name</th>
//                                     <th>Address</th>
//                                     <th>Distance (km)</th>
//                                     <th>Location</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {locations.map((location) => (
//                                     <tr key={location.id}>
//                                         <td>{location.name}</td>
//                                         <td>{location.address}</td>
//                                         <td>{location.distance ? location.distance.toFixed(2) : 'N/A'}</td>
//                                         <td>
//                                             <div style={{ height: '200px', width: '200px' }}>
//                                                 <MapContainer 
//                                                     center={[location.latitude, location.longitude]} 
//                                                     zoom={15} 
//                                                     style={{ height: '100%', width: '100%' }}
//                                                     scrollWheelZoom={false}
//                                                 >
//                                                     <TileLayer
//                                                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                                                     />
//                                                     <Marker 
//                                                         position={[location.latitude, location.longitude]}
//                                                         icon={defaultIcon}
//                                                     >
//                                                         <Popup>
//                                                             <strong>{location.name}</strong><br />
//                                                             Address: {location.address}
//                                                         </Popup>
//                                                     </Marker>
//                                                 </MapContainer>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Map;






























// // Map.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Loader from '../Loader/Loader'; // Adjust the import path if necessary
// import LocationCard from './LocationCard'; // Import the LocationCard component
// import './map.css'; // Adjust the import path if necessary

// function Map() {
//     const [address, setAddress] = useState('');
//     const [locations, setLocations] = useState([]);
//     const [error, setError] = useState('');
//     const [category, setCategory] = useState('hostal'); // Default category
//     const [loading, setLoading] = useState(false); // Added loading state
//     const [mapCenter, setMapCenter] = useState([11.4058, 76.6836]); // Default center

//     useEffect(() => {
//         // Fetch locations when category changes
//         findLocations();
//     }, [category]);

//     useEffect(() => {
//         // Update map center when locations change
//         if (locations.length > 0) {
//             const validLocations = locations.filter(location => location.latitude && location.longitude);
//             const minDistanceLocation = validLocations.reduce((prev, curr) => 
//                 curr.distance < prev.distance ? curr : prev
//             );
//             if (minDistanceLocation) {
//                 setMapCenter([minDistanceLocation.latitude, minDistanceLocation.longitude]);
//             }
//         }
//     }, [locations]);

//     const findLocations = async () => {
//         setError('');
//         setLocations([]);
//         setLoading(true); // Show loader

//         try {
//             const response = await axios.post('http://localhost/petadoption/backend/map/map.php', {
//                 address: address,  // Pass address even if it's empty
//                 category: category
//             });

//             if (response.data.error) {
//                 setError(response.data.error);
//             } else if (response.data.message) {
//                 setError(response.data.message);
//             } else {
//                 setLocations(response.data.filter(location => location.latitude && location.longitude));
//             }
//         } catch (err) {
//             setError('An error occurred while fetching the data');
//         } finally {
//             setLoading(false); // Hide loader
//         }
//     };

//     const handleCategoryChange = (e) => {
//         setCategory(e.target.value);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         findLocations();  // Recalculate distances based on the address input
//     };

//     // Sort locations by distance before rendering
//     const sortedLocations = locations.sort((a, b) => a.distance - b.distance);

//     return (
//         <div className="pet-hostel-finder">
//             <h1>Find Nearby {category.charAt(0).toUpperCase() + category.slice(1)}s</h1>
//             <div className="div_location_from">
//             <div className="div_location_from_sub">


//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Select Category: </label>
//                     <label>
//                         <input 
//                             type="radio" 
//                             value="hostal" 
//                             checked={category === 'hostal'} 
//                             onChange={handleCategoryChange} 
//                         />
//                         Hostal
//                     </label>
//                     <label>
//                         <input 
//                             type="radio" 
//                             value="vetneries" 
//                             checked={category === 'vetneries'} 
//                             onChange={handleCategoryChange} 
//                         />
//                         Doctor
//                     </label>
//                     <label>
//                         <input 
//                             type="radio" 
//                             value="pet" 
//                             checked={category === 'pet'} 
//                             onChange={handleCategoryChange} 
//                         />
//                         Pet
//                     </label>
//                 </div>
//                 <label>
//                     Enter Your Address:
//                     <input 
//                         type="text" 
//                         value={address} 
//                         onChange={(e) => setAddress(e.target.value)} 
//                         required
//                     />
//                 </label>
//                 <button type="submit">Search</button> {/* Submit button */}
//             </form>
//             </div>
//             </div>


//             {loading && <Loader />} {/* Display loader when loading is true */}

//             {error && <p className="error-message">{error}</p>}
// <div className="div_main_location">

//             <div className="map-card-container">
//                 {sortedLocations.length > 0 && sortedLocations.map((location) => (
//                     <LocationCard 
//                         key={location.id} 
//                         location={location} 
//                         isLowestDistance={location === sortedLocations[0]}
//                     />
//                 ))}
//             </div>
//         </div>
//         </div>

//     );
// }

// export default Map;






