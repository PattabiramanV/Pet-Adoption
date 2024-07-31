import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GroomingPetsForm() {
    const [applyGrooming, setApplyGrooming] = useState({
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
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost/petadoption/backend/api/retrivevetrinarydocinfoapi.php')
            .then(response => {
                setDoctors(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the doctors!', error);
            });
    }, []);

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
// // validation inputs fields
//     const validateForm = () => {
//         const errors = {};
//         if (!applyGrooming.name) errors.name = 'Doctor name is required';
//         if (!applyGrooming.education) errors.education = 'Education is required';
//         if (!applyGrooming.phone || doctorData.phone.length < 9) errors.phone = 'Valid contact number is required';
//         if (!applyGrooming.email || !/\S+@\S+\.\S+/.test(doctorData.email)) errors.email = 'Valid email is required';
//         if (!applyGrooming.have_a_clinic) errors.have_a_clinic = 'Select if you have a clinic';
//         if (!applyGrooming.home_visiting_available) errors.home_visiting_available = 'Select if home visiting is available';
//         if (!applyGrooming.specialist) errors.specialist = 'Specialization is required';
//         if (!applyGrooming.address) errors.address = 'Address is required';
//         if (!applyGrooming.available_timing) errors.available_timing = 'Available timing is required';
//         if (!applyGrooming.description) errors.description = 'Description is required';
//         if (!applyGrooming.doctor_registerno) errors.doctor_registerno = 'Doctor register number is required';
//         if (!applyGrooming.profile_img) errors.profile_img = 'Profile image is required';
    
//         console.log("Validation Errors:", errors);
//         return errors;
//     };


    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!validateFields()) {
            return;
        }

        const formData = new FormData();
        const token = localStorage.getItem('token');
        for (const key in applyGrooming) {
            formData.append(key, applyGrooming[key]);
        }

        axios.post(
            "http://localhost/petadoption/backend/api/groomingformapi.php",
            formData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            },
        })
        .then((res) => {
            setSuccess("Form submitted successfully!");
            console.log(res.data);
            setError(null);
        })
        .catch((err) => {
            setError("Failed to submit the form. Please try again.");
            setSuccess(null);
        });
    };

   

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-100 shadow-md mb-5 mt-5">
            <h2 className="text-2xl font-bold mb-6 text-green-800">Apply for Pet Partner for Services</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="name" type="text" name="name" value={applyGrooming.name} onChange={handleFields} placeholder="Name" required/>
                        {error && !doctorData.name && <p className="text-red-600 text-sm">Doctor name is required</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">Contact No</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="contact" type="number" name="contact" value={applyGrooming.contact} onChange={handleFields} placeholder="Contact No" required/>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="email" type="email" name="email" value={applyGrooming.email} onChange={handleFields} placeholder="Email" required/>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petType">Pet Type</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="petType" type="text" name="petType" value={applyGrooming.petType} onChange={handleFields} placeholder="Pet Type" required/>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petGender">Pet Gender</label>
                        <select
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="petGender"
                            name="petGender"
                            value={applyGrooming.petGender}
                            onChange={handleFields} 
                            required
                        >
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petAge">Age of the Pet</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="petAge" type="number" name="petAge" value={applyGrooming.petAge} onChange={handleFields} placeholder="Age of the Pet" required/>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctornames">Veterinary Doctors</label>
                        <select
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="doctornames"
                            name="selectdoctorname"
                            value={applyGrooming.selectdoctorname}
                            onChange={handleFields} 
                            required
                        >
                            <option value="">Select Doctor Name</option>
                            {doctors.map((doctor, index) => (
                                <option key={index} value={doctor.name}>{doctor.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">City</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="city" type="text" name="city" value={applyGrooming.city} onChange={handleFields} placeholder="City" required/>
                    </div>
                    {applyGrooming.selectdoctorname && (
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctorAddress">Doctor Address</label>
                            <textarea
                                readOnly
                                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                                id="doctorAddress"
                                name="doctorAddress"
                                value={applyGrooming.doctorAddress}
                                placeholder="Doctor Address"
                                required
                            />
                        </div>
                    )}
                    <div className="sm:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="needForPet">What You Need for Your Pet</label>
                        <textarea className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="needForPet" rows="4" name="needForPet" value={applyGrooming.needForPet} onChange={handleFields} placeholder="Describe What You Need for Your Pet" required></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petimage">Upload Your Pet Picture</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="petimage" name="petimage" type="file" onChange={handleFields} required/>
                    </div>
                </div>
                <div>
                    <button className="w-full text-white py-2 rounded-lg bg-purple-600" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default GroomingPetsForm;
