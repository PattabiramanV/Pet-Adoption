
import React from "react";

function AddVeterinaryDocter (){
    return (
        <>    
        <div className="max-w-4xl mx-auto p-8 bg-gray-100 shadow-md mb-5 mt-5">
            <h2 className="text-2xl font-bold mb-6 text-green-800  ">Add veterinary doctor information</h2>
            <form>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Doctor Name</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none " id="name" type="text" placeholder="Doctor Name" />
                    </div>
                   
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petType">Education</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none " id="education" type="text" placeholder="Education" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">Contact No</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none " id="contact" type="text" placeholder="Contact No" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">Experience</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 " id="experience" type="number" placeholder="Experience" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none " id="email" type="email" placeholder="Email" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="breed">Do You Have a Clinic?</label>
                        <select className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 " id="clinic">
                            <option>YES</option>
                            <option>NO</option>
                        </select>
                    </div>
                    <div className="mt-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Home Visiting Available</label>
                        <select className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 " id="HomeVisitingAvailable">
                            <option>YES</option>
                            <option>NO</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">Specialisation</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 " id="specialisation" type="text" placeholder="Specialisation" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkout">Your Address</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 " id="address" type="text" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkout">Available Timing</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 " id="available timing" type="text" />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="behavior">Tell us about your self</label>
                        <textarea className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none " id="behavior" rows="4" placeholder="Describe your self"></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkout">Upload your profile pic</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 " id="profile pic" type="file" />
                    </div>
                
                </div>
                <div>
                    <button className="w-full  text-white py-2 rounded-lg bg-purple-600  "type="submit">Submit</button>
                </div>
            </form>
        </div>
        
        </>
        
    );
   
} 



export default AddVeterinaryDocter;
