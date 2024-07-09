import React  from "react";

function BookHos(){
 

    return(
<>
        <div className="flex flex-col md:flex-row p-6 bg-gray-50  w-full ">

        <div className="w-full md:w-2/3 p-4 bg-slate-100">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Add Your Pet Details</h2>
          <p className="mb-4 text-gray-600">Please fill in this information. It will help us to know about your pet.</p>

          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  items-center">
              <div>
                <label htmlFor="service-type" className="block text-gray-700">Service Type*</label>
                <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none " id="breed" type="text" placeholder="Breed" />

              </div>
              <div>
                <label htmlFor="pet-type" className="block text-gray-700">Pet Type*</label>
                <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none " id="breed" type="text" placeholder="Breed" />

              </div>
              <div>
                <label htmlFor="breed-type" className="block text-gray-700">Breed Type*</label>
                <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none " id="breed" type="text" placeholder="Breed" />

              </div>
              <div>
                <label htmlFor="pet-name" className="block text-gray-700">Pet Name</label>
                <input type="text" id="pet-name" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="age" className="block text-gray-700">Age*</label>
                <input type="text" id="age" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="gender" className="block text-gray-700">Gender*</label>
                <select id="gender" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>Select</option>
                  <option>Male</option>
                  <option>Female</option>

                </select>
              </div>
            </div>
            <div>
              <label htmlFor="expectations" className="block text-gray-700">Your Expectations from this Service</label>
              <textarea id="expectations" className="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
            </div>
          </form>

        </div>


        <div className="w-full md:w-1/3 p-4">
          <div className="bg-white p-4 rounded-md shadow-md">
            <button className="bg-yellow-500 text-white px-4 py-2 rounded mb-4">Include 2x Food</button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded mb-4">Includes 2x Walk</button>
            <div className="border-t border-gray-300 pt-4">
              <h3 className="text-xl font-semibold text-gray-800">Price & Inclusions</h3>
              <p className="text-teal-600 text-2xl font-bold mt-2">Service Price (per day) ₹ 700/-</p>
              <p className="text-gray-600">(Inclusive of all taxes)</p>
              <ul className="mt-4 space-y-2">
                <li className="text-gray-600">Premium Insurance <span className="text-gray-800 font-semibold">Free</span></li>
                <li className="text-gray-600">Daily Photo Updates <span className="text-gray-800 font-semibold">Free</span></li>
                <li className="text-gray-600">24/7 customer support <span className="text-gray-800 font-semibold">Included</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>





<div className=" bg-gray-50 ">
     <div className="w-full md:w-2/3 p-4 bg-slate-100 ml-6 ">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Add Your Pet Parent Details</h2>
          <p className="mb-4 text-gray-600">Please fill in this information. It will help us to know about you.</p>

          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  items-center">
              <div>
                <label htmlFor="service-type" className="block text-gray-700">Name*</label>
                <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none " id="breed" type="text" placeholder="Enter a name" />

              </div>
              <div>
                <label htmlFor="pet-type" className="block text-gray-700">Pet Type*</label>
                <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none " id="breed" type="text" placeholder="Breed" />

              </div>
              <div>
                <label htmlFor="breed-type" className="block text-gray-700">Breed Type*</label>
                <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none " id="breed" type="text" placeholder="Breed" />

              </div>
              <div>
                <label htmlFor="pet-name" className="block text-gray-700">Pet Name</label>
                <input type="text" id="pet-name" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="age" className="block text-gray-700">Age*</label>
                <input type="text" id="age" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="gender" className="block text-gray-700">Gender*</label>
                <select id="gender" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>Select</option>
                  <option>Male</option>
                  <option>Female</option>

                </select>
              </div>
            </div>
            <button
              type="button"
              className=" max-w-full  text-white font-medium text-sm px-5 py-2.5 me-2 mb-2  dark:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Book Now
            </button>
          </form>

        </div>
        </div>
</>
    )

}


export default BookHos;