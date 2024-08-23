import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../components/Siteframe/Footer";
import Header from "../components/Siteframe/Header";
import CommonTable from "../components/commoncomponent/datatable/DataTable";
import text from "../assets/Cat_login.png";
import Loader from '../components/Loader/Loader'; // Import the Loader component
import BreadcrumbComponent from './commoncomponent/Breadcrumb'; // Adjust the path as necessary
import { message } from "antd";

const Hosteldetails = () => {
  const [hostelBookUser, setHostelBookUser] = useState([]);
  const token = localStorage.getItem("token"); // Replace with your actual token
  const [loading, setLoading] = useState(false); 
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/hostelbook.php?endpoint=normal_user`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHostelBookUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Error fetching user data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []); // Empty dependency array means this effect runs once when the component mounts
  
  const columns = [
    {
      field: 'photos',
      headerName: 'Profile',
      width: 100,
      renderCell: (params) => (
        <img src={`../../backend/hostel/hostelimg/${params.value}`} alt="Profile" style={{ width: '50px', height: '50px' }} />
      )
    },
    {
      field: 'name',
      headerName: 'Hostel',
      width: 250
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 300
    },
    {
      field: 'contact',
      headerName: 'Phone',
      width: 200
    },
    {
      field: 'price_per_day',
      headerName: 'Price/Day',
      width: 150
    },
    {
      field: 'craeted_at',
      headerName: 'Booking Date',
      width: 200
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 300,
      renderCell: (params) => (
        params.value === 'Pending' || params.value === 'Accepted' ? (
          <div className='flex items-center gap-2'>
            <p>{params.value}</p>
            <button 
              onClick={() => handleClear(params.row)} 
              className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              Clear
            </button>
          </div>
        ) : (
          params.value
        )
      )
    }
  ];

  const handleClear = async (data) => {
    setLoading(true);
    try {
      const givenDateString = data.checkin_date;
      const givenDate = new Date(givenDateString);
      const currentDate = new Date();
      if (currentDate > givenDate) {
        return message.success("The current date is greater than the given date.");
      }
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/hostel.php?id=${data.id}&value=Cancelled`,
        {}, // Pass an empty object for the request body
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        message.success("Hostel deleted successfully");
        fetchUserData();
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error.response || error.message);
      message.error("There was an error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = hostelBookUser.filter(row =>
    Object.values(row).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <>
      {loading && <Loader />}
      <Header />
      <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'NormalUserBookingPage', href: '/normaluserforhos' }]} />
      <div className="div_table_for_doct">
        <CommonTable 
          data={filteredData} 
          columns={columns} 
          loading={loading} 
          error={error} 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          title="User Information"
        />
      </div>
      <Footer />
    </>
  );
};

export default Hosteldetails;
