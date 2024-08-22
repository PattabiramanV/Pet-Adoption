import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import axios from 'axios';
import moment from 'moment';
import './editform.css';

const EditForm = ({ record, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        id: record.id, 
        name: record.name,
        pet_type: record.pet_type,
        gender: record.gender,
        age: record.age,
        address: record.address,
        lost_date: moment(record.lost_date).format('YYYY-MM-DD'),
        location: record.location,
        description: record.description,
        contact_no: record.contact_no,
        status: record.status
    });
    

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [statusChecked, setStatusChecked] = useState(record.status === 'completed');

    useEffect(() => {
        if (record) {
            setFormData({
                ...record,
                lost_date: moment(record.lost_date).format('YYYY-MM-DD'), // Use lost_date instead of lostDate
            });
            setStatusChecked(record.status === 'completed');
        }
    }, [record]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleStatusChange = (e) => {
        setStatusChecked(e.target.checked);
    };
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Pet Name is required';
        if (!formData.pet_type) newErrors.pet_type = 'Pet Type is required';
        if (!formData.gender) newErrors.gender = 'Pet Gender is required';
        if (!formData.age) newErrors.age = 'Age is required';
        if (!formData.contact_no) newErrors.contact_no = 'Contact No is required';
        if (!formData.lost_date) newErrors.lost_date = 'Lost Date is required';
        if (!formData.location) newErrors.location = 'Location is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.description) newErrors.description = 'Description is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Valid if no errors
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Prevent submission if validation fails

        const updatedFormData = {
            ...formData,
            status: statusChecked ? 'completed' : 'pending',
        };

        setLoading(true); 

        try {
            const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/model/editform.php`, updatedFormData);
            if (response.data.status === "success") { // Corrected status check
                message.success('Updated successfully!');
                console.log(response.data)
                onUpdate(updatedFormData); 
                onClose(); 
            } else {
                message.error('Failed to update record.');
            }
        } catch (error) {
            console.error('Update error:', error);
            message.error('An error occurred while updating the record.');
        } finally {
            setLoading(false); // Reset loading state after the request completes
        }
    };

    return (
        <div className="editform lostpetform max-w-4xl mx-auto mb-5 mt-5 rounded-[10px]">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    {/* Input Fields */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Pet Name</label>
                        <input
                            name="name"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.name ? 'border-red-500' : ''}`}
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Pet Name"
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pet_type">Pet Type</label>
                        <input
                            name="pet_type"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.pet_type ? 'border-red-500' : ''}`}
                            id="pet_type"
                            type="text"
                            value={formData.pet_type}
                            onChange={handleChange}
                            placeholder="Pet Type"
                        />
                        {errors.pet_type && <p className="text-red-500 text-xs">{errors.pet_type}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Pet’s Gender</label>
                        <select
                            name="gender"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.gender ? 'border-red-500' : ''}`}
                            id="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
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
                        {errors.age && <p className="text-red-500 text-xs">{errors.age}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_no">Contact No</label>
                        <input
                            name="contact_no"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.contact_no ? 'border-red-500' : ''}`}
                            id="contact_no"
                            type="text"
                            value={formData.contact_no}
                            onChange={handleChange}
                            placeholder="Contact No"
                        />
                        {errors.contact_no && <p className="text-red-500 text-xs">{errors.contact_no}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lost_date">Lost Date</label>
                        <input
                            name="lost_date"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.lost_date ? 'border-red-500' : ''}`}
                            id="lost_date"
                            type="date"
                            value={formData.lost_date}
                            onChange={handleChange}
                        />
                        {errors.lost_date && <p className="text-red-500 text-xs">{errors.lost_date}</p>}
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
                        {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-0 mr-2" htmlFor="status">Status:</label>
                        <input
                            name="status"
                            type="checkbox"
                            checked={statusChecked}
                            onChange={handleStatusChange}
                            className="mr-2"
                        />
                        <span>{statusChecked ? 'Completed' : 'Pending'}</span>
                    </div>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
                    <input
                        name="address"
                        className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.address ? 'border-red-500' : ''}`}
                        id="addresses"
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                    />
                    {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
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
                        rows="4"
                    />
                    {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditForm;




