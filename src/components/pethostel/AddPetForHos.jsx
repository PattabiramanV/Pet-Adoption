import React, { useState } from "react";

function AddPetHos() {

  const [formData, setFormData] = useState({
   
  });



  const onChangeFun = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };

  
  const formSubmitFun = async (e) => {
    e.preventDefault();

    try {
        const data=JSON.stringify(formData);
        const response = await axios.post('http://localhost/Pet-Adaption//your-endpoint.php', data);
        alert("Form submitted successfully!");
        // console.log(response.data);

      } catch (error) {
        console.error("There was an error submitting the form!", error);
        alert("There was an error submitting the form. Please try again.");
      }
  
    alert("Form submitted");

  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-8 bg-gray-100 shadow-md mb-5 mt-5">
        <h2 className="text-2xl font-bold mb-6 text-green-800">
          Need pet hostel services? here to take care of your pet!
        </h2>
        <form onSubmit={formSubmitFun}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                id="name"
                name="name"
                value={formData.name}
                type="text"
                placeholder="Pattabi Raman V"
                onChange={onChangeFun}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Contact No
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                id="phone"
                name="phone"
                value={formData.phone}
                type="text"
                placeholder="Contact No"
                onChange={onChangeFun}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                id="email"
                name="email"
                value={formData.email}
                type="email"
                placeholder="pattabiramanvdckap@gmail.com"
                onChange={onChangeFun}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petType">
                Pet Type
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                id="petType"
                name="petType"
                value={formData.petType}
                type="text"
                placeholder="Dogs"
                onChange={onChangeFun}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="breed">
                Breed
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                id="breed"
                name="breed"
                value={formData.breed}
                type="text"
                placeholder="Breed"
                onChange={onChangeFun}
              />
            </div>
            <div className="mt-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                Pet’s Gender
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={onChangeFun}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                Pet's Age
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
                id="age"
                name="age"
                value={formData.age}
                type="number"
                placeholder="Pet's Age"
                onChange={onChangeFun}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                City
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
                id="city"
                name="city"
                value={formData.city}
                type="text"
                placeholder="City"
                onChange={onChangeFun}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkin">
                Check-in Date
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
                id="checkin"
                name="checkin"
                value={formData.checkin}
                type="date"
                onChange={onChangeFun}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkout">
                Check-out Date
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
                id="checkout"
                name="checkout"
                value={formData.checkout}
                type="date"
                onChange={onChangeFun}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="behavior">
                Tell us about your Pet's Behaviour
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                id="behavior"
                name="behavior"
                value={formData.behavior}
                rows="4"
                placeholder="Describe your pet's behaviour"
                onChange={onChangeFun}
              ></textarea>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Are you a Pet Parent?</label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    className="mr-2"
                    id="pet-parent-yes"
                    type="radio"
                    name="petParent"
                    value="yes"
                    onChange={onChangeFun}
                    checked={formData.petParent === "yes"}
                  />
                  <label htmlFor="pet-parent-yes" className="text-gray-700">
                    Yes
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    className="mr-2 hover:cursor-pointer"
                    id="pet-parent-no"
                    type="radio"
                    name="petParent"
                    value="no"
                    onChange={onChangeFun}
                    checked={formData.petParent === "no"}
                  />
                  <label htmlFor="pet-parent-no" className="text-gray-700">
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button className="w-full text-white py-2 rounded-lg bg-customBlue" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddPetHos;
