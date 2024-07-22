import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function BookHos() {
  const location = useLocation();
  const [hostel, setHostel] = useState({});
  const queryParams = new URLSearchParams(location.search);
  let hostelId = queryParams.get('id');
  const [formData, setFormData] = useState({
    serviceType: "",
    petType: "",
    breedType: "",
    petName: "",
    age: "",
    gender: "",
    expectations: "",
    parentName: "",
    parentPhone: "",
    parentState: "",
    parentCity: ""
  });

  useEffect(() => {
    if (hostelId) {
      fetchUserData();
    }
  }, [hostelId]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost/petadoption/Backend/profile/read_profile.php`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setHostel(response.data);
      console.log(hostel);
    } catch (error) {
      console.error('Error fetching hostel data:', error);
    }
  };

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      parentName: hostel.username || "",
      parentState: hostel.state || "",
      parentCity: hostel.city || "",
      parentPhone: hostel.phone || ""
    }));
  }, [hostel]);


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const updatedData = Object.assign({}, formData, hostel);

    try {
      const response = await axios.post(
        `http://localhost/petadoption/Backend/api/hostel.php?hosId=${hostelId}`,
        JSON.stringify(updatedData),
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Response:', response.data);
      alert(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };





  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row p-6 bg-gray-50 w-full">
        <div className="w-full md:w-2/3 p-4 bg-slate-100">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Add Your Pet Details</h2>
          <p className="mb-4 text-gray-600">Please fill in this information. It will help us to know about your pet.</p>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <label htmlFor="serviceType" className="block text-gray-700">Service Type*</label>
                <input
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                  id="serviceType"
                  type="text"
                  value={formData.serviceType}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="petType" className="block text-gray-700">Pet Type*</label>
                <input
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                  id="petType"
                  type="text"
                  value={formData.petType}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="breedType" className="block text-gray-700">Breed Type*</label>
                <input
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                  id="breedType"
                  type="text"
                  value={formData.breedType}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="petName" className="block text-gray-700">Pet Name</label>
                <input
                  type="text"
                  id="petName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.petName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="age" className="block text-gray-700">Age*</label>
                <input
                  type="text"
                  id="age"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              <div>
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
              </div>
            </div>
            <div>
              <label htmlFor="expectations" className="block text-gray-700">Your Expectations from this Service</label>
              <textarea
                id="expectations"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.expectations}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 p-4">
          <div className="bg-white p-4 rounded-md shadow-md">
            <button type="button" className="bg-yellow-500 text-white px-4 py-2 rounded mb-4">Include 2x Food</button>
            <button type="button" className="bg-gray-200 text-gray-700 px-4 py-2 rounded mb-4">Includes 2x Walk</button>
            <div className="border-t border-gray-300 pt-4">
              <h3 className="text-xl font-semibold text-gray-800">Price & Inclusions</h3>
              <p className="text-teal-600 text-2xl font-bold mt-2">Service Price (per day) ₹ 700/-</p>
              <p className="text-gray-600">(Inclusive of all taxes)</p>
              <ul className="mt-4 space-y-2">
                <li className="text-gray-600">Premium Insurance <span className="text-gray-800 font-semibold">Free</span></li>
                <li className="text-gray-600">Daily Photo Updates <span className="text-gray-800 font-semibold">Free</span></li>
                <li className="text-gray-600">24/7 customer support <span className="text-gray-800 font-semibold">Included</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="w-full md:w-2/3 p-4 bg-slate-100 ml-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Add Your Pet Parent Details</h2>
          <p className="mb-4 text-gray-600">Please fill in this information. It will help us to know about you.</p>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <label htmlFor="parentName" className="block text-gray-700">Name*</label>
                <input
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                  id="parentName"
                  type="text"
                  value={formData.parentName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="parentPhone" className="block text-gray-700">Phone*</label>
                <input
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                  id="parentPhone"
                  type="text"
                  value={formData.parentPhone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="parentState" className="block text-gray-700">State*</label>
                <input
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                  id="parentState"
                  type="text"
                  value={formData.parentState}
                  onChange={handleChange}
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
                />
              </div>
            </div>
            <button type="submit" className="w-full rounded-md text-white bg-lightPurpule font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BookHos;











// import React from 'react';
// import axios from 'axios';

// function BookHos() {
//   const handleBooking = async () => {
//     const bookingDetails = {
//       email: 'pattabikrv2002@gmail.com',
//       name: 'Pattabi RAman V',
//       hostel: 'Doggy Yogi',
//     };

//     try {
//       const response = await axios.post('http://localhost/petadoption/Backend/controller/send_email.php', bookingDetails, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

     
//       if (response.status === 200) {
//         alert("Hostel booking sucessfully!!!");
//       } else {
//         console.error(response.data.message);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div>
//       <button className='bg-red-400' onClick={handleBooking}>Book Hostel</button>
//     </div>
//   ); 
// }

// export default BookHos;












// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import BookHosPage from './BookHosPage';

// const BookHos = () => {
//   const location = useLocation();
//   const [hostel, setHostel] = useState({}); // Assuming this gets populated with API data
//   const queryParams = new URLSearchParams(location.search);
//   let hostelId = queryParams.get('id');

//   const [formData, setFormData] = useState({
//     parentEmail: ""
//   });

//   useEffect(() => {
//     // Assuming setHostel is called with the hostel data somewhere in your code
//     // For example purposes, we'll set the hostel state directly here
//     setHostel({ parentEmail: "example@example.com" });
    
//     // Initialize formData with hostel data when hostel state is updated
//     if (hostel.parentEmail) {
//       setFormData(prevState => ({
//         ...prevState,
//         parentEmail: hostel.parentEmail
//       }));
//     }
//   }, [hostel]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle form submission
//     console.log('Form Data:', formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Email</label>
//         <input 
//           type="email" 
//           name="parentEmail" 
//           value={formData.parentEmail} 
//           onChange={handleInputChange} 
//         />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default BookHos;


//......................................................................

// import React, { useState } from 'react';
// // import './CrudExample.css'; // Import Tailwind CSS if using a separate file

// const BookHos = () => {
//   const [items, setItems] = useState([]);
//   const [newItem, setNewItem] = useState('');
//   const [editIndex, setEditIndex] = useState(null);
//   const [editItem, setEditItem] = useState('');

//   const handleAddItem = () => {
//     if (newItem.trim()) {
//       setItems([...items, newItem]);
//       setNewItem('');
//     }
//   };

//   const handleEditItem = (index) => {
//     setEditIndex(index);
//     setEditItem(items[index]);
//   };

//   const handleUpdateItem = () => {
//     if (editItem.trim()) {
//       const updatedItems = items.map((item, index) =>
//         index === editIndex ? editItem : item
//       );
//       setItems(updatedItems);
//       setEditIndex(null);
//       setEditItem('');
//     }
//   };

//   const handleDeleteItem = (index) => {
//     const filteredItems = items.filter((_, i) => i !== index);
//     setItems(filteredItems);
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
//       <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">CRUD Example</h1>

//       {/* Create */}
//       <div className="flex gap-2 mb-6">
//         <input
//           type="text"
//           value={newItem}
//           onChange={(e) => setNewItem(e.target.value)}
//           className="flex-1 p-2 border border-gray-300 rounded-md text-lg"
//           placeholder="Add new item"
//         />
//         <button
//           onClick={handleAddItem}
//           className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
//         >
//           Add Item
//         </button>
//       </div>

//       {/* Read */}
//       <ul className="list-none p-0">
//         {items.map((item, index) => (
//           <li key={index} className="flex justify-between items-center p-2 border-b border-gray-300">
//             {item}
//             <div className="flex gap-2">
//               <button
//                 onClick={() => handleEditItem(index)}
//                 className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDeleteItem(index)}
//                 className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {/* Update */}
//       {editIndex !== null && (
//         <div className="flex gap-2 mt-6">
//           <input
//             type="text"
//             value={editItem}
//             onChange={(e) => setEditItem(e.target.value)}
//             className="flex-1 p-2 border border-gray-300 rounded-md text-lg"
//             placeholder="Update item"
//           />
//           <button
//             onClick={handleUpdateItem}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
//           >
//             Update Item
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookHos;






////.....////////////////////////




























// import React from "react";
// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Input, Select, Form, Button } from "antd";

// const { Option } = Select;
// const { TextArea } = Input;

// function BookHos() {
//   const location = useLocation();
//   const [hostel, setHostel] = useState(null);
//   const queryParams = new URLSearchParams(location.search);
//   let hostelId = queryParams.get("id");
//   const [formData, setFormData] = useState({
//     serviceType: "",
//     petType: "",
//     breedType: "",
//     petName: "",
//     age: "",
//     gender: "",
//     expectations: "",
//     parentName: "",
//     parentPhone: "",
//     parentState: "",
//     parentCity: ""
//   });

//   useEffect(() => {
//     if (hostelId) {
//       fetchUserData(hostelId);
//     }
//   }, [location]);

//   const fetchUserData = async (hostelId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `http://localhost/petadoption/Backend/profile/read_items.php`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setHostel(response.data);
//       console.log(JSON.parse(response.data));
//     } catch (error) {
//       console.error("Error fetching hostel data:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [id]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     console.log(formData);
//     try {
//       const response = await axios.post(
//         `http://localhost/petadoption/Backend/api/hostel.php?hosId=${hostelId}`,
//         JSON.stringify(formData),
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       console.log("Response:", response.data);
//       alert(response.data);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="flex flex-col md:flex-row p-6 bg-gray-50 w-full">
//         <div className="w-full md:w-2/3 p-4 bg-slate-100">
//           <h2 className="text-2xl font-semibold text-blue-600 mb-4">Add Your Pet Details</h2>
//           <p className="mb-4 text-gray-600">Please fill in this information. It will help us to know about your pet.</p>

//           <div className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
//               <div>
//                 <label htmlFor="serviceType" className="block text-gray-700">Service Type*</label>
//                 <Form.Item
//                   name="serviceType"
//                   rules={[{ required: true, message: "Please input service type!" }]}
//                 >
//                   <Input
//                     className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
//                     id="serviceType"
//                     value={formData.serviceType}
//                     onChange={handleChange}
//                   />
//                 </Form.Item>
//               </div>
//               <div>
//                 <label htmlFor="petType" className="block text-gray-700">Pet Type*</label>
//                 <Form.Item
//                   name="petType"
//                   rules={[{ required: true, message: "Please input pet type!" }]}
//                 >
//                   <Input
//                     className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
//                     id="petType"
//                     value={formData.petType}
//                     onChange={handleChange}
//                   />
//                 </Form.Item>
//               </div>
//               <div>
//                 <label htmlFor="breedType" className="block text-gray-700">Breed Type*</label>
//                 <Form.Item
//                   name="breedType"
//                   rules={[{ required: true, message: "Please input breed type!" }]}
//                 >
//                   <Input
//                     className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
//                     id="breedType"
//                     value={formData.breedType}
//                     onChange={handleChange}
//                   />
//                 </Form.Item>
//               </div>
//               <div>
//                 <label htmlFor="petName" className="block text-gray-700">Pet Name</label>
//                 <Form.Item name="petName">
//                   <Input
//                     type="text"
//                     id="petName"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                     value={formData.petName}
//                     onChange={handleChange}
//                   />
//                 </Form.Item>
//               </div>
//               <div>
//                 <label htmlFor="age" className="block text-gray-700">Age*</label>
//                 <Form.Item
//                   name="age"
//                   rules={[{ required: true, message: "Please input age!" }]}
//                 >
//                   <Input
//                     type="text"
//                     id="age"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                     value={formData.age}
//                     onChange={handleChange}
//                   />
//                 </Form.Item>
//               </div>
//               <div>
//                 <label htmlFor="gender" className="block text-gray-700">Gender*</label>
//                 <Form.Item
//                   name="gender"
//                   rules={[{ required: true, message: "Please select gender!" }]}
//                 >
//                   <Select
//                     id="gender"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                     value={formData.gender}
//                     onChange={(value) => handleChange({ target: { id: "gender", value } })}
//                   >
//                     <Option value="">Select</Option>
//                     <Option value="Male">Male</Option>
//                     <Option value="Female">Female</Option>
//                   </Select>
//                 </Form.Item>
//               </div>
//             </div>
//             <div>
//               <label htmlFor="expectations" className="block text-gray-700">Your Expectations from this Service</label>
//               <Form.Item name="expectations">
//                 <TextArea
//                   id="expectations"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   value={formData.expectations}
//                   onChange={handleChange}
//                 ></TextArea>
//               </Form.Item>
//             </div>
//           </div>
//         </div>

//         <div className="w-full md:w-1/3 p-4">
//           <div className="bg-white p-4 rounded-md shadow-md">
//             <button type="button" className="bg-yellow-500 text-white px-4 py-2 rounded mb-4">Include 2x Food</button>
//             <button type="button" className="bg-gray-200 text-gray-700 px-4 py-2 rounded mb-4">Includes 2x Walk</button>
//             <div className="border-t border-gray-300 pt-4">
//               <h3 className="text-xl font-semibold text-gray-800">Price & Inclusions</h3>
//               <p className="text-teal-600 text-2xl font-bold mt-2">Service Price (per day) ₹ 700/-</p>
//               <p className="text-gray-600">(Inclusive of all taxes)</p>
//               <ul className="mt-4 space-y-2">
//                 <li className="text-gray-600">Premium Insurance <span className="text-gray-800 font-semibold">Free</span></li>
//                 <li className="text-gray-600">Daily Photo Updates <span className="text-gray-800 font-semibold">Free</span></li>
//                 <li className="text-gray-600">24/7 customer support <span className="text-gray-800 font-semibold">Included</span></li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-gray-50">
//         <div className="w-full md:w-2/3 p-4 bg-slate-100 ml-6">
//           <h2 className="text-2xl font-semibold text-blue-600 mb-4">Add Your Pet Parent Details</h2>
//           <p className="mb-4 text-gray-600">Please fill in this information. It will help us to know about you.</p>

//           <div className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
//               <div>
//                 <label htmlFor="parentName" className="block text-gray-700">Name*</label>
//                 <Form.Item
//                   name="parentName"
//                   rules={[{ required: true, message: "Please input parent name!" }]}
//                 >
//                   <Input
//                     className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
//                     id="parentName"
//                     value={formData.parentName}
//                     onChange={handleChange}
//                   />
//                 </Form.Item>
//               </div>
//               <div>
//                 <label htmlFor="parentPhone" className="block text-gray-700">Phone*</label>
//                 <Form.Item
//                   name="parentPhone"
//                   rules={[{ required: true, message: "Please input parent phone!" }]}
//                 >
//                   <Input
//                     className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
//                     id="parentPhone"
//                     value={formData.parentPhone}
//                     onChange={handleChange}
//                   />
//                 </Form.Item>
//               </div>
//               <div>
//                 <label htmlFor="parentState" className="block text-gray-700">State*</label>
//                 <Form.Item
//                   name="parentState"
//                   rules={[{ required: true, message: "Please input parent state!" }]}
//                 >
//                   <Input
//                     className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
//                     id="parentState"
//                     value={formData.parentState}
//                     onChange={handleChange}
//                   />
//                 </Form.Item>
//               </div>
//               <div>
//                 <label htmlFor="parentCity" className="block text-gray-700">City</label>
//                 <Form.Item name="parentCity">
//                   <Input
//                     type="text"
//                     id="parentCity"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                     value={formData.parentCity}
//                     onChange={handleChange}
//                   />
//                 </Form.Item>
//               </div>
//             </div>
//             <Button
//               type="primary"
//               htmlType="submit"
//               className="w-full rounded-md text-white bg-lightPurpule font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
//             >
//               Book Now
//             </Button>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// }

// export default BookHos;







