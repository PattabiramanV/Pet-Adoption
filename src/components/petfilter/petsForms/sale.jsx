import { useState } from 'react';
import axios from 'axios';
import { notification } from 'antd';
import Footer from '../../Siteframe/Footer';
import Header from '../../Siteframe/Header';
import Loader from '../../Loader/Loader';
import BreadcrumbComponent from '../../commoncomponent/Breadcrumb'
import './sale.css'
import { useNavigate } from 'react-router-dom'; 

const Sale = () => {
    const [formData, setFormData] = useState({
        petName: '',
        petcategory: '',
        city: '',
        location: '',
        petDescription: '',
        breed: '',
        gender: '',
        age: '',
        size: '',
        price: '',
        color: '',
        address: '',
        profilePic: []
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files, type } = e.target;

        if (type === 'file') {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: prevFormData[name]
                    ? [...prevFormData[name], ...Array.from(files)]
                    : Array.from(files)
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const validateForm = () => {
    const newErrors = {};

    // Validate petName (should be a string and not a number)
    if (!formData.petName) {
        newErrors.petName = "Pet Name is required";
    } else if (!isNaN(formData.petName)) {
        newErrors.petName = "Pet Name must be a string";
    }

    // Validate petCategory
    if (!formData.petcategory) newErrors.petcategory = "Pet Category is required";

    // Validate city
    if (!formData.city) newErrors.city = "City is required";

    // Validate location
    if (!formData.location) newErrors.location = "Location is required";

    // Validate petDescription
    if (!formData.petDescription) newErrors.petDescription = "Pet Description is required";

    // Validate breed
    if (!formData.breed) newErrors.breed = "Breed is required";

    // Validate gender
    if (!formData.gender) newErrors.gender = "Gender is required";

    // Validate age (should be a positive number)
    if (!formData.age) {
        newErrors.age = "Age is required";
    } else if (isNaN(formData.age) || formData.age <= 0) {
        newErrors.age = "Valid Age is required";
    }

    // Validate size
    if (!formData.size) newErrors.size = "Size is required";

    // Validate price (should be a positive number)
    if (!formData.price) {
        newErrors.price = "Price is required";
    } else if (isNaN(formData.price) || formData.price <= 0) {
        newErrors.price = "Valid Price is required";
    }

    // Validate color
    if (!formData.color) newErrors.color = "Color is required";

    // Validate address
    if (!formData.address) newErrors.address = "Address is required";

    // Validate profilePic (should not be empty)
    if (!formData.profilePic.length) newErrors.profilePic = "Profile Picture is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        const data = new FormData();

        for (const key in formData) {
            if (Array.isArray(formData[key])) {
                formData[key].forEach((file) => data.append(`${key}[]`, file));
            } else {
                data.append(key, formData[key]);
            }
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/petsapi/addPet.php`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data) {
                notification.success({
                    message: 'Form successfully submitted',
                    description: 'Your pet has been added for sale.',
                });

                // Reset the form fields
                setFormData({
                    petName: '',
                    petcategory: '',
                    city: '',
                    location: '',
                    petDescription: '',
                    breed: '',
                    gender: '',
                    age: '',
                    size: '',
                    price: '',
                    color: '',
                    address: '',
                    profilePic: []
                });

                navigate('/adopte'); // Corrected navigation
            } else {
                notification.error({
                    message: 'Submission Failed',
                    description: response.data.message || 'There was an issue submitting the form.',
                });
            }
        } catch (error) {
            console.error('There was an error!', error);
            setError('An error occurred while submitting the form.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Header />
           <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Sale',href: '/sale' }]} />
            <h2 className="addHostelTitle">Rehome Your Pet</h2>
            <div className="addHostelParent max-w-4xl mx-auto p-8  mb-5 mt-5">
             {loading ? (
                    <div className="loader-container">
                        <Loader />
                    </div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : (
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petName">Pet Name <span className="star">*</span></label>
                        <input
                            name="petName"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.petName ? 'border-red-500' : ''}`}
                            id="petName"
                            type="text"
                            value={formData.petName}
                            onChange={handleChange}
                            placeholder="Pet Name"
                        />
                        {errors.petName && <p className="text-red-500 text-xs mt-1">{errors.petName}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petcategory">Pet Category <span className="star">*</span> </label>
                        <input
                            name="petcategory"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.petcategory ? 'border-red-500' : ''}`}
                            id="petcategory"
                            type="text"
                            value={formData.petcategory}
                            onChange={handleChange}
                            placeholder="dog or cat or something"
                        />
                        {errors.petcategory && <p className="text-red-500 text-sm">{errors.petcategory}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">City <span className="star">*</span></label>
                        <input
                            name="city"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.city ? 'border-red-500' : ''}`}
                            id="city"
                            type="text"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City"
                        />
                        {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Location <span className="star">*</span></label>
                        <input
                            name="location"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.location ? 'border-red-500' : ''}`}
                            id="location"
                            type="text"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Location"
                        />
                        {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petDescription">Pet Description <span className="star">*</span> </label>
                        <textarea
                            name="petDescription"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.petDescription ? 'border-red-500' : ''}`}
                            id="petDescription"
                            rows="4"
                            value={formData.petDescription}
                            onChange={handleChange}
                            placeholder="Describe your pet"
                        />
                        {errors.petDescription && <p className="text-red-500 text-sm">{errors.petDescription}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="breed">Breed <span className="star">*</span></label>
                        <input
                            name="breed"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.breed ? 'border-red-500' : ''}`}
                            id="breed"
                            type="text"
                            value={formData.breed}
                            onChange={handleChange}
                            placeholder="Breed"
                        />
                        {errors.breed && <p className="text-red-500 text-sm">{errors.breed}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Gender <span className="star">*</span></label>
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
                        {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">Age <span className="star">*</span></label>
                        <input
                            name="age"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.age ? 'border-red-500' : ''}`}
                            id="age"
                            type="text"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="Age"
                        />
                        {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="size">Size <span className="star">*</span></label>
                        <select
                            name="size"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.size ? 'border-red-500' : ''}`}
                            id="size"
                            value={formData.size}
                            onChange={handleChange}
                        >
                            <option value="">Select Size</option>
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                        </select>
                        {errors.size && <p className="text-red-500 text-sm">{errors.size}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Price <span className="star">*</span></label>
                        <input
                            name="price"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.price ? 'border-red-500' : ''}`}
                            id="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Price"
                        />
                        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">Color <span className="star">*</span></label>
                        <select
                            name="color"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.color ? 'border-red-500' : ''}`}
                            id="color"
                            value={formData.color}
                            onChange={handleChange}
                        >
                            <option value="">Select Color</option>
                            <option value="Black">Black</option>
                            <option value="White">White</option>
                            <option value="Brown">Brown</option>
                        </select>
                        {errors.color && <p className="text-red-500 text-sm">{errors.color}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address <span className="star">*</span></label>
                        <input
                            name="address"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.address ? 'border-red-500' : ''}`}
                            id="address"
                            type="text"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Address"
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePic">Upload Pet Photos <span className="star">*</span></label>
                        <input
                            name="profilePic"
                            className={`w-full px-3 py-2  border rounded-lg shadow-sm focus:outline-none ${errors.profilePic ? 'border-red-500' : ''}`}
                            id="profilePic"
                            type="file"
                            onChange={handleChange}
                            multiple
                        />
                        {errors.profilePic && <p className="text-red-500 text-sm">{errors.profilePic}</p>}
                    </div>
                    
                </div>
                <div className="text-center">
                    <button className="border border-transparent " type="submit">Submit</button>
                </div>
            </form>
                )}
            </div>
        <Footer />
         </>

    );
};

export default Sale;

