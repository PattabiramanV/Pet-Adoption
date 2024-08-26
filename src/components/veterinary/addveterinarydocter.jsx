// import React, { useState } from 'react';
// import axios from 'axios';
// import { notification } from 'antd';
// import Loader from '../Loader/Loader';

// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
// import TextField from '@mui/material/TextField';

// import './normaltable.css';
// function AddVeterinaryDoctor() {
//     const [doctorData, setDoctorData] = useState({
//         name: "",
//         education: "",
//         have_a_clinic: "",
//         specialist: "",
//         available_timing: "",
//         phone: "",
//         home_visiting_available: "",
//         experience: "",
//         address: "",
//         description: "",
//         email: "",
//         city: "",
//         doctor_registerno: "",
//         profile_img: null,
//     });
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const handleFieldsChange = (e) => {
//         const { name, value, type, files } = e.target;
//         if (type === 'file') {
//             setDoctorData({ ...doctorData, [name]: files[0] });
//         } else {
//             setDoctorData({ ...doctorData, [name]: value });
//         }
//     };

//     const validateForm = () => {
//         const errors = {};
//         if (!doctorData.name) errors.name = 'Doctor name is required';
//         if (!doctorData.education) errors.education = 'Education is required';
//         if (!doctorData.phone || doctorData.phone.length < 9) errors.phone = 'Valid contact number is required';
//         if (!doctorData.email || !/\S+@\S+\.\S+/.test(doctorData.email)) errors.email = 'Valid email is required';
//         if (!doctorData.have_a_clinic) errors.have_a_clinic = 'Select if you have a clinic';
//         if (!doctorData.home_visiting_available) errors.home_visiting_available = 'Select if home visiting is available';
//         if (!doctorData.specialist) errors.specialist = 'Specialization is required';
//         if (!doctorData.address) errors.address = 'Address is required';
//         if (!doctorData.available_timing_from || !doctorData.available_timing_to) errors.available_timing = 'Available timing is required';
//         if (!doctorData.description) errors.description = 'Description is required';
//         if (!doctorData.doctor_registerno) errors.doctor_registerno = 'Doctor register number is required';
//         if (!doctorData.profile_img) errors.profile_img = 'Profile image is required';

//         console.log("Validation Errors:", errors);
//         return errors;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         const formErrors = validateForm();
//         if (Object.keys(formErrors).length === 0) {
//             const formData = new FormData();
//             console.log("Form Errors:", formErrors);
//             const token = localStorage.getItem('token');
//             for (const key in doctorData) {
//                 formData.append(key, doctorData[key]);
//             }

//             try {
//                 const res = await axios.post(
//                     `${VITE_PROFILE_BASE_URL}/api/addvetrinarydocformapi.php`,
//                     formData,
//                     {
//                         headers: {
//                             "Authorization": `Bearer ${token}`,
//                             "Content-Type": "multipart/form-data"
//                         },
//                     }
//                 );
//                 notification.success({
//                     message: 'Doctor Profile Added Successfully!',
//                     description: 'Your doctor profile has been submitted successfully.',
//                 });

//                 setError(null);
//                 setDoctorData({
//                     name: "",
//                     education: "",
//                     have_a_clinic: "",
//                     specialist: "",
//                     available_timing: "",
//                     phone: "",
//                     home_visiting_available: "",
//                     experience: "",
//                     city: "",
//                     address: "",                 
//                     description: "",
//                     email: "",
//                     doctor_registerno: "",
//                     profile_img: null,
//                 });
//             } catch (err) {
//                 notification.error({
//                     message: 'Failed to Submit the Form',
//                     description: 'Please try again later.',
//                 });
//                 setSuccess(null);
//             } finally {
//                 setLoading(false);
//             }
//         } else {
//             notification.error({
//                 message: 'Please Fix the Errors Above',
//                 description: 'Ensure all fields are filled out correctly.',
//             });
//             setSuccess(null);
//             setLoading(false);
//         }
//     };

//     if (loading) return <Loader />;
//     return ( 
//        <>
//         <div className="vetrinaryform max-w-4xl mx-auto p-8 mb-5 mt-5">
//                  <h2 className="addHostelTitle">Add Veterinary Doctor Information</h2>
//                  <form onSubmit={handleSubmit} encType="multipart/form-data">//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
//                          <div>
//                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//                                  Doctor Name <span className="star">*</span>
//                              </label>
//                              <input
//                                 className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.name ? 'border-red-500' : ''}`}
//                                 id="name"
//                                 type="text"
//                                 name="name"
//                                 value={doctorData.name}
//                                 onChange={handleFieldsChange}
//                                 placeholder="Doctor Name"
//                             />
//                             {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="education">
//                                 Education <span className="star">*</span>
//                             </label>
//                             <input
//                                 className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.education ? 'border-red-500' : ''}`}
//                                 id="education"
//                                 type="text"
//                                 name="education"
//                                 value={doctorData.education}
//                                 onChange={handleFieldsChange}
//                                 placeholder="Education"
//                             />
//                             {errors.education && <p className="text-red-600 text-sm">{errors.education}</p>}
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
//                                 Contact No <span className="star">*</span>
//                             </label>
//                             <input
//                                 className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.phone ? 'border-red-500' : ''}`}
//                                 id="phone"
//                                 type="number"
//                                 name="phone"
//                                 value={doctorData.phone}
//                                 onChange={handleFieldsChange}
//                                 placeholder="Contact No"
//                             />
//                             {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">
//                                 Experience
//                             </label>
//                             <input
//                                 className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.experience ? 'border-red-500' : ''}`}
//                                 id="experience"
//                                 type="number"
//                                 name="experience"
//                                 value={doctorData.experience}
//                                 onChange={handleFieldsChange}
//                                 placeholder="Experience"
//                             />
//                             {errors.experience && <p className="text-red-600 text-sm">{errors.experience}</p>}
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="available_timing_from">
//                                 Available Timing <span className="star">*</span>
//                             </label>
//                             <div className="flex space-x-2 ">
//                                 <LocalizationProvider dateAdapter={AdapterMoment}> {/* Correct the adapter */}
//                                     <TimePicker
//                                         label="From Time"
//                                         value={doctorData.available_timing_from}
//                                         onChange={(newValue) => handleTimeChange('available_timing_from', newValue)}
//                                         renderInput={(params) => <TextField {...params} />}
//                                     />
//                                     <TimePicker
//                                         label="To Time"
//                                         value={doctorData.available_timing_to}
//                                         onChange={(newValue) => handleTimeChange('available_timing_to', newValue)}
//                                         renderInput={(params) => <TextField {...params} />}
//                                     />
//                                 </LocalizationProvider>
//                             </div>
//                             {errors.available_timing && <p className="text-red-600 text-sm">{errors.available_timing}</p>}
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profile_img">
//                                 Doctor Profile Image <span className="star">*</span>
//                             </label>
//                             <input
//                                 className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.profile_img ? 'border-red-500' : ''}`}
//                                 id="profile_img"
//                                 type="file"
//                                 name="profile_img"
//                                 onChange={handleFieldsChange}
//                             />
//                             {errors.profile_img && <p className="text-red-600 text-sm">{errors.profile_img}</p>}
//                         </div>
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
//                         {/* Add more fields as required */}
//                     </div>
//                     <div className="text-center">
//                         <button
//                             className=" submitbtn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                             type="submit"
//                             disabled={loading}
//                         >
//                             {loading ? 'Submitting...' : 'Submit'}
//                         </button>
//                     </div>
//                 </form>
//                 {loading && <Loader />}
//             </div>

//             </> 
//     );
// }

// export default AddVeterinaryDoctor;




// .......................................................................


import React, { useState } from 'react';
import axios from 'axios';
import { notification } from 'antd';
import Loader from '../Loader/Loader';

import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import TextField from '@mui/material/TextField';

import './normaltable.css';


function AddVeterinaryDoctor() {
    const [doctorData, setDoctorData] = useState({
        name: "",
        education: "",
        have_a_clinic: "",
        specialist: "",
        available_timing_from: null,
        available_timing_to: null,
        phone: "",
        home_visiting_available: "",
        experience: "",
        address: "",
        description: "",
        email: "",
        city: "",
        state: "",
        doctor_registerno: "",
        profile_img: null,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleFieldsChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setDoctorData({ ...doctorData, [name]: files[0] });
        } else {
            setDoctorData({ ...doctorData, [name]: value });
        }
    };

    const handleTimeChange = (name, value) => {
        setDoctorData({ ...doctorData, [name]: value });
    };

    const validateForm = () => {
        const errors = {};
        if (!doctorData.name) errors.name = 'Doctor name is required';
        if (!doctorData.education) errors.education = 'Education is required';
        if (!doctorData.phone || doctorData.phone.length < 9) errors.phone = 'Valid contact number is required';
        if (!doctorData.email || !/\S+@\S+\.\S+/.test(doctorData.email)) errors.email = 'Valid email is required';
        if (!doctorData.have_a_clinic) errors.have_a_clinic = 'Select if you have a clinic';
        if (!doctorData.home_visiting_available) errors.home_visiting_available = 'Select if home visiting is available';
        if (!doctorData.specialist) errors.specialist = 'Specialization is required';
        if (!doctorData.address) errors.address = 'Address is required';
        if (!doctorData.available_timing_from || !doctorData.available_timing_to) errors.available_timing = 'Available timing is required';
        if (!doctorData.description) errors.description = 'Description is required';
        if (!doctorData.doctor_registerno) errors.doctor_registerno = 'Doctor register number is required';
        if (!doctorData.profile_img) errors.profile_img = 'Profile image is required';
        if (!doctorData.experience) errors.experience = 'Experience is required';
        if (!doctorData.city) errors.city = 'City is required';
        if (!doctorData.state) errors.state = 'State is required';

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            const formData = new FormData();
            const token = localStorage.getItem('token');
            for (const key in doctorData) {
                formData.append(key, doctorData[key]);
            }

            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/api/addvetrinarydocformapi.php`,
                    formData,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "multipart/form-data"
                        },
                    }
                );
                notification.success({
                    message: 'Doctor Profile Added Successfully!',
                    description: response.data.message || 'Your doctor profile has been submitted successfully.',
                });
                setDoctorData({
                    name: "",
                    education: "",
                    have_a_clinic: "",
                    specialist: "",
                    available_timing_from: null,
                    available_timing_to: null,
                    phone: "",
                    home_visiting_available: "",
                    experience: "",
                    address: "",
                    description: "",
                    email: "",
                    city: "",
                    state: "",
                    doctor_registerno: "",
                    profile_img: null,
                });
                setErrors({});
            } catch (err) {
                notification.error({
                    message: 'Failed to Submit the Form',
                    description: err.response?.data?.message || 'Please try again later.',
                });
            } finally {
                setLoading(false);
            }
        } else {
            setErrors(formErrors);
            notification.error({
                message: 'Please Fix the Errors Above',
                description: 'Ensure all fields are filled out correctly.',
            });
            setLoading(false);
        }
    };
    return (
        <div className="vetrinaryform max-w-4xl mx-auto p-8 mb-5 mt-5">
            <h2 className="addHostelTitle">Add Veterinary Doctor Information</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">

                    {/* Doctor Name */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Doctor Name
                        </label>
                        <input
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.name ? 'border-red-500' : ''}`}
                            id="name"
                            type="text"
                            name="name"
                            value={doctorData.name}
                            onChange={handleFieldsChange}
                            placeholder="Doctor Name"
                        />
                        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
                    </div>

                    {/* Education */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="education">
                            Education <span className="star">*</span>
                        </label>
                        <input
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.education ? 'border-red-500' : ''}`}
                            id="education"
                            type="text"
                            name="education"
                            value={doctorData.education}
                            onChange={handleFieldsChange}
                            placeholder="Education"
                        />
                        {errors.education && <p className="text-red-600 text-sm">{errors.education}</p>}
                    </div>

                    {/* Contact No */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                            Contact No <span className="star">*</span>
                        </label>
                        <input
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.phone ? 'border-red-500' : ''}`}
                            id="phone"
                            type="number"
                            name="phone"
                            value={doctorData.phone}
                            onChange={handleFieldsChange}
                            placeholder="Contact No"
                        />
                        {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
                    </div>

                    {/* Experience */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">
                            Experience
                        </label>
                        <input
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.experience ? 'border-red-500' : ''}`}
                            id="experience"
                            type="number"
                            name="experience"
                            value={doctorData.experience}
                            onChange={handleFieldsChange}
                            placeholder="Experience"
                        />
                        {errors.experience && <p className="text-red-600 text-sm">{errors.experience}</p>}
                    </div>

                    {/* Have a Clinic */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="have_a_clinic">
                            Have a Clinic?
                        </label>
                        <select
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.have_a_clinic ? 'border-red-500' : ''}`}
                            id="have_a_clinic"
                            name="have_a_clinic"
                            value={doctorData.have_a_clinic}
                            onChange={handleFieldsChange}
                        >
                            <option value="" disabled>Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        {errors.have_a_clinic && <p className="text-red-600 text-sm">{errors.have_a_clinic}</p>}
                    </div>

                    {/* Home Visiting Available */}
                    <div>
                        <label className="w-full px-3 text-gray-700 text-sm font-bold mb-2" htmlFor="home_visiting_available">
                            Home Visiting Available?
                        </label>
                        <select
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.home_visiting_available ? 'border-red-500' : ''}`}
                            id="home_visiting_available"
                            name="home_visiting_available"
                            value={doctorData.home_visiting_available}
                            onChange={handleFieldsChange}
                        >
                            <option value="" disabled>Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        {errors.home_visiting_available && <p className="text-red-600 text-sm">{errors.home_visiting_available}</p>}
                    </div>

                    {/* Specialist */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specialist">
                            Specialization <span className="star">*</span>
                        </label>
                        <input
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.specialist ? 'border-red-500' : ''}`}
                            id="specialist"
                            type="text"
                            name="specialist"
                            value={doctorData.specialist}
                            onChange={handleFieldsChange}
                            placeholder="Specialization"
                        />
                        {errors.specialist && <p className="text-red-600 text-sm">{errors.specialist}</p>}
                    </div>


                    {/* Available Timing From */}

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="available_timing_from">
                            Available Timing <span className="star">*</span>
                        </label>
                        <div className="flex space-x-2 ">
                            <LocalizationProvider dateAdapter={AdapterMoment}> {/* Correct the adapter */}
                                <TimePicker
                                    label="From Time"
                                    value={doctorData.available_timing_from}
                                    name='available_timing_from'
                                    onChange={(newValue) => handleTimeChange('available_timing_from', newValue)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                <TimePicker
                                    label="To Time"
                                    value={doctorData.available_timing_to}
                                    name='available_timing_to'
                                    onChange={(newValue) => handleTimeChange('available_timing_to', newValue)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                        {errors.available_timing && <p className="text-red-600 text-sm">{errors.available_timing}</p>}
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                            Address <span className="star">*</span>
                        </label>
                        <input
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.address ? 'border-red-500' : ''}`}
                            id="address"
                            type="text"
                            name="address"
                            value={doctorData.address}
                            onChange={handleFieldsChange}
                            placeholder="Address"
                        />
                        {errors.address && <p className="text-red-600 text-sm">{errors.address}</p>}
                    </div>

                    {/* City */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                            City <span className="star">*</span>
                        </label>
                        <input
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.city ? 'border-red-500' : ''}`}
                            id="city"
                            type="text"
                            name="city"
                            value={doctorData.city}
                            onChange={handleFieldsChange}
                            placeholder="City"
                        />
                        {errors.city && <p className="text-red-600 text-sm">{errors.city}</p>}
                    </div>

                    {/* State */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
                            State <span className="star">*</span>
                        </label>
                        <input
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.state ? 'border-red-500' : ''}`}
                            id="state"
                            type="text"
                            name="state"
                            value={doctorData.state}
                            onChange={handleFieldsChange}
                            placeholder="State"
                        />
                        {errors.state && <p className="text-red-600 text-sm">{errors.state}</p>}
                    </div>

                    {/* Doctor email */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email<span className="star">*</span></label>
                        <input
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors && (!doctorData.email || !/\S+@\S+\.\S+/.test(doctorData.email)) ? 'border-red-500' : ''}`}
                            id="email"
                            type="email"
                            name="email"
                            value={doctorData.email}
                            onChange={handleFieldsChange}
                            placeholder="Email"
                        // required
                        />
                        {errors.email && (!doctorData.email || !/\S+@\S+\.\S+/.test(doctorData.email)) && <p className="text-red-600 text-sm">Valid email is required</p>}
                    </div>

                    {/* Profile Image */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profile_img">
                            Profile Image <span className="star">*</span>
                        </label>
                        <input
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.profile_img ? 'border-red-500' : ''}`}
                            id="profile_img"
                            type="file"
                            name="profile_img"
                            onChange={handleFieldsChange}
                        />
                        {errors.profile_img && <p className="text-red-600 text-sm">{errors.profile_img}</p>}
                    </div>





                    {/* Doctor Registration No */}
                    <div>
                        <label className="w-full px-3 text-gray-700 text-sm font-bold mb-2" htmlFor="doctor_registerno">
                            Doctor Registration No  <span className="star">*</span>
                        </label>
                        <input
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.doctor_registerno ? 'border-red-500' : ''}`}
                            id="doctor_registerno"
                            type="number"
                            name="doctor_registerno"
                            value={doctorData.doctor_registerno}
                            onChange={handleFieldsChange}
                            placeholder="Doctor Registration No"
                        />
                        {errors.doctor_registerno && <p className="text-red-600 text-sm">{errors.doctor_registerno}</p>}
                    </div>
                    {/* Description */}
                    <div className="col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.description ? 'border-red-500' : ''}`}
                            id="description"
                            name="description"
                            value={doctorData.description}
                            onChange={handleFieldsChange}
                            placeholder="Description"
                        />
                        {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
                    </div>


                    <div>
                        <button className="custom-button" type="submit">Submit</button>
                    </div>

                </div>
            </form>

            {loading && <Loader />}
        </div>
    );
}

export default AddVeterinaryDoctor;





