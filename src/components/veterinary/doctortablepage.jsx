import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { notification } from 'antd';
import Loader from '../Loader/Loader';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faInbox } from '@fortawesome/free-solid-svg-icons';
import './normaltable.css';

const Doctorpersonalpage = () => {
  const [doctorData, setDoctorData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const petsPerPage = 10;
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/doctortable.php`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = Array.isArray(response.data) ? response.data : [];
      setDoctorData(data);
      setFilteredData(data);
    } catch (error) {
      console.error('Fetch Data Error:', error);
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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

  const handleChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    if (!value) {
      setFilteredData(doctorData);
    } else {
      const filtered = doctorData.filter((doctor) =>
        Object.values(doctor).some(
          (val) => typeof val === 'string' && val.toLowerCase().includes(value)
        )
      );
      setFilteredData(filtered);
    }
  };

  const handleAccept = async (doctor) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/addvetrinarydocformapi.php?id=${doctor.id}&value=Accepted`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        notification.success({
          message: 'Doctor Accepted Your Appointment',
          description: 'Your grooming appointment has been successfully accepted by the doctor.',
        });
        fetchData();
      }
    } catch (error) {
      notification.error({
        message: 'Request Submission Failed',
        description: 'There was an error submitting your request. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Pagination logic
  const offset = currentPage * petsPerPage;
  const currentPageData = filteredData.slice(offset, offset + petsPerPage);

  if (loading) return <Loader />;
  if (error) return <div className="error-alert">Error: {error}</div>;

  return (
    <div className="table-container">
      <h1>Client Information Hub</h1>

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
                <th>User Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Appointment Date</th>
                <th>Pet Type</th>
                <th>Pet Gender</th>
                <th>Pet Age</th>
                <th>City</th>
                <th>Needs</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.map((doctor, index) => (
                <tr key={index}>
                  <td>{offset + index + 1}</td>
                  <td><img src={doctor.users_profile} alt="Profile" className="profile-img" /></td>
                  <td>{doctor.grooming_user_name}</td>
                  <td>{doctor.grooming_user_phone}</td>
                  <td>{doctor.grooming_user_email}</td>
                  <td>{doctor.appoinment_date}</td>
                  <td>{doctor.pet_type}</td>
                  <td>{doctor.pet_gender}</td>
                  <td>{doctor.pet_age}</td>
                  <td>{doctor.city}</td>
                  <td>{doctor.what_you_need_for_your_pet}</td>
                  <td>
                    <span className={`status-label ${getStatusClass(doctor.status)}`}>
                      {doctor.status === 'Pending' ? (
                        <button
                          onClick={() => handleAccept(doctor)}
                          className="accept-btn"
                        >
                          Accept
                        </button>
                      ) : (
                        doctor.status
                      )}
                    </span>
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
        </>
      )}
    </div>
  );
};

export default Doctorpersonalpage;







// import React, { useEffect, useState } from 'react';
/*import axios from 'axios';
import { Input, notification,message } from 'antd';
import Loader from '../Loader/Loader';
import './normaltable.css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'antd';


const { Search } = Input;

const Doctorpersonalpage = () => {
  const [doctorData, setDoctorData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/doctortable.php`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = Array.isArray(response.data) ? response.data : [];
      setDoctorData(data);
      setFilteredData(data);
    } catch (error) {
      console.error('Fetch Data Error:', error);
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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

  
  // const handleSearch = (value) => {
  //   if (!value) {
  //     setFilteredData(doctorData);
  //   } else {
  //     const lowercasedValue = value.toLowerCase();
  //     const filtered = doctorData.filter((doctor) =>
  //       Object.values(doctor).some(
  //         (val) => typeof val === 'string' && val.toLowerCase().includes(lowercasedValue)
  //       )
  //     );
  //     setFilteredData(filtered);
  //   }
  // };

  const handleAccept = async (data) => {
    try {
      setLoading(true);

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/addvetrinarydocformapi.php?id=${data.id}&value=Accepted`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        notification.success({
          message: 'Doctor Accepted Your Appointment',
          description: 'Your grooming appointment has been successfully accepted by the doctor.',
        });

        fetchData();
      }
    } catch (error) {
      notification.error({
        message: 'Request Submission Failed',
        description: 'There was an error submitting your request. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="error-alert">Error: {error}</div>;

  return (
    <div className="table-container">
      <h1>Client Information Overview</h1>
      {/* <Search
        placeholder="Search..."
        onSearch={handleSearch}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: '16px', width: '30%' }}
        enterButton
        allowClear
      /> */
//       <div className='table-container mt-10 mb-10'>
//       <table className="custom-table">
//         <thead>
//           <tr>
//             <th>Profile</th>
//             <th>User Name</th>
//             <th>Phone</th>
//             <th>Email</th>
//             <th>Appointment Date</th>
//             <th>Pet Type</th>
//             <th>Pet Gender</th>
//             <th>Pet Age</th>
//             <th>City</th>
//             <th>Needs</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.map((doctor) => (
//             <tr key={doctor.id}>
//               <td><img src={doctor.users_profile} alt="Profile" className="profile-img" /></td>
//               <td>{doctor.grooming_user_name}</td>
//               <td>{doctor.grooming_user_phone}</td>
//               <td>{doctor.grooming_user_email}</td>
//               <td>{doctor.appoinment_date}</td>
//               <td>{doctor.pet_type}</td>
//               <td>{doctor.pet_gender}</td>
//               <td>{doctor.pet_age}</td>
//               <td>{doctor.city}</td>
//               <td>{doctor.what_you_need_for_your_pet}</td>
//               <td>

//               <td>
//                 <span className={`status-label ${getStatusClass(doctor.status)}`}>
//                   {doctor.status}
//                 </span>
//             </td>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       </div>
//     </div>
//   );
// };

// export default Doctorpersonalpage;
