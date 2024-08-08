import React, { useState } from 'react';
import axios from 'axios';
import { notification } from 'antd';
import Loader from '../Loader/Loader';
import './normaltable.css';

function AddVeterinaryDoctor() {
    const [doctorData, setDoctorData] = useState({
        name: "",
        education: "",
        have_a_clinic: "",
        specialist: "",
        available_timing: "",
        phone: "",
        home_visiting_available: "",
        experience: "",
        address: "",
        description: "",
        email: "",
        city: "",
        doctor_registerno: "",
        profile_img: null,
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFieldsChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setDoctorData({ ...doctorData, [name]: files[0] });
        } else {
            setDoctorData({ ...doctorData, [name]: value });
        }
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
        if (!doctorData.available_timing) errors.available_timing = 'Available timing is required';
        if (!doctorData.description) errors.description = 'Description is required';
        if (!doctorData.doctor_registerno) errors.doctor_registerno = 'Doctor register number is required';
        if (!doctorData.profile_img) errors.profile_img = 'Profile image is required';
    
        console.log("Validation Errors:", errors);
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            const formData = new FormData();
            console.log("Form Errors:", formErrors);
            const token = localStorage.getItem('token');
            for (const key in doctorData) {
                formData.append(key, doctorData[key]);
            }

            try {
                const res = await axios.post(
                    `${VITE_PROFILE_BASE_URL}/api/addvetrinarydocformapi.php`,
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
                    description: 'Your doctor profile has been submitted successfully.',
                });
                
                setError(null);
                setDoctorData({
                    name: "",
                    education: "",
                    have_a_clinic: "",
                    specialist: "",
                    available_timing: "",
                    phone: "",
                    home_visiting_available: "",
                    experience: "",
                    city: "",
                    address: "",                 
                    description: "",
                    email: "",
                    doctor_registerno: "",
                    profile_img: null,
                });
            } catch (err) {
                notification.error({
                    message: 'Failed to Submit the Form',
                    description: 'Please try again later.',
                });
                setSuccess(null);
            } finally {
                setLoading(false);
            }
        } else {
            notification.error({
                message: 'Please Fix the Errors Above',
                description: 'Ensure all fields are filled out correctly.',
            });
            setSuccess(null);
            setLoading(false);
        }
    };

    if (loading) return <Loader />;
    return ( 
        
        <div className="custom-div">
            <h2 className="text-2xl font-bold mb-6 text-green-800 text-center">Add Veterinary Doctor Information</h2>
            {success && <p className="text-green-600">{success}</p>}
            {error && <p className="text-red-600">{error}</p>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Doctor Name</label>
                        <input
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${error && !doctorData.name ? 'border-red-500' : ''}`}
                            id="name"
                            type="text"
                            name="name"
                            value={doctorData.name}
                            onChange={handleFieldsChange}
                            placeholder="Doctor Name"
                            // required
                        />
                        {error && !doctorData.name && <p className="text-red-600 text-sm">Doctor name is required</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="education">Education<span>*</span></label>
                        <input
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${error && !doctorData.education ? 'border-red-500' : ''}`}
                            id="education"
                            type="text"
                            name="education"
                            value={doctorData.education}
                            onChange={handleFieldsChange}
                            placeholder="Education"
                            // required
                        />
                        {error && !doctorData.education && <p className="text-red-600 text-sm">Education is required</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Contact No<span>*</span></label>
                        <input
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${error && (!doctorData.phone || doctorData.phone.length < 10) ? 'border-red-500' : ''}`}
                            id="phone"
                            type="number"
                            name="phone"
                            value={doctorData.phone}
                            onChange={handleFieldsChange}
                            placeholder="Contact No"
                            // required
                        />
                        {error && (!doctorData.phone || doctorData.phone.length < 10) && <p className="text-red-600 text-sm">Valid contact number is required</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">Experience</label>
                        <input
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${error && !doctorData.experience ? 'border-red-500' : ''}`}
                            id="experience"
                            type="number"
                            name="experience"
                            value={doctorData.experience}
                            onChange={handleFieldsChange}
                            placeholder="Experience"
                            // required
                        />
                        {error && !doctorData.experience && <p className="text-red-600 text-sm">Experience is required</p>}
                    </div>
                    
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">Available Timing<span>*</span></label>
                        <input
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${error && !doctorData.available_timing ? 'border-red-500' : ''}`}
                            id="available_timing"
                            type="text"
                            name="available_timing"
                            value={doctorData.available_timing}
                            onChange={handleFieldsChange}
                            placeholder="available_timing"
                            // required
                        />
                        {error && !doctorData.experience && <p className="text-red-600 text-sm">Available timing is required</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email<span>*</span></label>
                        <input
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${error && (!doctorData.email || !/\S+@\S+\.\S+/.test(doctorData.email)) ? 'border-red-500' : ''}`}
                            id="email"
                            type="email"
                            name="email"
                            value={doctorData.email}
                            onChange={handleFieldsChange}
                            placeholder="Email"
                            // required
                        />
                        {error && (!doctorData.email || !/\S+@\S+\.\S+/.test(doctorData.email)) && <p className="text-red-600 text-sm">Valid email is required</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="have_a_clinic">Do You Have a Clinic?</label>
                        <select
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${error && !doctorData.have_a_clinic ? 'border-red-500' : ''}`}
                            id="have_a_clinic"
                            name="have_a_clinic"
                            value={doctorData.have_a_clinic}
                            onChange={handleFieldsChange}
                            // required
                        >
                            <option value="">Select</option>
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>
                        </select>
                        {error && !doctorData.have_a_clinic && <p className="text-red-600 text-sm">Please select if you have a clinic</p>}
                    </div>
                    <div className="mt-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="home_visiting_available">Home Visiting Available</label>
                        <select
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${error && !doctorData.home_visiting_available ? 'border-red-500' : ''}`}
                            id="home_visiting_available"
                            name="home_visiting_available"
                            value={doctorData.home_visiting_available}
                            onChange={handleFieldsChange}
                            // required
                        >
                            <option value="">Select</option>
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>
                        </select>
                        {error && !doctorData.home_visiting_available && <p className="text-red-600 text-sm">Please select if home visiting is available</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specialist">Specialization</label>
                        <input
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${error && !doctorData.specialist ? 'border-red-500' : ''}`}
                            id="specialist"
                            type="text"
                            name="specialist"
                            value={doctorData.specialist}
                            onChange={handleFieldsChange}
                            placeholder="Specialization"
                            // required
                        />
                        {error && !doctorData.specialist && <p className="text-red-600 text-sm">Specialization is required</p>}
                    </div>
                   

                 
                    <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">city<span>*</span></label>
                            <input
                                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${error && !doctorData.city ? 'border-red-500' : ''}`}
                                id="city"
                                type="text"
                                name="city"
                                value={doctorData.city}
                                onChange={handleFieldsChange}
                                placeholder="city"
                                // required
                            />
                            {error && !doctorData.city && <p className="text-red-600 text-sm">city</p>}
                            </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">state<span>*</span></label>
                                    <input
                                        className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${error && !doctorData.state ? 'border-red-500' : ''}`}
                                        id="state"
                                        type="text"
                                        name="state"
                                        value={doctorData.state}
                                        onChange={handleFieldsChange}
                                        placeholder="state"
                                        // required
                                    />
                                    {error && !doctorData.state && <p className="text-red-600 text-sm">state is required</p>}
                                </div>
                        
                            <div>
                               
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">address<span>*</span></label>      
                                <textarea
                                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${error && !doctorData.address ? 'border-red-500' : ''}`}
                                    id="address"
                                    type="text"
                                    name="address"
                                    value={doctorData.address}
                                    onChange={handleFieldsChange}
                                    placeholder="address"
                                    // required
                                />
                                {error && !doctorData.address && <p className="text-red-600 text-sm">address is required</p>}
                                </div>
    
                        </div>
                       



                    
                        
                    <div className="sm:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Tell us about yourself</label>
                        <textarea
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${error && !doctorData.description ? 'border-red-500' : ''}`}
                            id="description"
                            rows="4"
                            name="description"
                            value={doctorData.description}
                            onChange={handleFieldsChange}
                            placeholder="Describe yourself"
                            // required
                        ></textarea>
                        {error && !doctorData.description && <p className="text-red-600 text-sm">Description is required</p>}
                    </div>
                   <div className='flex gap-20'>
                   <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctor_registerno">Doctor Register Number</label>
                        <input
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${error && !doctorData.doctor_registerno ? 'border-red-500' : ''}`}
                            id="doctor_registerno"
                            type="text"
                            name="doctor_registerno"
                            value={doctorData.doctor_registerno}
                            onChange={handleFieldsChange}
                            placeholder="Doctor Register Number"
                            // required
                        />
                        {error && !doctorData.doctor_registerno && <p className="text-red-600 text-sm">Doctor register number is required</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profile_img">Upload your profile pic</label>
                        <input
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${error && !doctorData.profile_img ? 'border-red-500' : ''}`}
                            id="profile_img"
                            type="file"
                            name="profile_img"
                            onChange={handleFieldsChange}
                            // required
                        />
                        {error && !doctorData.profile_img && <p className="text-red-600 text-sm">Profile image is required</p>}
                    </div>
                   </div>
                
                <div>
                    <button className="custom-button" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default AddVeterinaryDoctor;
