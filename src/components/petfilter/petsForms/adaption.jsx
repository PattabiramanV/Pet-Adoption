function Adoption() {
    return (
        <>    
            <div className="max-w-4xl mx-auto p-8 bg-gray-100 shadow-md mb-5 mt-5">
                <h2 className="text-2xl font-bold mb-6 text-green-800">Pet Adoption</h2>
                <form>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Your Name</label>
                            <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="username" type="text" placeholder="Your Name" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">City</label>
                            <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="city" type="text" placeholder="City" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Location</label>
                            <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="location" type="text" placeholder="Location" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
                            <input className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="address" type="text" placeholder="Address" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentMethod">Payment Method</label>
                            <select className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none" id="paymentMethod">
                                <option>Select Payment Method</option>
                                <option>Credit Card</option>
                                <option>Debit Card</option>
                                <option>PayPal</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                    </div>
                    <div>
                        <button className="w-full text-white py-2 rounded-lg bg-purple-600" type="submit">Proceed to Buy</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Adoption;
