import React from 'react';





function GrommingPetsForm(){
  return (  
    <>
      <div className="max-w-4xl mx-auto p-8 bg-gray-100 shadow-md mb-5 mt-5">
            <h2 className="text-2xl font-bold mb-6 text-green-800  ">  Apply for Pet Partner for Services </h2>
            <form>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none " id="name" type="text" placeholder=" Name" />
                    </div>                   
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">Contact No</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none " id="contact" type="text" placeholder="Contact No" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none " id="email" type="email" placeholder="Email" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pet-type">Pet Type</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 " id="pet-type" type="text" placeholder="Pet Type" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Pet Gender</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 " id="pet-gender" type="text" placeholder="Pet Gender" />
                    </div>
                    <div className="mt-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">Age of the pet</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 " id="age" type="text" placeholder="Age of the pet" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">City</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 " id="city" type="text" placeholder="city" />
                    </div>                 
                    <div className="sm:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="need ">What you need for your pet</label>
                        <textarea className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none " id="behavior" rows="4" placeholder="Describe What you need for your pet"></textarea>
                    </div> 
                    <div> 
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="upload">Upload your pet picture</label>
                        <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 " id="pet-pic" type="file" />
                    </div> 
                
                </div> 
                <div>
                    <button className="w-full  text-white py-2 rounded-lg bg-purple-600  "type="submit"> Submit</button>
                </div>
            </form>
        </div>
    </>
    )
}

export default GrommingPetsForm;