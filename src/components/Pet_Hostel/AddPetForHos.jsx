import React from "react";


function AddPetHos() {
   
    
    return (

        <>
        <div className="max-w-4xl mx-auto p-8 bg-gray-100 shadow-md mb-5 mt-5">
            <h2 className="text-2xl font-bold mb-6 text-green-800  ">Need pet hostel services?  here to take care of your pet!</h2>
            <form>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none " id="name" type="text" placeholder="Pattabi Raman V" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">Contact No</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none " id="contact" type="text" placeholder="Contact No" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none " id="email" type="email" placeholder="pattabiramanvdckap@gmail.com" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petType">Pet Type</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none " id="petType" type="text" placeholder="Dogs" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="breed">Breed</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none " id="breed" type="text" placeholder="Breed" />
                    </div>
                    <div className="mt-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Pet’s Gender</label>
                        <select className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 " id="gender">
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">Pet's Age</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 " id="age" type="number" placeholder="Pet's Age" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">City</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 " id="city" type="text" placeholder="City" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkout">Check-in-Date</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 " id="checkout" type="date" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkout">Check-out Date</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2" id="checkout" type="date" />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="behavior">Tell us about your Pet's Behaviour</label>
                        <textarea className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none " id="behavior" rows="4" placeholder="Describe your pet's behaviour"></textarea>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Are you a Pet Parent?</label>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <input className="mr-2" id="pet-parent-yes" type="radio" name="pet-parent" value="yes" />
                                <label htmlFor="pet-parent-yes" className="text-gray-700">Yes</label>
                            </div>
                            <div className="flex items-center">
                                <input className="mr-2 hover:cursor-pointer " id="pet-parent-no" type="radio" name="pet-parent" value="no" />
                                <label htmlFor="pet-parent-no" className="text-gray-700">No</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button className="w-full  text-white py-2 rounded-lg bg-customBlue  " type="submit">Submit</button>
                </div>
            </form>
        </div>


</>
    );
}

export default AddPetHos;
