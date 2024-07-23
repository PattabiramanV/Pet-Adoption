import React, { useState } from 'react';
import axios from 'axios';

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
        doctor_registerno: "",
        profile_img: null,
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleFieldsChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setDoctorData({ ...doctorData, [name]: files[0] });
        } else {
            setDoctorData({ ...doctorData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        const token = localStorage.getItem('token');
        for (const key in doctorData) {
            formData.append(key, doctorData[key]);
        }

        axios.post(
            "http://localhost/Pet-Adoption/Backend/api/addVetrinaryDocformAPI.php",
            formData,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            }
        )
            .then((res) => {
                setSuccess("Form submitted successfully!");
                console.log("inserted successfully");
                console.log(res.data);
                setError(null);
            })
            .catch((err) => {
                setError("Failed to submit the form. Please try again.");
                setSuccess(null);
            });
    };

    return (
        <>    
        <div className="max-w-4xl mx-auto p-8 bg-gray-100 shadow-md mb-5 mt-5">
            <h2 className="text-2xl font-bold mb-6 text-green-800">Add Veterinary Doctor Information</h2>
            {success && <p className="text-green-600">{success}</p>}
            {error && <p className="text-red-600">{error}</p>}
            <form onSubmit={handleSubmit} encType="multipart/form-data"> 
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Doctor Name</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="name" type="text" name="name" value={doctorData.name} onChange={handleFieldsChange} placeholder="Doctor Name" required/>
                    </div>
                   
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="education">Education</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="education" type="text" name="education" value={doctorData.education} onChange={handleFieldsChange} placeholder="Education" required/>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">Contact No</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="contact" type="number" name="phone" value={doctorData.phone} onChange={handleFieldsChange} placeholder="Contact No" required/>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">Experience</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="experience" type="number" name="experience" value={doctorData.experience} onChange={handleFieldsChange} placeholder="Experience" required/>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="email" type="email" name="email" value={doctorData.email} onChange={handleFieldsChange} placeholder="Email" required/>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="have_a_clinic">Do You Have a Clinic?</label>
                        <select className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="have_a_clinic" name="have_a_clinic" value={doctorData.have_a_clinic} onChange={handleFieldsChange} required>
                            <option value="">Select</option>
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>
                    <div className="mt-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="home_visiting_available">Home Visiting Available</label>
                        <select className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="home_visiting_available" name="home_visiting_available" value={doctorData.home_visiting_available} onChange={handleFieldsChange} required>
                            <option value="">Select</option>
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specialist">Specialization</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="specialist" type="text" name="specialist" value={doctorData.specialist} onChange={handleFieldsChange} placeholder="Specialization" required/>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Your Address</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="address" type="text" name="address" value={doctorData.address} onChange={handleFieldsChange} placeholder="Address" required/>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="available_timing">Available Timing</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="available_timing" type="text" name="available_timing" value={doctorData.available_timing} onChange={handleFieldsChange} placeholder="Available Timing (e.g. 10:00 AM - 5:00 PM)" required/>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Tell us about yourself</label>
                        <textarea className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="description" rows="4" name="description" value={doctorData.description} onChange={handleFieldsChange} placeholder="Describe yourself" required ></textarea>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctor_registerno">Doctor Register Number</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="doctor_registerno" type="text" name="doctor_registerno" value={doctorData.doctor_registerno} onChange={handleFieldsChange} placeholder="Doctor Register Number" required/>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profile_img">Upload your profile pic</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="profile_img" type="file" name="profile_img" onChange={handleFieldsChange} required/>
                    </div>
                </div>
                <div>
                    <button className="w-full text-white py-2 rounded-lg bg-purple-600" type="submit">Submit</button>
                </div>
            </form>
        </div>
        </>
    );
}

export default AddVeterinaryDoctor;
