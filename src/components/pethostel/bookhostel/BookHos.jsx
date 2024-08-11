// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import Loader from '../Loader/Loader'; // Import the Loader component
// import { Form, Input, Button, Typography, Divider, message } from "antd";

// function BookHos() {
//   const [loading, setLoading] = useState(false); // Loading state
//   const token = localStorage.getItem('token');
//   const location = useLocation();
//   const [currentUser, setCurrentUser] = useState({});
//   const [hostels, setHostels] = useState([]);
//   const queryParams = new URLSearchParams(location.search);
//   const hostelId = queryParams.get('id');
//   const [selectedHostel, setSelectedHostel] = useState({
//     id: '',
//     name: '',
//     address: '',
//     phone: '',
//     price: ''
//   });

//   const [formData, setFormData] = useState({
//     serviceType: "",
//     petType: "",
//     breedType: "",
//     petName: "",
//     age: null,
//     gender: "",
//     expectations: "",
//     parentName: "",
//     parentPhone: "",
//     parentState: "",
//     parentCity: ""
//   });

//   useEffect(() => {
//     fetchUserData();
//     getAllHosFun();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost/petadoption/backend/profile/read_items.php`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setCurrentUser(response.data);

//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };

//   const getAllHosFun = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost/petadoption/backend/api/hostel.php`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setHostels(response.data);

//       // Automatically select the hostel if hostelId is provided
//       if (hostelId) {
//         const selected = response.data.find(hostel => String(hostel.id) === String(hostelId));
//         if (selected) {
//           setSelectedHostel(prevState => ({
//             id: selected.id,
//             name: selected.name,
//             address: selected.address,
//             phone: selected.contact,
//             price: selected.price_per_day
//           }));
//           setFormData(prevState => ({
//             ...prevState,
//             hostelId: selected.id
//           }));
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching hostel data:', error);
//     }
//   };

//   useEffect(() => {
//     setFormData((prevState) => ({
//       ...prevState,
//       parentName: currentUser.username || "",
//       parentState: currentUser.state || "",
//       parentCity: currentUser.city || "",
//       parentPhone: currentUser.phone || ""
//     }));
//   }, [currentUser]);

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [id]: value,
//     }));
//   };

//   const handleHostelChange = (e) => {
//     const selectedId = e.target.value;
//     const selected = hostels.find(hostel => String(hostel.id) === String(selectedId));
//     if (selected) {
//       setSelectedHostel({
//         id: selected.id,
//         name: selected.name,
//         address: selected.address,
//         phone: selected.contact,
//         price: selected.price_per_day
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Set loading to true when submitting

//     const updatedData = { ...formData, hostelId: selectedHostel.id };

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/api/hostel.php?hosid=${selectedHostel.id}`,
//         JSON.stringify(updatedData),
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       console.log('Response:', response.data);
//      if(response.status==200){
//       message.success('Hostel Booking Sucessfull');

//      }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('Error submitting the booking. Please try again.');
//     } finally {
//       setLoading(false); // Set loading to false after response is received
//     }
//   };

//  // Display loader while loading

//   return (
//     <>
//       {loading && <Loader />}
//       <form onSubmit={handleSubmit}>
//         <div className="flex flex-col md:flex-row p-6 bg-gray-50 w-full">
//           <div className="w-full md:w-2/3 p-4 bg-slate-100">
//             <h2 className="text-2xl font-semibold text-blue-600 mb-4">Add Your Pet Details</h2>
//             <p className="mb-4 text-gray-600">Please fill in this information. It will help us to know about your pet.</p>

//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
//                 {/* <div>
//                   <label htmlFor="serviceType" className="block text-gray-700">Service Type*</label>
//                   <input
//                     className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
//                     id="serviceType"
//                     type="text"
//                     value={formData.serviceType}
//                     onChange={handleChange}
//                   />
//                 </div> */}
//           <div>
//                  <label htmlFor="checkin" className="block text-gray-700">Check-In Date*</label>
//                  <input
//                     className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
//                     id="checkin"
//                     type="date"
//                     value={formData.checkin}
//                     onChange={(e) => setFormData({ ...formData, checkin: e.target.value })}
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="checkout" className="block text-gray-700">Check-Out Date*</label>
//                   <input
//                     className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
//                     id="checkout"
//                     type="date"
//                     value={formData.checkout}
//                     onChange={(e) => setFormData({ ...formData, checkout: e.target.value })}
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="petType" className="block text-gray-700">Pet Type*</label>
//                   <input
//                     className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
//                     id="petType"
//                     type="text"
//                     value={formData.petType}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="breedType" className="block text-gray-700">Breed Type*</label>
//                   <input
//                     className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
//                     id="breedType"
//                     type="text"
//                     value={formData.breedType}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div>
//                   <label  htmlFor="petName" className="block text-gray-700">Pet Name</label>
//                   <input
//                     type="text"
//                     id="petName"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                     value={formData.petName}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="age" className="block text-gray-700">Age*</label>
//                   <input
//                     type="number"
//                     id="age"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                     value={formData.age}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="gender" className="block text-gray-700">Gender*</label>
//                   <select
//                     id="gender"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                     value={formData.gender}
//                     onChange={handleChange}
//                   > 
//                     <option value="">Select</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="hostel" className="block text-gray-700">Select Hostel*</label>
//                 <select
//   id="hostel"
//   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//   value={selectedHostel.id}
//   onChange={handleHostelChange}
// >
//   {hostels.length > 0 ? (
//     hostels.map(hostel => (
//       <option key={hostel.id} value={hostel.id}>
//         {hostel.name}
//       </option>
//     ))
//   ) : (
//     ''
//   )}
// </select>

//               </div>

//               <div>
//                 <label htmlFor="expectations" className="block text-gray-700">Address</label>
//                 <textarea
//                   id="expectations"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   value={selectedHostel.address}
//                   onChange={handleChange}
//                   readOnly
//                 ></textarea>
//               </div>
//             </div>
//           </div>

//           <div className="w-full md:w-1/3 p-4">
//             <div className="bg-white p-4 rounded-md shadow-md">
//               <button type="button" className="bg-yellow-500 text-white px-4 py-2 rounded mb-4">Include 2x Food</button>
//               <button type="button" className="bg-gray-200 text-gray-700 px-4 py-2 rounded mb-4">Includes 2x Walk</button>
//               <div className="border-t border-gray-300 pt-4">
//                 <h3 className="text-xl font-semibold text-gray-800">Price & Inclusions</h3>
//                 <p className="text-teal-600 text-2xl font-bold mt-2">Service Price (per day) ₹ {selectedHostel.price}/-</p>
//                 <p className="text-gray-600">(Inclusive of all taxes)</p>
//                 <ul className="mt-4 space-y-2">
//                   <li className="text-gray-600">Premium Insurance <span className="text-gray-800 font-semibold">Free</span></li>
//                   <li className="text-gray-600">Daily Photo Updates <span className="text-gray-800 font-semibold">Free</span></li>
//                   <li className="text-gray-600">24/7 customer support <span className="text-gray-800 font-semibold">Included</span></li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>


// {/* 
//         {selectedHostel && (
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold">Selected Hostel Address:</h3>
//           <p>{selectedHostel.address}</p>
//         </div>
        
//       )} */}






//         <div className="bg-gray-50">
//           <div className="w-full md:w-2/3 p-4 bg-slate-100 ml-6">
//             <h2 className="text-2xl font-semibold text-blue-600 mb-4">Add Your Pet Parent Details</h2>
//             <p className="mb-4 text-gray-600">Please fill in this information. It will help us to know about you.</p>

//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
//                 <div>
//                   <label htmlFor="parentName" className="block text-gray-700">Name*</label>
//                   <input
//                     className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
//                     id="parentName"
//                     type="text"
//                     value={formData.parentName}
//                     onChange={handleChange}
//                     readOnly
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="parentPhone" className="block text-gray-700">Phone*</label>
//                   <input
//                     className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
//                     id="parentPhone"
//                     type="text"
//                     value={formData.parentPhone}
//                     onChange={handleChange}
//                     readOnly
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="parentState" className="block text-gray-700">State*</label>
//                   <input
//                     className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
//                     id="parentState"
//                     type="text"
//                     value={formData.parentState}
//                     onChange={handleChange}
//                     readOnly
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="parentCity" className="block text-gray-700">City</label>
//                   <input
//                     type="text"
//                     id="parentCity"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                     value={formData.parentCity}
//                     onChange={handleChange}
//                     readOnly
//                   />
//                 </div>
//               </div>
//               <button type="submit" className="w-full rounded-md text-white bg-lightPurpule font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
//                 Book Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
    
//     </>
//   );
// };

// export default BookHos;





//..................................New...................................//



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../../Loader/Loader'; // Import the Loader component
import { Form, Input, Button, Typography, Divider, message,notification } from "antd";
import './bookhostel.css';

function BookHos() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state
  const token = localStorage.getItem('token');
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  const [hostels, setHostels] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const hostelId = queryParams.get('id');
  const [errors, setErrors] = useState({});

  const [selectedHostel, setSelectedHostel] = useState({
    id: '',
    name: '',
    address: '',
    phone: '',
    price: ''
  });

  const [formData, setFormData] = useState({
    serviceType: "",
    petType: "",
    breedType: "",
    petName: "",
    age: null,
    gender: "",
    expectations: "",
    parentName: "",
    parentPhone: "",
    parentState: "",
    parentCity: "",
    checkin: "",
    checkout: ""
  });

  useEffect(() => {
    fetchUserData();
    getAllHosFun();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/profile/read_items.php`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCurrentUser(response.data);

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const getAllHosFun = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/hostel.php`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHostels(response.data);

      // Automatically select the hostel if hostelId is provided
      if (hostelId) {
        const selected = response.data.find(hostel => String(hostel.id) === String(hostelId));
        if (selected) {
          setSelectedHostel(prevState => ({
            id: selected.id,
            name: selected.name,
            address: selected.address,
            phone: selected.contact,
            price: selected.price_per_day
          }));
          setFormData(prevState => ({
            ...prevState,
            hostelId: selected.id
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching hostel data:', error);
    }
  };

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      parentName: currentUser.username || "",
      parentState: currentUser.state || "",
      parentCity: currentUser.city || "",
      parentPhone: currentUser.phone || ""
    }));
  }, [currentUser]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    setErrors(prevErrors => ({
      ...prevErrors,
      [id]: ''
    }));

  };

  const handleHostelChange = (e) => {
    const selectedId = e.target.value;
    const selected = hostels.find(hostel => String(hostel.id) === String(selectedId));
    if (selected) {
      setSelectedHostel({
        id: selected.id,
        name: selected.name,
        address: selected.address,
        phone: selected.contact,
        price: selected.price_per_day
      });

      
    }
  };

  const calculateDaysAndPrice = () => {
    const checkinDate = new Date(formData.checkin);
    const checkoutDate = new Date(formData.checkout);
    const timeDifference = checkoutDate - checkinDate;
    const days = Math.ceil(timeDifference / (1000 * 3600 * 24));
    const totalPrice = days * selectedHostel.price;
    return { days, totalPrice };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if(validateForm()){
     
    setLoading(true); // Set loading to true when submitting

    const { days, totalPrice } = calculateDaysAndPrice();

    console.log(days);
    const updatedData = { ...formData, hostelId: selectedHostel.id,days:days,price:totalPrice};

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/hostel.php?hosid=${selectedHostel.id}`,
        JSON.stringify(updatedData),
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Response:', response.data);
     if(response.status==200){
      notification.success({
        message: 'Form Submitted Successfully!',
        description: 'Hostel Booking Sucessfull.',
      });
      
      // message.success('Hostel Booking Sucessfull');
      navigate('/pethostel')
     }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting the booking. Please try again.');
    } finally {
      setLoading(false); // Set loading to false after response is received
    }
  }
  else {
    setTimeout(() => {
   setErrors({});
    }, 4000); // 60000 milliseconds = 1 minute
  }

  };

  const currentDayShowFun = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
  
    const todayFormatted = `${yyyy}-${mm}-${dd}`;
  
    // Calculate the next day
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);
    const nextYyyy = nextDay.getFullYear();
    const nextMm = String(nextDay.getMonth() + 1).padStart(2, '0');
    const nextDd = String(nextDay.getDate()).padStart(2, '0');
  
    const nextDayFormatted = `${nextYyyy}-${nextMm}-${nextDd}`;
  
    return {
      today: todayFormatted,
      nextDay: nextDayFormatted
    };
  };
  
  // Example usage:
  const dates = currentDayShowFun();


  //............................Validation............................//

  const validateForm = () => {
    let formErrors = {};
    let valid = true;
console.log(formData);
    if (!formData.checkin) {
     
      formErrors.checkin = "checkin date is required";
      valid = false;
    }
   
   
    if (!formData.checkout) {
      formErrors.checkout = "checkout adte is required";
      valid = false;
    }
    if (!formData.petType) {
      formErrors.petType = "Pettype is required";
      valid = false;
    }
    if (!formData.breedType) {
      formErrors.breedType = "breedType is required";
      valid = false;
    }
    if (!formData.petName) {
      formErrors.petName = " petName is required";
      valid = false;
    }
    if (!formData.age) {
      formErrors.age = "age is required";
      valid = false;
    }
    if (!formData.expectations) {
      formErrors.expectations = "expectations is required";
      valid = false;
    }
    setErrors(formErrors);
    return valid;
  };

  const getNextDay = (dateStr) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  };
  
 
 // Display loader while loading

  return (
    <>
      {loading && <Loader />}
      <form onSubmit={handleSubmit} className='bookHostelParent'>

        <div className=" flex flex-col md:flex-row p-6 items-end ">
          <div className="w-full md:w-2/3 p-4 ">
            <h2 className="formTitle mb-4">Add Your Pet Details</h2>
            <p className="mb-4 text-gray-600">Please fill in this information. It will help us to know about your pet.</p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <label htmlFor="checkin" className="block text-gray-700">Check-In Date <span className='star'>*</span></label>
                  <input
                    className=""
                    id="checkin"
                    type="date"
                    min={dates.today}
                    value={formData.checkin}
                    onChange={handleChange}
                  />
                {errors.checkin && <p className="text-red-500 text-xs mt-1">{errors.checkin}</p>}

                </div>

                <div>
                  <label htmlFor="checkout" className="block text-gray-700">Check-Out Date <span className='star'>*</span></label>
                  <input
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                    id="checkout"
                    type="date"
                    min={formData.checkin==''?dates.nextDay:getNextDay(formData.checkin)}
                    value={formData.checkout}
                    onChange={handleChange}
                  />
                {errors.checkout && <p className="text-red-500 text-xs mt-1">{errors.checkout}</p>}

                </div>

                <div>
                  <label htmlFor="petType" className="block text-gray-700">Pet Type</label>
                  <input
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                    id="petType"
                    type="text"
                    placeholder='Pet type'
                    value={formData.petType}
                    onChange={handleChange}
                  />
                {errors.petType && <p className="text-red-500 text-xs mt-1">{errors.petType}</p>}
                  
                </div>
                <div>
                  <label htmlFor="breedType" className="block text-gray-700">Breed Type</label>
                  <input
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                    id="breedType"
                    type="text"
                    placeholder='Breed type'
                    value={formData.breedType}
                    onChange={handleChange}
                  />
                {errors.breedType && <p className="text-red-500 text-xs mt-1">{errors.breedType}</p>}

                </div>
                <div>
                  <label  htmlFor="petName" className="block text-gray-700">Pet Name <span className='star'>*</span></label>
                  <input
                    type="text"
                    id="petName"
                    placeholder='Pet name'
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.petName}
                    onChange={handleChange}
                  />
                {errors.petName && <p className="text-red-500 text-xs mt-1">{errors.petName}</p>}

                </div>
                <div>
                  <label htmlFor="age" className="block text-gray-700">Age </label>
                  <input
                    type="number"
                    id="age"
                     placeholder='Pet age'
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.age}
                    onChange={handleChange}
                  />
                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}

                </div>
                {/* <div>
                  <label htmlFor="gender" className="block text-gray-700">Gender*</label>
                  <select
                    id="gender"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.gender}
                    onChange={handleChange}
                  > 
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div> */}
              </div>

              <div>
                <label htmlFor="hostel" className="block text-gray-700">Select Hostel <span className='star'>*</span></label>
                <select
                  id="hostel"
                  className="w-full px-3 bg-white "
                  onChange={handleHostelChange}
                  value={selectedHostel.id}
                >
                  <option value="">Select a Hostel</option>
                  {hostels.map(hostel => (
                    <option key={hostel.id} value={hostel.id}>{hostel.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="expectations" className="block text-gray-700">Expectations</label>
                <textarea
                  id="expectations"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.expectations}
                  onChange={handleChange}
                />
                {errors.expectations && <p className="text-red-500 text-xs mt-1">{errors.expectations}</p>}

              </div>
            </div>
{/* 
            <div className="mt-4">
              <Button
                type="primary"
                htmlType="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div> */}
          </div>

      <div className="w-full md:w-1/3 p-4 rightTwoCardParent ">
  <div className="mb-4 p-4 bg-blue-50  rounded-lg">
  <h2 className="text-2xl font-bold text-blue-400 mb-4">Your Selected Hostel</h2>

    <p className="text-lg  text-gray-700 mb-2"><strong>Name:</strong> {selectedHostel.name}</p>
    <p className="text-lg text-gray-700 mb-2"><strong>Address:</strong> {selectedHostel.address}</p>
    <p className="text-lg text-gray-700 mb-2"><strong>Phone:</strong> {selectedHostel.phone}</p>
    <p className="text-lg text-gray-700 mb-4"><strong>Price per Day:</strong> ₹{selectedHostel.price}</p>
  </div>

  {formData.checkin && formData.checkout && (
    <>
  <hr className='font-semibold'></hr>

    <div className="mt-4 p-4 bg-blue-50  rounded-lg">
      <h2 className="text-xl font-bold text-blue-400 mb-2">Booking Summary</h2>
      <p className="text-lg text-gray-800 mb-2"><strong>Check-in Date:</strong> {formData.checkin}</p>
      <p className="text-lg text-gray-800 mb-2"><strong>Check-out Date:</strong> {formData.checkout}</p>
      <p className="text-lg font-semibold text-gray-800 mb-2"><strong>Total Days:</strong> {calculateDaysAndPrice().days}</p>
      <p className="text-lg font-bold text-gray-800"><strong>Total Price:</strong> ₹{calculateDaysAndPrice().totalPrice}</p>
    </div>
    </>
  )}
</div>

        </div>


        <div className="petParentDiv">
          <div className="w-full md:w-2/3 p-4  ml-6">
            <h2 className="formTitle mb-4">Add Your Pet Parent Details</h2>
            <p className="mb-4 ">Please fill in this information. It will help us to know about you.</p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                  <label htmlFor="parentName" className="block text-gray-700">Name</label>
                  <input
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                    id="parentName"
                    type="text"
                    value={formData.parentName}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="parentPhone" className="block text-gray-700">Phone</label>
                  <input
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                    id="parentPhone"
                    type="text"
                    value={formData.parentPhone}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="parentState" className="block text-gray-700">State</label>
                  <input
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                    id="parentState"
                    type="text"
                    value={formData.parentState}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="parentCity" className="block text-gray-700">City</label>
                  <input
                    type="text"
                    id="parentCity"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.parentCity}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>
              <div className=' mt-20'>
              <button type="submit" className="">
                Book Now
              </button>
              </div>
            </div>     
              </div>
       </div>
      </form>
    </>
  );
}

export default BookHos;
































