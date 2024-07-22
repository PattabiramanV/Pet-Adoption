import React, { useState } from 'react';
import axios from 'axios';

const FoundPetsForm = () => {
    const [formData, setFormData] = useState({
        petType: '',
        breed: '',
        age: '',
        gender: '',
        contactNo: '',
        dateFound: '',
        photo: null,
        address: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reader = new FileReader();
        const token = localStorage.getItem('token');
        reader.readAsDataURL(formData.photo);
        reader.onload = async () => {
            const base64Photo = reader.result.split(",")[1];
            const dataToSend = {
                ...formData,
                photo: base64Photo
            };

            try {
                const response = await axios.post('http://localhost/pet-adoption/Backend/model/foundingpet.php', dataToSend, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert(response.data.message);
            } catch (error) {
                console.error('There was an error!', error);
            }
        };
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-100 shadow-md mb-5 mt-5">
            <h2 className="text-2xl font-bold mb-6 text-green-800">Add Founding Pets</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petType">Pet Type</label>
                        <input
                            name="petType"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="petType"
                            type="text"
                            value={formData.petType}
                            onChange={handleChange}
                            placeholder="Pet Type"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="breed">Breed</label>
                        <input
                            name="breed"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="breed"
                            type="text"
                            value={formData.breed}
                            onChange={handleChange}
                            placeholder="Breed"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">Age</label>
                        <input
                            name="age"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="age"
                            type="number"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="Age"
                        />
                    </div>
                    <div className="mt-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Pet’s Gender</label>
                        <select
                            name="gender"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
                            id="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNo">Contact No</label>
                        <input
                            name="contactNo"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
                            id="contactNo"
                            type="number"
                            value={formData.contactNo}
                            onChange={handleChange}
                            placeholder="Contact No"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateFound">Date Found</label>
                        <input
                            name="dateFound"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
                            id="dateFound"
                            type="date"
                            value={formData.dateFound}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">Photo</label>
                        <input
                            name="photo"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
                            id="photo"
                            type="file"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
                        <input
                            name="address"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
                            id="address"
                            type="text"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Address"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="description"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your Pets"
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="w-auto px-4 text-white py-2 rounded-lg bg-purple-600" type="submit">Submit</button>
                </div>
           
                </form>
        </div>
    );
};


export default FoundPetsForm ;
