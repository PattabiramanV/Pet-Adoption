
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import './normaltable.css';
import { message, notification, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faSearch,faInbox } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';



const DoctorInfo = () => {
  const [doctorData, setDoctorData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const petsPerPage = 10; // Display 10 items per page
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/usertable.php`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = Array.isArray(response.data) ? response.data : [];
      setDoctorData(data);
      setFilteredData(data);
    } catch (error) {
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = doctorData.filter((doctor) =>
      Object.values(doctor).some(
        (val) => typeof val === 'string' && val.toLowerCase().includes(value)
      )
    );

    setFilteredData(filtered);
  };

  const handleClear = async (data) => {
    setLoading(true);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/addvetrinarydocformapi.php?id=${data.id}&value=Cancelled`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        await sendEmailNotification(data);
        fetchData(); // Refresh the data
      }
    } catch (error) {
      console.error('There was an error submitting the form!', error.response || error.message);
      notification.error({
        message: 'Request Submission Failed',
        description: 'There was an error submitting your request. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const sendEmailNotification = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/canceldmail.php`,
        {
          email: data.doctor_email,
          doctorName: data.doctor_name,
        },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        notification.success({
          message: 'Your appointment has been canceled successfully',
          description: 'An email notification has been sent to the doctor.',
        });
      }
    } catch (error) {
      console.error('There was an error sending the email!', error.response || error.message);
      notification.error({
        message: 'Email Sending Failed',
        description: 'There was an error sending the email notification. Please try again.',
      });
    }
  };


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

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };


  if (error) return <div className="error-alert">Error: {error}</div>;

  const offset = currentPage * petsPerPage;
  const currentData = filteredData.slice(offset, offset + petsPerPage);

  return (
    
    <div className="table-container">
      <h1>Medical Professional Summary</h1>

      <div className="search-container">
      {searchTerm === '' && (
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          )}
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      {filteredData.length === 0 ? (
        <div className="no-data-container">
         <img src="../src/assets/emptydata.png" alt="nodata image" />


          
        </div>
      ) : (
        <>

      <table className="custom-table">
        <thead>
          <tr> 
            <th>S.No</th>
            <th>Profile</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Specialization</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Appointment Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{offset + index + 1}</td>
              <td><img src={item.doctor_profile} alt="Profile" className="profile-img" /></td>
              <td>{item.doctor_name}</td>
              <td>{item.doctor_phone}</td>
              <td>{item.doctor_email}</td>
              <td>{item.specialization}</td>
              <td>{item.doctor_address}</td>
              <td>{item.doctor_city}</td>
              <td>{item.doctor_state}</td>
              <td>{item.appoinment_date}</td>
              <td>
                <span className={`status-label ${getStatusClass(item.status)}`}>
                  {item.status}
                </span>
              </td>
              <td className="action-buttons">
                <Tooltip title="Cancel" placement="top">
                  <button className="delete-btn" onClick={() => handleClear(item)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(filteredData.length / petsPerPage)}
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
       {loading && <Loader/>}
      </>
    )}
     
    </div>
  );
};


export default DoctorInfo;


