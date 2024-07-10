import React from 'react';


const Lostpets_form = () => {

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 shadow-md mb-5 mt-5">
            <h2 className="text-2xl font-bold mb-6 text-green-800  ">Add Losting Pets</h2>
            <form>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Pet Name</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none " id="name" type="text" placeholder="Pet Name" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">Pet Type</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none " id="Prt Type" type="text" placeholder="Pet Type" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Age</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none " id="age" type="age" placeholder="Age" />
                    </div>
                    <div className="mt-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Pet’s Gender</label>
                        <select className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 " id="gender">
                            <option>Select Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">Contact No</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 " id="Contact No" type="number" placeholder="Contact no" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkout">Lost Date</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2" id="Lost" type="date" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">Photo</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 " id="Photo" type="file" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Address">Address</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2" id="Address" type="Address" />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="behavior">Description</label>
                        <textarea className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none " id="description" rows="4" placeholder="Describe your Pets"></textarea>
                    </div>
                </div>
                <div>
                    <button className="w-full  text-white py-2 rounded-lg bg-purple-600 " type="submit">Submit</button>
                </div>
            </form>
        </div>
          );
};

export default Lostpets_form;
