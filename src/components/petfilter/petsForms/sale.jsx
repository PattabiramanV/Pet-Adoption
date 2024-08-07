import { useState } from 'react';
import axios from 'axios';

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
        profilePic: null
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.petName) newErrors.petName = "Pet Name is required";
        if (!formData.petcategory) newErrors.petcategory = "Pet Category is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.location) newErrors.location = "Location is required";
        if (!formData.petDescription) newErrors.petDescription = "Pet Description is required";
        if (!formData.breed) newErrors.breed = "Breed is required";
        if (!formData.gender) newErrors.gender = "Gender is required";
        if (!formData.age || formData.age <= 0) newErrors.age = "Valid Age is required";
        if (!formData.size) newErrors.size = "Size is required";
        if (!formData.price || formData.price <= 0) newErrors.price = "Valid Price is required";
        if (!formData.color) newErrors.color = "Color is required";
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.profilePic) newErrors.profilePic = "Profile Picture is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const reader = new FileReader();
    const token = localStorage.getItem("token");
    reader.readAsDataURL(formData.profilePic);
    reader.onload = async () => {
        const base64Photo = reader.result.split(",")[1];

        try {
            const response = await axios.post('http://localhost/petadoption/backend/pets_api/addPet.php', {
                ...formData,
                profilePic: base64Photo
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert(response.data.message);
            if (response.data.success) {
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
                    profilePic: null
                });
            }
        } catch (error) {
            console.error('There was an error!', error);
        }
    };
};


    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-100 shadow-md mb-5 mt-5">
            <h2 className="text-2xl font-bold mb-6 text-center text-green-800">Rehome Your Pet</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petName">Pet Name</label>
                        <input
                            name="petName"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.petName ? 'border-red-500' : ''}`}
                            id="petName"
                            type="text"
                            value={formData.petName}
                            onChange={handleChange}
                            placeholder="Pet Name"
                        />
                        {errors.petName && <p className="text-red-500 text-sm">{errors.petName}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petcategory">Pet Category</label>
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">City</label>
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
                        {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petDescription">Pet Description</label>
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="breed">Breed</label>
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Gender</label>
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
                        {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="size">Size</label>
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Price</label>
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">Color</label>
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
                        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePic">Upload Pet Photos</label>
                        <input
                            name="profilePic"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${errors.profilePic ? 'border-red-500' : ''}`}
                            id="profilePic"
                            type="file"
                            onChange={handleChange}
                        />
                        {errors.profilePic && <p className="text-red-500 text-sm">{errors.profilePic}</p>}
                    </div>
                    
                </div>
                <div className="flex justify-center">
                    <button className="w-auto px-4 text-white py-2 rounded-lg bg-purple-600" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Sale;