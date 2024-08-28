










import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../../Siteframe/Footer";
import Header from "../../Siteframe/Header";
import Loader from '../../Loader/Loader'; // Import the Loader component
import BreadcrumbComponent from '../../commoncomponent/Breadcrumb'; // Adjust the path as necessary
import { message, notification, Tooltip } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import CommonTable from './DataTable'; // Import the CommonTable component
import ReactPaginate from 'react-paginate';
import { faSearch,faCheck,faTimes } from '@fortawesome/free-solid-svg-icons';


const Hosteldetails = () => {
  const [hostelBookUser, setHostelBookUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const token = localStorage.getItem("token");

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/hostelbook.php?endpoint=hostel_user`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Ensure each data item has an id
      const dataWithId = response.data.map((item, index) => ({
        ...item,
        id: item.id || index,  // Existing logic for `id`
        sno: index + 1         // Adding S.No starting from 1
      }));
      setHostelBookUser(dataWithId);
    } catch (error) {
      console.error('Error fetching user data:', error);
      message.error('Error fetching user data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Accepted':
        return 'status-delivered';
      case 'Pending':
        return 'status-process';
      case 'Cancelled':
        return 'status-canceled';
      default:
        return '';
    }
  };

  const handleRemove = async (data) => {
   
    statusChangeFun(data,'Cancelled')

  };


  const handleAccept = async (data) => {
   
    statusChangeFun(data,'Accepted')

  };

  const statusChangeFun= async(data,status)=>{


    setLoading(true);
    try {
      const givenDateString = data.checkin_date;
      const givenDate = new Date(givenDateString);
      const currentDate = new Date();

      if (currentDate > givenDate) {
        notification.error({
          message: 'Exit Date',
          description: 'The current date is greater than the given date.',
        });
        return;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/hostel.php?id=${data.id}&value=${status}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        notification.success({
          message: 'Accepted your booking',
          description: 'You have successfully added your hostel booking.',
        });
        fetchUserData();
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error.response || error.message);
      message.error("There was an error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  
  
    }



  const filteredData = hostelBookUser.filter(item =>
    [item.username, item.phone, item.state, item.city].some(field =>
      String(field).toLowerCase().includes(searchTerm.toLowerCase().trim())
    )
  );

  const currentData = filteredData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );
  console.log(currentData);

  const handlePageClick = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const tableHeaders = [
    'S.No', 'Profile','Name', 'City', 'State','Phone','Booking Date', 'Status', 'Action'
  ];

  const tableBody = currentData.map((item, index) => [
    (currentPage - 1) * recordsPerPage + index + 1,
    // <div className='profileName'>
      <img src={`../../backend/profile/uploads/${item.avatar}`} alt="" className='profileImg' />,
      <span>{item.username}</span>,
    // </div>,
    item.city,
    item.state,
    item.phone,
    item.craeted_at,
    
    <span className={`status-label ${getStatusClass(item.status)}`}>
      {item.status}
    </span>,
<>
<Tooltip title="Accept" placement="top">
  <button
    className={`action-button ${item.status === 'Accepted' || item.status === 'Cancelled' ? 'disabled' : ''}`}
    onClick={() => item.status === 'Pending' && handleAccept(item)}
    style={{
      color: 'white',
      backgroundColor: 'green',
      marginRight: '12px',
      cursor: item.status === 'Accepted' || item.status === 'Cancelled' ? 'not-allowed' : 'pointer',
      opacity: item.status === 'Accepted' || item.status === 'Cancelled' ? 0.7 : 1,
      border: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      fontWeight: 'bold'
    }}
    disabled={item.status === 'Accepted' || item.status === 'Cancelled'}
  >
    Accept
  </button>
</Tooltip>

<Tooltip title="Cancel" placement="top">
  <button
    className={`action-button ${item.status === 'Accepted' || item.status === 'Cancelled' ? 'disabled' : ''}`}
    onClick={() => item.status === 'Pending' && handleRemove(item)}
    style={{
      color: 'white',
      backgroundColor: 'red',
      marginRight: '12px',
      cursor: item.status === 'Accepted' || item.status === 'Cancelled' ? 'not-allowed' : 'pointer',
      opacity: item.status === 'Accepted' || item.status === 'Cancelled' ? 0.7 : 4,
      border: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      fontWeight: 'bold'
    }}
    disabled={item.status === 'Accepted' || item.status === 'Cancelled'}
  >
    Cancel
  </button>
</Tooltip>



</>
  ]);

  return (
    <>
 {loading && <Loader/>}

 {hostelBookUser.length === 0 ? (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <img 
      src="/src/assets/norecord.jpg" 
      alt="No data available" 
      style={{ Width: '500px', height: '500px' }} 
    />
    {/* <h2 style={{ color: 'rgba(12, 12, 12, 0.7)' }}>No booking details found</h2> */}
  </div>
) : (
  <>
    <h1 style={{
      fontSize: '26px',
      color: 'rgba(12, 12, 12, 1)',
      fontWeight: 700,
      textAlign: 'center',
      marginTop: '27px',
      textTransform: 'uppercase'
    }}>User Booking Details</h1>

    <div className="table-container mt-2 mb-10">
      <div className="search-container">
        {searchTerm === '' && (
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        )}
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
          className="search-input searchBox"
        />
      </div>
      <CommonTable
        headers={tableHeaders}
        body={tableBody}
        onAction={(item) => handleClear(item)}
        isLoading={loading}
      />
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(filteredData.length / recordsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        activeClassName={'active-page'}
        previousClassName={'previous-page'}
        nextClassName={'next-page'}
        disabledClassName={'disabled-page'}
      />
    </div>
  </>
)}

     
    </>
  );
};

export default Hosteldetails;
