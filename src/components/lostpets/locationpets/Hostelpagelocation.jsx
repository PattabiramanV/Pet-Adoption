
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../components/Siteframe/Footer";
import Header from "../components/Siteframe/Header";
import CommonTable from "../components/commoncomponent/datatable/DataTable"; // Corrected path
import Loader from '../components/Loader/Loader';
import { message } from "antd";

const Hosteldetails = () => {
  const [hostelBookUser, setHostelBookUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/hostelbook.php?endpoint=hostel_user`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Ensure each data item has an id
      // const dataWithId = response.data.map((item, index) => ({ ...item, id: item.id || index }));
      const dataWithId = response.data.map((item, index) => ({
        ...item,
        id: item.id || index,  // Existing logic for `id`
        sno: index + 1         // Adding S.No starting from 1
      }));
      setHostelBookUser(dataWithId);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Error fetching user data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const columns = [
    {
      field: 'sno',
      headerName: 'S.No',
      width: 80,
      renderCell: (params) => params.rowIndex + 1, // Adding 1 to start numbering from 1
    },
  

    {
      field: 'avatar',
      headerName: 'Profile',
      renderCell: (params) => (
        <img
          src={params.value ? `../../backend/profile/uploads/${params.value}` : "https://via.placeholder.com/150"}
          alt="Profile"
          style={{ width: '50px', height: '50px' }}
        />
      ),
      width: 100
    },
    { field: 'username', headerName: 'User', width: 200 },
    { field: 'city', headerName: 'City', width: 200 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'name', headerName: 'Hostel', width: 150 },
    { field: 'price_per_day', headerName: 'Price/Day', width: 150 },
    { field: 'craeted_at', headerName: 'Booking Date', width: 150 },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: (params) => (
        params.value === 'Pending' ? (
          <button 
            onClick={() => handleAccept(params.row)} 
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Accept
          </button>
        ) : (
          params.value
        )
      ),
      width: 150
    }
  ];

  const handleAccept = async (data) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/hostel.php?id=${data.id}&value=Accepted`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        message.success("Hostel Accepted successfully");
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
      <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'HostelUserBookingPage', href: '/hostelusertable' }]} />
      <div className="div_table_for_doct">
        <CommonTable
          data={filteredData}
          columns={columns}
          loading={loading}
          error={error}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          title="Hostel Information"
        />
      </div>
      <Footer />
    </>
  );
};

export default Hosteldetails;
