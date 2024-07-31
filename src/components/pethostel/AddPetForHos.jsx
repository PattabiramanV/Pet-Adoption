// import React, { useState } from "react";
// import axios from "axios";
// function AddPetHos() {

//   const [formData, setFormData] = useState({
   
//   });



//   const onChangeFun = (e) => {

//     const { name, value } = e.target;

//     setFormData({
//       ...formData,
//       [name]: value
//     });

//   };

  
//   const formSubmitFun = async (e) => {
//     e.preventDefault();

//     try {
//         const data = JSON.stringify(formData);
//         const url = 'http://localhost/Pet-Adaption/Backend/api/hostel.php';

//         const response = await axios({
//             method: 'POST',
//             url: url,
//             data: data,
//             headers: { 'Content-Type': 'application/json' }
//         });

//         alert("Form submitted successfully!");
//         console.log(response.data);  // This will log the response data
//         // console.log(response.status);  // This will log the status code
//       alert(response.data); // This will log the entire response object

//     } catch (error) {
//         console.error("There was an error submitting the form!", error);
//         alert("There was an error submitting the form. Please try again.");
//     }
// };

//   return (
//     <>
//       <div className="max-w-4xl mx-auto p-8 bg-gray-100 shadow-md mb-5 mt-5">
//         <h2 className="text-2xl font-bold mb-6 text-green-800">
//           Need pet hostel services? here to take care of your pet!
//         </h2>
//         <form onSubmit={formSubmitFun}>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//                 Name
//               </label>
//               <input
//                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 type="text"
//                 placeholder="Pattabi Raman V"
//                 onChange={onChangeFun}
//               />
            
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
//                 Contact No
//               </label>
//               <input
//                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
//                 id="phone"
//                 name="phone"
//                 value={formData.phone}
//                 type="text"
//                 placeholder="Contact No"
//                 onChange={onChangeFun}
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                 Email
//               </label>
//               <input
//                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 type="email"
//                 placeholder="pattabiramanvdckap@gmail.com"
//                 onChange={onChangeFun}
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petType">
//                 Pet Type
//               </label>
//               <input
//                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
//                 id="petType"
//                 name="petType"
//                 value={formData.petType}
//                 type="text"
//                 placeholder="Dogs"
//                 onChange={onChangeFun}
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="breed">
//                 Breed
//               </label>
//               <input
//                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
//                 id="breed"
//                 name="breed"
//                 value={formData.breed}
//                 type="text"
//                 placeholder="Breed"
//                 onChange={onChangeFun}
//               />
//             </div>
//             <div className="mt-2">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
//                 Pet’s Gender
//               </label>
//               <select
//                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
//                 id="gender"
//                 name="gender"
//                 value={formData.gender}
//                 onChange={onChangeFun}
//               >
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
//                 Pet's Age
//               </label>
//               <input
//                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
//                 id="age"
//                 name="age"
//                 value={formData.age}
//                 type="number"
//                 placeholder="Pet's Age"
//                 onChange={onChangeFun}
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
//                 City
//               </label>
//               <input
//                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
//                 id="city"
//                 name="city"
//                 value={formData.city}
//                 type="text"
//                 placeholder="City"
//                 onChange={onChangeFun}
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkin">
//                 Check-in Date
//               </label>
//               <input
//                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
//                 id="checkin"
//                 name="checkin"
//                 value={formData.checkin}
//                 type="date"
//                 onChange={onChangeFun}
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkout">
//                 Check-out Date
//               </label>
//               <input
//                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
//                 id="checkout"
//                 name="checkout"
//                 value={formData.checkout}
//                 type="date"
//                 onChange={onChangeFun}
//               />
//             </div>
//             <div className="sm:col-span-2">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="behavior">
//                 Tell us about your Pet's Behaviour
//               </label>
//               <textarea
//                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
//                 id="behavior"
//                 name="behavior"
//                 value={formData.behavior}
//                 rows="4"
//                 placeholder="Describe your pet's behaviour"
//                 onChange={onChangeFun}
//               ></textarea>
//             </div>
//             <div className="sm:col-span-2">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Are you a Pet Parent?</label>
//               <div className="flex items-center space-x-4">
//                 <div className="flex items-center">
//                   <input
//                     className="mr-2"
//                     id="pet-parent-yes"
//                     type="radio"
//                     name="petParent"
//                     value="yes"
//                     onChange={onChangeFun}
//                     checked={formData.petParent === "yes"}
//                   />
//                   <label htmlFor="pet-parent-yes" className="text-gray-700">
//                     Yes
//                   </label>
//                 </div>
//                 <div className="flex items-center">
//                   <input
//                     className="mr-2 hover:cursor-pointer"
//                     id="pet-parent-no"
//                     type="radio"
//                     name="petParent"
//                     value="no"
//                     onChange={onChangeFun}
//                     checked={formData.petParent === "no"}
//                   />
//                   <label htmlFor="pet-parent-no" className="text-gray-700">
//                     No
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div>
//             <button className="w-full  text-white py-2 rounded-lg bg-lightPurpule" type="submit">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

// export default AddPetHos;





import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function AddPetHos() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    price_per_day: '',
    available_time: '',
    address: '',
    description: '',
    photos: []
  });

  const [errors, setErrors] = useState({});

  const onChangeFun = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: files
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    let valid = true;

    if (!formData.name) {
      formErrors.name = "Name is required";
      valid = false;
    }
    if (!formData.contact) {
      formErrors.contact = "Contact No is required";
      valid = false;
    }
    if (!formData.price_per_day) {
      formErrors.price_per_day = "Price per day is required";
      valid = false;
    }
    if (!formData.available_time) {
      formErrors.available_time = "Available time is required";
      valid = false;
    }
    if (!formData.address) {
      formErrors.address = "Address is required";
      valid = false;
    }
    if (formData.photos.length === 0) {
      formErrors.photos = "At least one photo is required";
      valid = false;
    }
    if (!formData.description) {
      formErrors.description = "description is required";
      valid = false;
    }
    setErrors(formErrors);
    return valid;
  };
  const formSubmitFun = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {


console.log(formData.photos[0].name);

console.log(formData);

        const token = localStorage.getItem('token');
        const response = await axios.post(
          'http://localhost/petadoption/backend/hostel/hostelimgupload.php',
          JSON.stringify(formData),
          { headers: { 
            'Authorization': `Bearer ${token}`
          } }
        );
 
        console.log(response.data);
        if (response.status === 200) {
          alert("Successfully added your request!");
          // navigate('/success'); // Uncomment this if you have a success page
        }
  
      } catch (error) {
        
        console.error("There was an error submitting the form!", error.response || error.message);
        alert("There was an error submitting the form. Please try again.");
      }
    }
  };
  

  return (
    <>
      <div className="max-w-4xl mx-auto p-8 bg-gray-100 shadow-md mb-5 mt-5">
        <h2 className="text-2xl font-bold mb-6 text-green-800">
          Need pet hostel services? We're here to take care of your pet!
        </h2>

        <form onSubmit={formSubmitFun}>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                id="name"
                name="name"
                value={formData.name}
                type="text"
                placeholder="Pattabi Raman V"
                onChange={onChangeFun}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="number">
                Contact No
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                id="number"
                name="contact"
                value={formData.contact}
                type="number"
                placeholder="Contact No"
                onChange={onChangeFun}
              />
              {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price_per_day">
                Price per day
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                id="price_per_day"
                name="price_per_day"
                value={formData.price_per_day}
                type="number"
                placeholder="Price per day"
                onChange={onChangeFun}
              />
              {errors.price_per_day && <p className="text-red-500 text-xs mt-1">{errors.price_per_day}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="available_time">
                Available time
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                id="available_time"
                name="available_time"
                value={formData.available_time}
                type="time"
                placeholder="Available time"
                onChange={onChangeFun}
              />
              {errors.available_time && <p className="text-red-500 text-xs mt-1">{errors.available_time}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                Address
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                id="address"
                name="address"
                value={formData.address}
                rows="4"
                placeholder="Enter your address"
                onChange={onChangeFun}
              ></textarea>
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                id="description"
                name="description"
                value={formData.description}
                rows="4"
                placeholder="Describe your pet's behavior"
                onChange={onChangeFun}
              ></textarea>
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>
            
            <div className="sm:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photos">
                Upload Photos
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                id="photos"
                name="photos"
                type="file"
           
                // multiple
                onChange={onChangeFun}
              />
              {errors.photos && <p className="text-red-500 text-xs mt-1">{errors.photos}</p>}
            </div>

          </div>

          <button className="w-full text-white py-2 rounded-lg bg-lightPurpule" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddPetHos;
























// //.......................old...................






// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';

// function AddPetHos() {
  
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//   });

//   const [errors, setErrors] = useState({});

//   const onChangeFun = (e) => {
//     const { name, value } = e.target;
//    console.log(1);
//     setFormData({
//       ...formData,
//       [name]: value
//     });

//     setErrors({
//       ...errors,
//       [name]: ''
//     });
//   };

//   const validateForm = () => {
//    console.log(10);

//     let formErrors = {};
//     let valid = true;

//     if (!formData.name) {
//       formErrors.name = "Name is required";
//       valid = false;
//     }
//     if (!formData.phone) {
//       formErrors.phone = "Contact No is required";
//       valid = false;
//     }
//     if (!formData.email) {
//       formErrors.email = "Email is required";
//       valid = false;
//     }
//     if (!formData.petType) {
//       formErrors.petType = "Pet Type is required";
//       valid = false;
//     }
//     if (!formData.breed) {
//       formErrors.breed = "Breed is required";
//       valid = false;
//     }
//     if (!formData.gender) {
//       formErrors.gender = "Pet’s Gender is required";
//       valid = false;
//     }
//     if (!formData.age) {
//       formErrors.age = "Pet's Age is required";
//       valid = false;
//     }
//     if (!formData.city) {
//       formErrors.city = "City is required";
//       valid = false;
//     }
//     if (!formData.checkin) {
//       formErrors.checkin = "Check-in Date is required";
//       valid = false;
//     }
//     if (!formData.checkout) {
//       formErrors.checkout = "Check-out Date is required";
//       valid = false;
//     }
//     if (!formData.behavior) {
//       formErrors.behavior = "Behavior description is required";
//       valid = false;
//     }
//     if (!formData.petParent) {
//       formErrors.petParent = "Please indicate if you are a pet parent";
//       valid = false;
//     }

//     setErrors(formErrors);
//     return valid;
//   };

//   const formSubmitFun = async (e) => {
//     e.preventDefault();
//     e.target.reset();

//     if (validateForm()) {
//       try {
  
 
//         // navigate('/login');
     
//         const token=localStorage.getItem('token');
//         console.log(token);
//         const data = JSON.stringify(formData);
//         // const url = 'http://localhost/petadoption/Backend/api/hostel.php';

//         const response = await axios.post(
//           'http://localhost/petadoption/Backend/api/hostel.php',
//           data,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );


//         // alert("Form submitted successfully!");
//        if(response.status==200){
        
//         alert("Successfully added your request!!!")

//        }
//         // alert(response.data);


//       } catch (error) {

//         console.error("There was an error submitting the form!", error);
//         alert("There was an error submitting the form. Please try again.");
//       }

//     }
//   };

//   return (
//     <>
//       <div className="max-w-4xl mx-auto p-8 bg-gray-100 shadow-md mb-5 mt-5">
//         <h2 className="text-2xl font-bold mb-6 text-green-800">
//           Need pet hostel services? here to take care of your pet!
//         </h2>
//         <form onSubmit={formSubmitFun}>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//                 Name
//               </label>
//               <input
//                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 type="text"
//                 placeholder="Pattabi Raman V"
//                 onChange={onChangeFun}
//               />
//               {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
//                 Contact No
//               </label>
//               <input
//                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
//                 id="phone"
//                 name="phone"
//                 value={formData.phone}
//                 type="text"
//                 placeholder="Contact No"
//                 onChange={onChangeFun}
//               />
//               {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                 Email
//               </label>
//               <input
//                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 type="email"
//                 placeholder="pattabiramanvdckap@gmail.com"
//                 onChange={onChangeFun}
//               />
//               {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petType">
//                 Pet Type
//               </label>
//               <input
//                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
//                 id="petType"
//                 name="petType"
//                 value={formData.petType}
//                 type="text"
//                 placeholder="Dogs"
//                 onChange={onChangeFun}
//               />
//               {errors.petType && <p className="text-red-500 text-xs mt-1">{errors.petType}</p>}
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="breed">
//                 Breed
//               </label>
//               <input
//                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
//                 id="breed"
//                 name="breed"
//                 value={formData.breed}
//                 type="text"
//                 placeholder="Breed"
//                 onChange={onChangeFun}
//               />
//               {errors.breed && <p className="text-red-500 text-xs mt-1">{errors.breed}</p>}
//             </div>
//             <div className="mt-2">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
//                 Pet’s Gender
//               </label>
//               <select
//                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
//                 id="gender"
//                 name="gender"
//                 value={formData.gender}
//                 onChange={onChangeFun}
//               >
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//               {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
//                 Pet's Age
//               </label>
//               <input
//                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
//                 id="age"
//                 name="age"
//                 value={formData.age}
//                 type="number"
//                 placeholder="Pet's Age"
//                 onChange={onChangeFun}
//               />
//               {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
//                 City
//               </label>
//               <input
//                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
//                 id="city"
//                 name="city"
//                 value={formData.city}
//                 type="text"
//                 placeholder="City"
//                 onChange={onChangeFun}
//               />
//               {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkin">
//                 Check-in Date
//               </label>
//               <input
//                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
//                 id="checkin"
//                 name="checkin"
//                 value={formData.checkin}
//                 type="date"
//                 onChange={onChangeFun}
//               />
//               {errors.checkin && <p className="text-red-500 text-xs mt-1">{errors.checkin}</p>}
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkout">
//                 Check-out Date
//               </label>
//               <input
//                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
//                 id="checkout"
//                 name="checkout"
//                 value={formData.checkout}
//                 type="date"
//                 onChange={onChangeFun}
//               />
//               {errors.checkout && <p className="text-red-500 text-xs mt-1">{errors.checkout}</p>}
//             </div>
//             <div className="sm:col-span-2">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="behavior">
//                 Tell us about your Pet's Behaviour
//               </label>
//               <textarea
//                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
//                 id="behavior"
//                 name="behavior"
//                 value={formData.behavior}
//                 rows="4"
//                 placeholder="Describe your pet's behaviour"
//                 onChange={onChangeFun}
//               ></textarea>
//               {errors.behavior && <p className="text-red-500 text-xs mt-1">{errors.behavior}</p>}
//             </div>
//             <div className="sm:col-span-2">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Are you a Pet Parent?</label>
//               <div className="flex items-center space-x-4">
//                 <div className="flex items-center">
//                   <input
//                     className="mr-2"
//                     id="pet-parent-yes"
//                     type="radio"
//                     name="petParent"
//                     value="yes"
//                     onChange={onChangeFun}
//                     checked={formData.petParent === "yes"}
//                   />
//                   <label htmlFor="pet-parent-yes" className="text-gray-700">
//                     Yes
//                   </label>
//                 </div>
//                 <div className="flex items-center">
//                   <input
//                     className="mr-2 hover:cursor-pointer"
//                     id="pet-parent-no"
//                     type="radio"
//                     name="petParent"
//                     value="no"
//                     onChange={onChangeFun}
//                     checked={formData.petParent === "no"}
//                   />
//                   <label htmlFor="pet-parent-no" className="text-gray-700">
//                     No
//                   </label>
//                 </div>
//               </div>
//               {errors.petParent && <p className="text-red-500 text-xs mt-1">{errors.petParent}</p>}
//             </div>
//           </div>
//           <div>
//             <button className="w-full text-white py-2 rounded-lg bg-lightPurpule" type="submit">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

// export default AddPetHos;
