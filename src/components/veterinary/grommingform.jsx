import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import axios from 'axios';
import Loader from '../Loader/Loader';

import './normaltable.css'; // Ensure this path is correct

function GroomingPetsForm({ initialService }) {
    const initialFormState = {
        name: "",
        contact: "",
        email: "",
        petType: "",
        petGender: "",
        petAge: "",
        city: "",
        needForPet: "",
        petimage: null,
        selectdoctorname: "",
        doctorAddress: "",
        sevice: "", 
        appointmentDate:''
    
    };

    const [applyGrooming, setApplyGrooming] = useState(initialFormState);
    const [error, setError] = useState({});
    const [success, setSuccess] = useState(null);
    const [showErrors, setShowErrors] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false); // Add loading state

    useEffect(() => {
        axios.get('http://localhost/petadoption/backend/api/retrivevetrinarydocinfoapi.php')
            .then(response => {
                setDoctors(response.data);
            })
            .catch(error => {
                notification.error({
                    message: 'Error Fetching Doctors',
                    description: 'There was an error while fetching the list of doctors. Please try again later.',
                });
                // console.error('There was an error fetching the doctors!', error);
            });
    }, []);

    useEffect(() => {
        if (initialService) {
            setApplyGrooming(prev => ({ ...prev, sevice: initialService }));
        }
    }, [initialService]);

    const handleFields = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setApplyGrooming({ ...applyGrooming, [name]: files[0] });
        } else {
            if (name === 'selectdoctorname') {
                const selectedDoctor = doctors.find(doctor => doctor.name === value);
                setApplyGrooming({
                    ...applyGrooming,
                    selectdoctorname: value,
                    doctorAddress: selectedDoctor ? selectedDoctor.address : '',
                });
            } else {
                setApplyGrooming({ ...applyGrooming, [name]: value });
            }
        }
    };

    const validateFields = () => {
        const errors = {};
        if (!applyGrooming.name) errors.name = 'Name is required';
        if (!applyGrooming.contact || applyGrooming.contact.length < 9) errors.contact = 'Valid contact number is required';
        if (!applyGrooming.email || !/\S+@\S+\.\S+/.test(applyGrooming.email)) errors.email = 'Valid email is required';
        if (!applyGrooming.petType) errors.petType = 'Pet type is required';
        if (!applyGrooming.petGender) errors.petGender = 'Pet gender is required';
        if (!applyGrooming.petAge) errors.petAge = 'Pet age is required';
        if (!applyGrooming.city) errors.city = 'City is required';
        if (!applyGrooming.needForPet) errors.needForPet = 'Description of needs is required';
        if (!applyGrooming.petimage) errors.petimage = 'Pet image is required';
        if (!applyGrooming.selectdoctorname) errors.selectdoctorname = 'Doctor selection is required';
        if (!applyGrooming.sevice) errors.sevice = 'Service type is required'; // Corrected error key
        if (!applyGrooming.appointmentDate) errors.appointmentDate = 'date is required';


        setError(errors);
        if (Object.keys(errors).length > 0) {
            setShowErrors(true);
            notification.error({
                message: 'Please Fix the Errors Above',
                description: 'Ensure all fields are filled out correctly.',
            });
            setTimeout(() => {
                setShowErrors(false);
            }, 3000); // Hide errors after 3 seconds
        }

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({});
        setSuccess(null);
        setLoading(true); // Set loading to true
        if (!validateFields()) {
            setLoading(false); // Set loading to false if validation fails
            return;
        }

        const formData = new FormData();
        const token = localStorage.getItem('token');

        for (const key in applyGrooming) {
            if (applyGrooming.hasOwnProperty(key)) {
                formData.append(key, applyGrooming[key]);
            }
        }

        try {
      
            
            const res = await axios.post(
                "http://localhost/petadoption/backend/api/groomingformapi.php",
                formData, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    },
                }
            );
            console.log(res.data);
            
            setError({});
            notification.success({
                message: 'Your request was successfully submitted!',
                description: 'Your grooming appointment was submitted successfully.',
            });
            // setSuccess('Your request was successfully submitted!');
            // Reset the form after successful submission
            setApplyGrooming(initialFormState);
        } catch (err) {
            notification.error({
                message: 'Failed to Submit the Form',
                description: 'Please try again later.',
            });
            setSuccess(null);
        } finally {
            setLoading(false); // Ensure loading is set to false in all cases
        }
    };

    const currentDayShowFun = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
      
        const todayFormatted = `${yyyy}-${mm}-${dd}`;

      
        return {
          today: todayFormatted
        
        };
      };
      
      // Example usage:
      const dates = currentDayShowFun();

    if (loading) return <Loader />;

    return (
        <div className="custom-div">
            <h2 className="text-2xl font-bold mb-6 text-center text-green-800">Apply for Pet Partner for Services</h2>
            {/* {showErrors && Object.keys(error).length > 0 && (
                <div className="error-messages">
                    {Object.values(error).map((msg, index) => (
                        <p key={index} className="text-red-500 mb-2">{msg}</p>
                    ))}
                </div>
            )} */}
            {success && <div className="text-green-500 mb-4">{success}</div>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="name"
                            type="text"
                            name="name"
                            value={applyGrooming.name}
                            onChange={handleFields}
                            placeholder="Name"
                        />
                        {error.name && <p className="text-red-600 text-sm">{error.name}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">Contact No <span>*</span></label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="contact"
                            type="number"
                            name="contact"
                            value={applyGrooming.contact}
                            onChange={handleFields}
                            placeholder="Contact No"
                        />
                        {error.contact && <p className="text-red-600 text-sm">{error.contact}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email<span>*</span></label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="email"
                            type="email"
                            name="email"
                            value={applyGrooming.email}
                            onChange={handleFields}
                            placeholder="Email"
                        />
                        {error.email && <p className="text-red-600 text-sm">{error.email}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petType">Pet Type</label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="petType"
                            type="text"
                            name="petType"
                            value={applyGrooming.petType}
                            onChange={handleFields}
                            placeholder="Pet Type"
                        />
                        {error.petType && <p className="text-red-600 text-sm">{error.petType}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petGender">Pet Gender</label>
                        <select
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="petGender"
                            name="petGender"
                            value={applyGrooming.petGender}
                            onChange={handleFields}
                        >
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        {error.petGender && <p className="text-red-600 text-sm">{error.petGender}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petAge">Age of the Pet</label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="petAge"
                            type="number"
                            name="petAge"
                            value={applyGrooming.petAge}
                            onChange={handleFields}
                            placeholder="Age of the Pet"
                        />
                        {error.petAge && <p className="text-red-600 text-sm">{error.petAge}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="needForPet">What You Need for Your Pet<span>*</span></label>
                        <textarea
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="needForPet"
                            name="needForPet"
                            value={applyGrooming.needForPet}
                            onChange={handleFields}
                            placeholder="What do you need"
                        />
                        {error.needForPet && <p className="text-red-600 text-sm">{error.needForPet}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sevice">Pet Services<span>*</span></label>
                        <select
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="sevice"
                            name="sevice"
                            value={applyGrooming.sevice}
                            onChange={handleFields}
                        >
                            <option value="">Select service</option>
                            <option value="Pet Bothing">Bothing</option>
                            <option value="Tick Remove">Tick Remove</option>
                            <option value="Bothing + Tick Remove">Bothing + Tick Remove</option>
                            <option value="Cutting">Cutting</option>
                            <option value="Bathing + Cutting">Bathing + Cutting</option>
                        </select>
                        {error.sevice && <p className="text-red-600 text-sm">{error.sevice}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="selectdoctorname">Select Doctor Name<span>*</span></label>
                        <select
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="selectdoctorname"
                            name="selectdoctorname"
                            value={applyGrooming.selectdoctorname}
                            onChange={handleFields}
                        >
                            <option value="">Select Doctor Name</option>
                            {doctors.map((doctor, index) => (
                                <option key={index} value={doctor.name}>{doctor.name}</option>
                            ))}
                        </select>
                        {error.selectdoctorname && <p className="text-red-600 text-sm">{error.selectdoctorname}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">City<span>*</span></label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="city"
                            type="text"
                            name="city"
                            value={applyGrooming.city}
                            onChange={handleFields}
                            placeholder="City"
                        />
                        {error.city && <p className="text-red-600 text-sm">{error.city}</p>}
                    </div>
                     <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="appointmentDate">Appointment Date<span>*</span></label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="appointmentDate"
                            type="date"
                            name="appointmentDate"
                            min={dates.today}
                            value={applyGrooming.appointmentDate}
                            onChange={handleFields}
                            placeholder="Select date"
                        />
                        {error.appointmentDate && <p className="text-red-600 text-sm">{error.appointmentDate}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctorAddress">Doctor Address</label>
                        <textarea
                            readOnly
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="doctorAddress"
                            name="doctorAddress"
                            value={applyGrooming.doctorAddress}
                            placeholder="Doctor Address"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petimage">Upload Your Pet Picture</label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="petimage"
                            name="petimage"
                            type="file"
                            onChange={handleFields}
                        />
                        {error.petimage && <p className="text-red-600 text-sm">{error.petimage}</p>}
                    </div>
                </div>
                <div>
                    <button className="custom-button" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default GroomingPetsForm;
