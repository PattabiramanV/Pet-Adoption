

import React, { useState,useRef } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader'; // Import the Loader component
import { Form, Input, Button, Typography, Divider, message,notification } from "antd";
import './addhostel.css';


function AddPetHos() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state
 const fileInputRef = useRef(null); // Reference for the file input

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    price_per_day: '',
    available_time: '',
    address: '',
    description: '',
    photos: [] // Changed to an array to support multiple files
  });

  const [errors, setErrors] = useState({});
  const onChangeFun = (e) => {
    const { name, type, files } = e.target;
  
    if (type === 'file') {
      // Use Array.from to convert FileList to an array
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: prevFormData[name] 
          ? [...prevFormData[name], ...Array.from(files)] // Append new files to the existing array
          : Array.from(files) // Initialize with new files if none exist
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: e.target.value
      }));
    }
  
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };
  

  console.log(formData);

  const validateForm = () => {
    let formErrors = {};
    let valid = true;

    if (!formData.name) {
      formErrors.name = "Name is required";
      // valid = false;
    }
    if (!formData.contact || formData.contact.length<10) {

      if(formData.contact.length==0){
        formErrors.contact = "Contact no is required";

      }
      else{
        formErrors.contact = "Contact no must be 10 charactor ";
      }

      valid = false;
    }
   
    if (!formData.price_per_day) {
      formErrors.price_per_day = "Price per day is required";
      valid = false;
    }
    if (!formData.available_time) {
      formErrors.available_time = "Available time is required";
      valid = false;
    }
    if (!formData.address) {
      formErrors.address = "Address is required";
      valid = false;
    }
    if (formData.photos.length === 0) {
      formErrors.photos = "At least one photo is required";
      valid = false;
    }
    if (!formData.description) {
      formErrors.description = "Description is required";
      valid = false;
    }
    setErrors(formErrors);
    return valid;
  };

  const formSubmitFun = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      
      try {
        const data = new FormData();

        // Append each field to FormData
        for (const key in formData) {
          if (key === 'photos') {
            formData[key].forEach((file, index) => {
              data.append('photos[]', file); // Use array notation for multiple files
            });
          } else {
            data.append(key, formData[key]);
          }
        }
      setLoading(true)
        const token = localStorage.getItem('token');
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/hostel/hostelimgupload.php`,
          data, // Send FormData directly
          { headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data' // Required for file uploads
          } }
        );
        // if (loading) { <Loader />}

        console.log(response.data);
        if (response.data.status === 'success') {
          notification.success({
              message: 'Form Submitted Successfully!',
              description: response.data.message || 'Hostel added successfully.',
          });
          // message.success("hostel added sucessfully");

          // setFormData({

          //   name: '',
          //   contact: '',
          //   price_per_day: '',
          //   available_time: '',
          //   address: '',
          //   description: '',
          //   photos: []
          // });
          // navigate("/pethostel")
 // Clear the file input field
 if (fileInputRef.current) {
  fileInputRef.current.value = '';
}
            // navigate('/success'); // Uncomment this if you have a success page
        }

        else {
          // Show error notification
          setErrors(response.data.errors )
          notification.error({
              message: 'Submission Failed',
              description: response.data.message || 'An unexpected error occurred.',
          });
          // throw new Error(response.data.message || 'An unexpected error occurred.');
      }

  

      } catch (error) {
        notification.error({
          message: 'Error Submitting Form',
          description: error.response?.data.message || error.message || 'There was an error submitting the form.',
      });
        // console.error("There was an error submitting the form!", error.response || error.message);
        // alert("There was an error submitting the form. Please try again.");
      }finally {
        setLoading(false); // Set loading to false after response is received
      }
    }
    else {
      setTimeout(() => {
     setErrors({});
      }, 4000);
    }
    
  };
  

  return (
    <>
      {loading && <Loader />}
      <h2 className="addHostelTitle">
          Need pet hostel services? We're here to take care of your pet!
        </h2>
      <div className="addHostelParent max-w-4xl mx-auto p-8  mb-5 mt-5">
        

        <form onSubmit={formSubmitFun}>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name <span className="star">*</span>
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                id="name"
                name="name"
                value={formData.name}
                type="text"
                placeholder="Name"
                onChange={onChangeFun}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
                Contact No <span className="star">*</span>
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                id="contact"
                name="contact"
                value={formData.contact}
                type="number" // Changed to text to handle non-numeric inputs
                placeholder="Contact no"
                onChange={onChangeFun}
              />
              {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price_per_day">
                Price per day <span className="star">*</span>
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                id="price_per_day"
                name="price_per_day"
                value={formData.price_per_day}
                type="number"
                placeholder="Price per day"
                onChange={onChangeFun}
              />
              {errors.price_per_day && <p className="text-red-500 text-xs mt-1">{errors.price_per_day}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="available_time">
                Available time
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                id="available_time"
                name="available_time"
                value={formData.available_time}
                type="time"
                placeholder="Available time"
                onChange={onChangeFun}
              />
              {errors.available_time && <p className="text-red-500 text-xs mt-1">{errors.available_time}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                Address <span className="star">*</span>
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                id="address"
                name="address"
                value={formData.address}
                rows="4"
                placeholder=" Address"
                onChange={onChangeFun}
              ></textarea>
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                id="description"
                name="description"
                value={formData.description}
                rows="4"
                placeholder="Description"
                onChange={onChangeFun}
              ></textarea>
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>
            
            <div className="sm:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photos">
                Upload Photos <span className="star">*</span>
              </label>
              <input
                className="fileInput"
                id="photos"
                name="photos"
                type="file"
                multiple // Allow multiple file uploads
                onChange={onChangeFun}
              />
              {errors.photos && <p className="text-red-500 text-xs mt-1">{errors.photos}</p>}
            </div>

          </div>


        <div className="text-center">
          <button className=" border border-transparent " type="submit">
        Submit
            </button>
            </div>

        </form>
      </div>
    </>
  );
}

export default AddPetHos;






