// import React, { useState } from 'react';

// const EditDoctorInformation = ({ doctor }) => {
//   // State to handle form inputs
//   const [formData, setFormData] = useState({
//     name: doctor.name || '',
//     education: doctor.education || '',
//     have_a_clinic: doctor.have_a_clinic || 'Yes',
//     specialist: doctor.specialist || '',
//     available_timing_from: doctor.available_timing_from || '',
//     available_timing_to: doctor.available_timing_to || '',
//     phone: doctor.phone || '',
//     home_visiting_available: doctor.home_visiting_available || 'Yes',
//     experience: doctor.experience || '',
//     address: doctor.address || '',
//     description: doctor.description || '',
//     email: doctor.email || '',
//     doctor_registerno: doctor.doctor_registerno || '',
//     state: doctor.state || '',
//     city: doctor.city || '',
//     profile_img: null,
//   });

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//   };

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle file input change
//   const handleFileChange = (e) => {
//     setFormData({ ...formData, profile_img: e.target.files[0] });
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Doctor Information</h2>
      
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//           {/* Name */}
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>

//           {/* Education */}
//           <div>
//             <label htmlFor="education" className="block text-sm font-medium text-gray-700">Education</label>
//             <input
//               type="text"
//               id="education"
//               name="education"
//               value={formData.education}
//               onChange={handleChange}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>

//           {/* Have a Clinic */}
//           <div>
//             <label htmlFor="have_a_clinic" className="block text-sm font-medium text-gray-700">Have a Clinic</label>
//             <select
//               id="have_a_clinic"
//               name="have_a_clinic"
//               value={formData.have_a_clinic}
//               onChange={handleChange}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             >
//               <option value="Yes">Yes</option>
//               <option value="No">No</option>
//             </select>
//           </div>

//           {/* Specialist */}
//           <div>
//             <label htmlFor="specialist" className="block text-sm font-medium text-gray-700">Specialist</label>
//             <input
//               type="text"
//               id="specialist"
//               name="specialist"
//               value={formData.specialist}
//               onChange={handleChange}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>

//           {/* Available Timing From */}
//           <div>
//             <label htmlFor="available_timing_from" className="block text-sm font-medium text-gray-700">Available Timing From</label>
//             <input
//               type="text"
//               id="available_timing_from"
//               name="available_timing_from"
//               value={formData.available_timing_from}
//               onChange={handleChange}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>

//           {/* Available Timing To */}
//           <div>
//             <label htmlFor="available_timing_to" className="block text-sm font-medium text-gray-700">Available Timing To</label>
//             <input
//               type="text"
//               id="available_timing_to"
//               name="available_timing_to"
//               value={formData.available_timing_to}
//               onChange={handleChange}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>

//           {/* Phone */}
//           <div>
//             <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
//             <input
//               type="text"
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>

//           {/* Home Visiting Available */}
//           <div>
//             <label htmlFor="home_visiting_available" className="block text-sm font-medium text-gray-700">Home Visiting Available</label>
//             <select
//               id="home_visiting_available"
//               name="home_visiting_available"
//               value={formData.home_visiting_available}
//               onChange={handleChange}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             >
//               <option value="Yes">Yes</option>
//               <option value="No">No</option>
//             </select>
//           </div>

//           {/* Experience */}
//           <div className="sm:col-span-2">
//             <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience</label>
//             <textarea
//               id="experience"
//               name="experience"
//               rows="3"
//               value={formData.experience}
//               onChange={handleChange}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             ></textarea>
//           </div>

//           {/* Address */}
//           <div className="sm:col-span-2">
//             <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
//             <textarea
//               id="address"
//               name="address"
//               rows="3"
//               value={formData.address}
//               onChange={handleChange}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             ></textarea>
//           </div>

//           {/* Description */}
//           <div className="sm:col-span-2">
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//             <textarea
//               id="description"
//               name="description"
//               rows="3"
//               value={formData.description}
//               onChange={handleChange}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             ></textarea>
//           </div>

//           {/* Email */}
//           <div className="sm:col-span-2">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>

//           {/* Profile Image */}
//           <div className="sm:col-span-2">
//             <label htmlFor="profile_img" className="block text-sm font-medium text-gray-700">Profile Image</label>
//             <input
//               type="file"
//               id="profile_img"
//               name="profile_img"
//               onChange={handleFileChange}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>

//           {/* Doctor Register Number */}
//           <div className="sm:col-span-2">
//             <label htmlFor="doctor_registerno" className="block text-sm font-medium text-gray-700">Doctor Register Number</label>
//             <input
//               type="text"
//               id="doctor_registerno"
//               name="doctor_registerno"
//               value={formData.doctor_registerno}
//               onChange={handleChange}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>

//           {/* State */}
//           <div>
//             <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
//             <input
//               type="text"
//               id="state"
//               name="state"
//               value={formData.state}
//               onChange={handleChange}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>

//           {/* City */}
//           <div>
//             <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
//             <input
//               type="text"
//               id="city"
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="mt-6">
//           <button
//             type="submit"
//             className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             Update Information
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditDoctorInformation;
