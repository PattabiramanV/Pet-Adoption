import  { useState } from 'react';
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
        reader.readAsDataURL(formData.profilePic);
        reader.onload = async () => {
            const base64Photo = reader.result.split(",")[1];
            const dataToSend = {
                ...formData,
                profilePic: base64Photo
            };

            try {
                const response = await axios.post('http://localhost/Pet-Adoption/Backend/api/addPet.php', dataToSend, {
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
        <div className=" max-w-4xl mx-auto p-8 bg-gray-100 shadow-md mb-5 mt-5">
            <h2 className="text-2xl font-bold mb-6 text-green-800">Rehome Your Pet</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petName">Pet Name</label>
                        <input
                            name="petName"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="petName"
                            type="text"
                            value={formData.petName}
                            onChange={handleChange}
                            placeholder="Pet Name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petcategory">Pet Category</label>
                        <input
                            name="petcategory"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="petcategory"
                            type="text"
                            value={formData.petcategory}
                            onChange={handleChange}
                            placeholder="dog or cat or something"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">City</label>
                        <input
                            name="city"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="city"
                            type="text"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Location</label>
                        <input
                            name="location"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="location"
                            type="text"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Location"
                            required
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petDescription">Pet Description</label>
                        <textarea
                            name="petDescription"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="petDescription"
                            rows="4"
                            value={formData.petDescription}
                            onChange={handleChange}
                            placeholder="Describe your pet"
                            required
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
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Gender</label>
                        <select
                            name="gender"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">Age</label>
                        <select
                            name="age"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Age</option>
                            <option value="Less than 1 year">Less than 1 year</option>
                            <option value="1-3 years">1-3 years</option>
                            <option value="3-5 years">3-5 years</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="size">Size</label>
                        <select
                            name="size"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="size"
                            value={formData.size}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Size</option>
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Price</label>
                        <input
                            name="price"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Price"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">Color</label>
                        <select
                            name="color"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="color"
                            value={formData.color}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Color</option>
                            <option value="Black">Black</option>
                            <option value="White">White</option>
                            <option value="Brown">Brown</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
                        <input
                            name="address"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="address"
                            type="text"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Address"
                            required
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePic">Upload Pet Photos</label>
                        <input
                            name="profilePic"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="profilePic"
                            type="file"
                            onChange={handleChange}
                            required
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

export default Sale;
