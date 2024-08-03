import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../components/Siteframe/Footer";
import Header from "../components/Siteframe/Header";
import DataTable from "../components/commoncomponent/DataTable";
import text from "../assets/Cat_login.png";
const Hosteldetails = () => {
  const [hostelBookUser, setHostelBookUser] = useState(null);
  const token = localStorage.getItem("token"); // Replace with your actual token

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/hostelbook.php?endpoint=normal_user`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setHostelBookUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []); // Empty dependency array means this effect runs once when the component mounts
  console.log(hostelBookUser);
  const columns = [
    {
        title: 'Profile',
        dataIndex: 'photos',
        key: 'photos',
        render: (text) => <img src={`../../backend/hostel/hostelimg/${text}`} alt="Profile" style={{ width: '50px', height: '50px' }} />
    },
    {
        title: 'Hostel',
        dataIndex: 'name',
        key: 'name'
    },
    // {
    //     title: 'City',
    //     dataIndex: 'doctor_city',
    //     key: 'doctor_city'
    // },
    // {
    //     title: 'State',
    //     dataIndex: 'doctor_state',
    //     key: 'doctor_state'
    // },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
    },
    {
        title: 'Phone',
        dataIndex: 'contact',
        key: 'contact'
    },
    // {
    //     title: 'Email',
    //     dataIndex: 'doctor_email',
    //     key: 'doctor_email'
    // },
    {
        title: 'Price/Day',
        dataIndex: 'price_per_day',
        key: 'price_per_day'
    },
    {
        title: 'Booking Date',
        dataIndex: 'craeted_at',
        key: 'craeted_at'
    },
  
];
  return (
    <>
      <Header />
      <DataTable data={hostelBookUser} columns={columns} title="Hostel User Information" />
      <Footer />
    </>
  );
};

export default Hosteldetails;
