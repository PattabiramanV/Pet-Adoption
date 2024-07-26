import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GroomingUsersTable = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const userId = 3; // Replace with dynamic value if needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost/petadoption/backend/api/usertable.php?user_id=${userId}`);
        setData(response.data);
        console.log('Fetched data:', response.data);
      } catch (error) {
        console.error('Failed to fetch data:', error); // Log the error details
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Grooming Users Details</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Doctor ID</th>
            <th className="py-2 px-4 border-b">Doctor Name</th>
            <th className="py-2 px-4 border-b">Doctor Address</th>
            <th className="py-2 px-4 border-b">Doctor Phone</th>
            <th className="py-2 px-4 border-b">Doctor Email</th>
            <th className="py-2 px-4 border-b">Specialization</th>
            <th className="py-2 px-4 border-b">User ID</th>
            <th className="py-2 px-4 border-b">User Contact</th>
            <th className="py-2 px-4 border-b">User Email</th>
            <th className="py-2 px-4 border-b">Pet Type</th>
            <th className="py-2 px-4 border-b">Pet Gender</th>
            <th className="py-2 px-4 border-b">Pet Age</th>
            <th className="py-2 px-4 border-b">City</th>
            <th className="py-2 px-4 border-b">Need for Pet</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{row.doctor_id}</td>
                <td className="py-2 px-4">{row.doctor_name}</td>
                <td className="py-2 px-4">{row.doctor_address}</td>
                <td className="py-2 px-4">{row.doctor_phone}</td>
                <td className="py-2 px-4">{row.doctor_email}</td>
                <td className="py-2 px-4">{row.specialization}</td>
                <td className="py-2 px-4">{row.user_id}</td>
                <td className="py-2 px-4">{row.user_contact}</td>
                <td className="py-2 px-4">{row.user_email}</td>
                <td className="py-2 px-4">{row.pet_type}</td>
                <td className="py-2 px-4">{row.pet_gender}</td>
                <td className="py-2 px-4">{row.pet_age}</td>
                <td className="py-2 px-4">{row.city}</td>
                <td className="py-2 px-4">{row.need_for_pet}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="14" className="text-center py-4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GroomingUsersTable;
