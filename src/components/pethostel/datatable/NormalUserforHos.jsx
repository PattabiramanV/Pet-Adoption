

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../../Siteframe/Footer";
import Header from "../../Siteframe/Header";
import Loader from '../../Loader/Loader'; // Import the Loader component
import BreadcrumbComponent from '../../commoncomponent/Breadcrumb'; // Adjust the path as necessary
import { message, notification, Tooltip } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import CommonTable from './DataTable'; // Import the CommonTable component
import ReactPaginate from 'react-paginate';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Table = () => {
  const [hostelBookUser, setHostelBookUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const token = localStorage.getItem("token");

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

  const handleClear = async (data) => {
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
        `${import.meta.env.VITE_API_BASE_URL}/api/hostel.php?id=${data.id}&value=Cancelled`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        notification.error({
          message: 'Booking Cancelled',
          description: 'You have successfully cancelled your hostel booking.',
        });
        fetchUserData();
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error.response || error.message);
      message.error("There was an error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = hostelBookUser.filter(item =>
    [item.name, item.contact, item.address, item.price_per_day].some(field =>
      String(field).toLowerCase().includes(searchTerm.toLowerCase().trim())
    )
  );

  const currentData = filteredData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handlePageClick = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const tableHeaders = [
    'S.No', 'Name', 'Address', 'Phone', 'Booking Date', 'Check-in/out', 'Status', 'Action'
  ];

  const tableBody = currentData.map((item, index) => [
    (currentPage - 1) * recordsPerPage + index + 1,
   
      // <img src={`../../backend/hostel/hostelimg/${item.photos}`} alt="" className='profileImg' />,
      <span>{item.name}</span>
   ,
    item.address,
    item.contact,
    item.craeted_at,
    `${item.checkin_date}-${item.checkout_date}`,
    <span className={`status-label ${getStatusClass(item.status)}`}>
      {item.status}
    </span>,
    <Tooltip title="Cancel" placement="top">
      <button className="delete-btn" onClick={() => handleClear(item)}>
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </Tooltip>
  ]);

  return (
    <>
      <h1 style={{
  fontSize: '26px',
  color: 'rgba(12, 12, 12, 1)',
  fontWeight: 700,
  textAlign: 'center',
  marginTop: '27px',
  textTransform:'uppercase'
}}>Booked Hostel Details</h1>
      <div className="table-container mt-10 mb-10">
        
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
  );
};

export default Table;


















