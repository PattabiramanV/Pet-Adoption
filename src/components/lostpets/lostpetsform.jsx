import React, { useState } from 'react';
import axios from 'axios';
import { notification, Button } from 'antd';
import Loader from '../Loader/Loader';
import './lostlistpet.css';

const LostPetForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        petType: '',
        age: '',
        gender: '',
        contactNo: '',
        lostDate: '',
        photo: null,
        address: '',
        description: '',
        location: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const validate = () => {
        const validationErrors = {};
        if (!formData.name) validationErrors.name = 'Pet name is required';
        if (!formData.petType) validationErrors.petType = 'Pet type is required';
        if (!formData.age || formData.age <= 0) validationErrors.age = 'Age must be a positive number';
        if (!formData.gender) validationErrors.gender = 'Gender is required';
        if (!formData.contactNo || formData.contactNo.length < 10) validationErrors.contactNo = 'Contact number required';
        if (!formData.lostDate) validationErrors.lostDate = 'Lost date is required';
        if (formData.photo && !formData.photo.type.startsWith('image/')) validationErrors.photo = 'Invalid photo format';
        if (!formData.address) validationErrors.address = 'Address is required';
        if (!formData.location) validationErrors.location = 'Location is required';
        if (!formData.description) validationErrors.description = 'Description is required';

        return validationErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const reader = new FileReader();
        const token = localStorage.getItem('token');

        const sendRequest = async (dataToSend) => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/model/lostingpet.php`, dataToSend, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                notification.success({
                    message: 'Success',
                    description: response.data.message,
                });
                // Reset the form after successful submission
                setFormData({
                    name: '',
                    petType: '',
                    age: '',
                    gender: '',
                    contactNo: '',
                    lostDate: '',
                    photo: null,
                    address: '',
                    description: '',
                    location: ''
                });
                setErrors({}); // Clear errors
            } catch (error) {
                notification.error({
                    message: 'Error',
                    description: 'There was an error submitting the form!',
                });
                console.error('There was an error!', error);
            }
        };

        if (formData.photo) {
            reader.readAsDataURL(formData.photo);
            reader.onload = async () => {
                const base64Photo = reader.result.split(",")[1];
                const dataToSend = {
                    ...formData,
                    photo: base64Photo
                };
                await sendRequest(dataToSend);
            };
        } else {
            const dataToSend = {
                ...formData,
                photo: null
            };
            await sendRequest(dataToSend);
        }
    };
    if(loading) {
        return <Loader/>;
    }

    return (
        <div
            className="lostpetform  max-w-4xl mx-auto p-8 mb-5 mt-5 rounded-[10px]"
           
        >
            <h2 className="text-2xl font-bold mb-6 text-violet-800 text-center">Add Lost Pets</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Pet Name</label>
                        <input
                            name="name"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none text-md ${errors.name ? 'border-red-500' : ''}`}
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Pet Name"
                        />
                        {errors.name && <p className="text-red-500 text-xs ">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petType">Pet Type<span>*</span></label>
                        <input
                            name="petType"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.petType ? 'border-red-500' : ''}`}
                            id="petType"
                            type="text"
                            value={formData.petType}
                            onChange={handleChange}
                            placeholder="Pet Type"
                        />
                        {errors.petType && <p className="text-red-500 text-xs ">{errors.petType}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">Age</label>
                        <input
                            name="age"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.age ? 'border-red-500' : ''}`}
                            id="age"
                            type="number"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="Age"
                        />
                        {errors.age && <p className="text-red-500 text-xs ">{errors.age}</p>}
                    </div>
                    <div className="mt-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Pet’s Gender</label>
                        <select
                            name="gender"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${errors.gender ? 'border-red-500' : ''}`}
                            id="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {errors.gender && <p className="text-red-500 text-xs ">{errors.gender}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNo">Contact No<span>*</span></label>
                        <input
                            name="contactNo"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${errors.contactNo ? 'border-red-500' : ''}`}
                            id="contactNo"
                            type="text"
                            value={formData.contactNo}
                            onChange={handleChange}
                            placeholder="Contact No"
                        />
                        {errors.contactNo && <p className="text-red-500 text-xs ">{errors.contactNo}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lostDate">Lost Date</label>
                        <input
                            name="lostDate"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${errors.lostDate ? 'border-red-500' : ''}`}
                            id="lostDate"
                            type="date"
                            value={formData.lostDate}
                            onChange={handleChange}
                        />
                        {errors.lostDate && <p className="text-red-500 text-xs ">{errors.lostDate}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">Photo<span>*</span></label>
                        <input
                            name="photo"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${errors.photo ? 'border-red-500' : ''}`}
                            id="photo"
                            type="file"
                            onChange={handleChange}
                        />
                        {errors.photo && <p className="text-red-500 text-xs ">{errors.photo}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
                        <input
                            name="address"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.address ? 'border-red-500' : ''}`}
                            id="address"
                            type="text"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Address"
                        />
                        {errors.address && <p className="text-red-500 text-xs ">{errors.address}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Location</label>
                        <input
                            name="location"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.location ? 'border-red-500' : ''}`}
                            id="location"
                            type="text"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Location"
                        />
                        {errors.location && <p className="text-red-500 text-xs ">{errors.location}</p>}
                    </div>     
                </div>
                <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.description ? 'border-red-500' : ''}`}
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                        />
                        {errors.description && <p className="text-red-500 text-xs ">{errors.description}</p>}
                    </div>

               <button className='lostformsubmitbtn'>Submit</button>
            </form>
        </div>
    );
};

export default LostPetForm;











