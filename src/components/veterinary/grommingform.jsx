// import Form from 'react-validation/build/form';
// import Input from 'react-validation/build/input';
import React, { useState } from 'react';
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
        image: "",
    });

    const handleFields = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setApplyGrooming({ ...applyGrooming, [name]: files[0] });
        } else {
            setApplyGrooming({ ...applyGrooming, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in applyGrooming) {
            formData.append(key, applyGrooming[key]);
        }

        axios({
            // Endpoint to send files
            url: "http://localhost/pet/veterinary/Petgrooming.php",
            method: "POST",
            headers: {
                // Add any auth token here
                authorization: "your token comes here",
            },
 
            // Attaching the form data
            data: formData,
        })
            // Handle the response from backend here
            .then((res) => {})
 
            // Catch errors if any
            .catch((err) => {});

    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-100 shadow-md mb-5 mt-5">
            <h2 className="text-2xl font-bold mb-6 text-green-800">Apply for Pet Partner for Services</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="name" type="text" name="name" value={applyGrooming.name} onChange={handleFields} placeholder="Name" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">Contact No</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="contact" type="text" name="contact" value={applyGrooming.contact} onChange={handleFields} placeholder="Contact No" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="email" type="email" name="email" value={applyGrooming.email} onChange={handleFields} placeholder="Email" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petType">Pet Type</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="petType" type="text" name="petType" value={applyGrooming.petType} onChange={handleFields} placeholder="Pet Type" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petGender">Pet Gender</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="petGender" type="text" name="petGender" value={applyGrooming.petGender} onChange={handleFields} placeholder="Pet Gender" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petAge">Age of the Pet</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="petAge" type="text" name="petAge" value={applyGrooming.petAge} onChange={handleFields} placeholder="Age of the Pet" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">City</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="city" type="text" name="city" value={applyGrooming.city} onChange={handleFields} placeholder="City" />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="needForPet">What You Need for Your Pet</label>
                        <textarea className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="needForPet" rows="4" name="needForPet" value={applyGrooming.needForPet} onChange={handleFields} placeholder="Describe What You Need for Your Pet"></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Upload Your Pet Picture</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="image" name="image" type="file" onChange={handleFields} />
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
