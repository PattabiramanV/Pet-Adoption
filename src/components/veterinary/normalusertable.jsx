
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Input, notification } from 'antd';
// import Loader from '../Loader/Loader';
// import './normaltable.css';

// const { Search } = Input;

// const DoctorInfo = () => {
//     const [doctorData, setDoctorData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const token = localStorage.getItem('token');

//     const fetchData = async () => {
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/usertable.php`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             const data = Array.isArray(response.data) ? response.data : [];
//             setDoctorData(data);
//             setFilteredData(data);
//         } catch (error) {
//             setError("An error occurred while fetching data.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const handleSearch = (value) => {
//         if (!value) {
//             setFilteredData(doctorData);
//         } else {
//             const lowercasedValue = value.toLowerCase();
//             const filtered = doctorData.filter((doctor) =>
//                 Object.values(doctor).some(val =>
//                     typeof val === 'string' && val.toLowerCase().includes(lowercasedValue)
//                 )
//             );
//             setFilteredData(filtered);
//         }
//     };

//     const handleClear = async (data) => {
//         setLoading(true);

//         try {
//             const response = await axios.put(
//                 `${import.meta.env.VITE_API_BASE_URL}/api/addvetrinarydocformapi.php?id=${data.id}&value=Cancelled`,
//                 {}, 
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             if (response.status === 200) {
//                 await sendEmailNotification(data);
//                 fetchData(); 
//             }
//         } catch (error) {
//             console.error("There was an error submitting the form!", error.response || error.message);
//             notification.error({
//                 message: 'Request Submission Failed',
//                 description: 'There was an error submitting your request. Please try again.',
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     const sendEmailNotification = async (data) => {
//         try {
//             const response = await axios.post(
//                 `${import.meta.env.VITE_API_BASE_URL}/api/canceldmail.php`,
//                 {
//                     email: data.doctor_email,
//                     doctorName: data.doctor_name
//                 },
//                 { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
//             );

//             if (response.status === 200) {
//                 notification.success({
//                     message: 'Your appointment has been canceled successfully',
//                     description: 'An email notification has been sent to the doctor.',
//                 });
//             }
//         } catch (error) {
//             console.error("There was an error sending the email!", error.response || error.message);
//             notification.error({
//                 message: 'Email Sending Failed',
//                 description: 'There was an error sending the email notification. Please try again.',
//             });
//         }
//     };

//     if (loading) return <Loader />;
//     if (error) return <div className="error-alert">Error: {error}</div>;

//     return (
//         <div className="table-container">
//             <h1>Medical Practitioner Details</h1>
//             <Search
//                 placeholder="Search..."
//                 onSearch={handleSearch}
//                 onChange={(e) => handleSearch(e.target.value)}
//                 style={{ marginBottom: '16px', width: '30%' }}
//                 enterButton
//                 allowClear
//             />
//             <div className="normal-table">

        
//             <table className="styled-table">
//                 <thead>
//                     <tr>
//                         <th>Profile</th>
//                         <th>Name</th>
//                         <th>Phone</th>
//                         <th>Email</th>
//                         <th>Specialization</th>
//                         <th>City</th>
//                         <th>State</th>
//                         <th>Address</th>
//                         <th>Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredData.map((doctor) => (
//                         <tr key={doctor.doctor_id}>
//                             <td><img src={doctor.doctor_profile} alt="Profile" className="profile-img" /></td>
//                             <td>{doctor.doctor_name}</td>
//                             <td>{doctor.doctor_phone}</td>
//                             <td>{doctor.doctor_email}</td>
//                             <td>{doctor.specialization}</td>
//                             <td>{doctor.doctor_city}</td>
//                             <td>{doctor.doctor_state}</td>
//                             <td>{doctor.doctor_address}</td>
//                             <td>
//                                 {doctor.status === 'Pending' || doctor.status === 'Accepted' ? (
//                                     <div className="status-action">
//                                         <span>{doctor.status}</span>
//                                         <button 
//                                             onClick={() => handleClear(doctor)} 
//                                             className="clear-btn"
//                                         >
//                                             Cancel
//                                         </button>
//                                     </div>
//                                 ) : (
//                                     <span className={`status ${doctor.status.toLowerCase()}`}>
//                                         {doctor.status}
//                                     </span>
//                                 )}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
                
//         </div>
//     );
// };

// export default DoctorInfo;



// this is original code table structure.....................................................
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

  if (loading) return <Loader />;
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


          {/* <p className='text-center'>No data found</p> */}
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
      </>
    )}
    </div>
  );
};


export default DoctorInfo;





// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import Footer from "../components/Siteframe/Footer";
// // import Header from "../components/Siteframe/Header";
// // import Loader from '../components/Loader/Loader'; // Import the Loader component
// // import BreadcrumbComponent from './commoncomponent/Breadcrumb'; // Adjust the path as necessary
// // import { message, notification } from "antd";
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
// // import { Tooltip } from 'antd';


// // import './table.css'; // Ensure that the Table.css is imported



// // export default Hosteldetails;
// // import Footer from "../components/Siteframe/Footer";
// // import Header from "../components/Siteframe/Header";
// // import React from 'react';
// import './Table.css';

// const Table = () => {
//   // const data = [
//   //   { id: '#20462', product: 'Hat', customer: 'Matt Dickerson,1/25middle steeet', date: '13/05/2022', amount: '$4.95', paymentMode: 'Transfer Bank', status: 'Delivered' },
//   //   { id: '#18933', product: 'Laptop', customer: 'Wiktoria', date: '22/05/2022', amount: '$8.95', paymentMode: 'Cash on Delivery', status: 'Delivered' },
//   //   { id: '#45169', product: 'Phone', customer: 'Trixie Byrd', date: '15/06/2022', amount: '$1,149.95', paymentMode: 'Cash on Delivery', status: 'Process' },
//   //   { id: '#34304', product: 'Bag', customer: 'Brad Mason', date: '06/09/2022', amount: '$899.95', paymentMode: 'Transfer Bank', status: 'Process' },
//   //   { id: '#17188', product: 'Headset', customer: 'Sanderson', date: '25/09/2022', amount: '$22.95', paymentMode: 'Cash on Delivery', status: 'Canceled' },
//   //   { id: '#73003', product: 'Mouse', customer: 'Jun Redfern', date: '04/10/2022', amount: '$54.95', paymentMode: 'Transfer Bank', status: 'Delivered' },
//   //   { id: '#58825', product: 'Clock', customer: 'Miriam Kidd', date: '17/10/2022', amount: '$174.95', paymentMode: 'Transfer Bank', status: 'Delivered' },
//   //   { id: '#44122', product: 'T-shirt', customer: 'Dominic', date: '24/10/2022', amount: '$249.95', paymentMode: 'Cash on Delivery', status: 'Delivered' },
//   //   { id: '#89094', product: 'Monitor', customer: 'Shanice', date: '01/11/2022', amount: '$899.95', paymentMode: 'Transfer Bank', status: 'Canceled' },
//   //   { id: '#85252', product: 'Keyboard', customer: 'Poppy-Rose', date: '22/11/2022', amount: '$6.94', paymentMode: 'Transfer Bank', status: 'Process' },
//   //   { id: '#85252', product: 'Keyboard', customer: 'Poppy-Rose', date: '22/11/2022', amount: '$6.94', paymentMode: 'Transfer Bank', status: 'Process' },
//   //   { id: '#85252', product: 'Keyboard', customer: 'Poppy-Rose', date: '22/11/2022', amount: '$6.94', paymentMode: 'Transfer Bank', status: 'Process' },

    

//   // ];


//   const [hostelBookUser, setHostelBookUser] = useState([]);
//   const token = localStorage.getItem("token"); // Replace with your actual token
//   const [loading, setLoading] = useState(false); 
//   const [searchTerm, setSearchTerm] = useState('');
//   const [error, setError] = useState(null);

//   const fetchUserData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}/api/hostelbook.php?endpoint=normal_user`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setHostelBookUser(response.data);
// console.log(response.data);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       setError('Error fetching user data.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []); 

//   const getStatusClass = (status) => {
//     switch (status) {
//       case 'Accepted':
//         return 'status-delivered';
//       case 'Pending':
//         return 'status-process';
//       case 'Cancelled':
//         return 'status-canceled';
//       default:
//         return '';
//     }
//   };

//   const handleClear = async (data) => {
   
  
  
//     setLoading(true);
//     try {
//       const givenDateString = data.checkin_date;
//       const givenDate = new Date(givenDateString);
//       const currentDate = new Date();
  
//       // Check if the current date is greater than the given date
//       if (currentDate > givenDate) {
//         // message.success("The current date is greater than the given date.");
//         notification.error({
//           message: 'Exit Date',
//           description: 'The current date is greater than the given date.',
//         });
//         return;
//       }
  
//       // Make the API request to cancel the booking
//       const response = await axios.put(
//         `${import.meta.env.VITE_API_BASE_URL}/api/hostel.php?id=${data.id}&value=Cancelled`,
//         {}, // Empty object for the request body
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
  
//       // Handle success response
//       if (response.status === 200) {
//         notification.error({
//           message: 'Booking Cancelled',
//           description: 'You have successfully cancelled your hostel booking.',
//         });
//         fetchUserData(); // Refresh the user data
//       }
//     } catch (error) {
//       // Handle errors
//       console.error("There was an error submitting the form!", error.response || error.message);
//       message.error("There was an error submitting the form. Please try again.");
//     } finally {
//       // Ensure loading state is reset
//       setLoading(false);
//     }
//   };
  

//   return (
//     <>
//     <Header></Header>
//     <div className="table-container mt-10 mb-10">
//       <table className="custom-table">
//         <thead>
//           <tr>
//           <th>S.No:</th>

//             <th>
//               <div>
//               <img src="../assets/Cat_login.png" alt="" />
//              <span>Name</span> 

//               </div>
//               </th>
//             <th>Address</th>
//             <th>Booking Date</th>
//             {/* <th>Amount</th> */}
//             <th>Price/day</th>
//             <th>Status</th>
//             <th>Action</th>
            
//           </tr>
//         </thead>
//         <tbody>
//           {hostelBookUser.map((item, index) => (
//             <tr key={index}>
//               <td>{index+1}</td>

//               <td>{item.name}</td>
//               <td>{item.address}</td>
//               <td>{item.craeted_at}</td>
//               <td>{item.price_per_day}</td>
            
//               <td>
//                 <span className={`status-label ${getStatusClass(item.status)}`}>
//                   {item.status}
//                 </span>
//               </td>
//               <td className="action-buttons">
//                 {/* <button className="edit-btn">✏️</button> */}
//                 {/* <button className="delete-btn">🗑️</button> */}
//                 <Tooltip title="Delete" placement="top">
//   <button className="delete-btn" onClick={() => handleClear(item)}>
//     <FontAwesomeIcon icon={faTrashCan} />
//   </button>
// </Tooltip>



//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     <Footer></Footer>
//   </>
//   );
// };

// export default Table;












// //........................CSS...........................................//




// // .table-container {
// //     overflow-x: auto;
// //     padding: 2%;
// //   }
  
// //   .custom-table {
// //     width: 100%;
// //     border-collapse: collapse;
// //     background-color: white;
// //   }
  
// //   .custom-table th, .custom-table td {
// //     padding: 12px;
// //     border: 1px solid #e5e7eb;
// //     text-align: left;
// //   }
  
// //   .custom-table thead {
// //     background-color: #f3f4f6;
// //   }
  
// //   .custom-table tr:hover {
// //     background-color: #f9fafb;
// //   }
  
// //   .status-label {
// //     display: inline-block;
// //     padding: 4px 8px;
// //     border-radius: 12px;
// //     font-size: 12px;
// //     font-weight: bold;
// //   }
  
// //   .status-delivered {
// //     background-color: #d1fae5;
// //     color: #065f46;
// //   }
  
// //   .status-process {
// //     background-color: #fef9c3;
// //     color: #854d0e;
// //   }
  
// //   .status-canceled {
// //     background-color: #fde2e2;
// //     color: #b91c1c;
// //   }
  
// //   .action-buttons {
// //     display: flex;
// //     gap: 8px;
// //   }
  
// //   .edit-btn, .delete-btn {
// //     background: none;
// //     border: none;
// //     cursor: pointer;
// //     font-size: 16px;
// //     padding: 4px;
// //   }
  
// //   .edit-btn:hover {
// //     color: #3b82f6;
// //   }
  
// //   .delete-btn:hover {
// //     color: #ef4444;
// //   }
  

// //   td {
// //     font-size: 14px;
// //     color: 000000;
// // }

// // th {
// //   text-align: center;
// //   font-size: 14px;
// //   font-weight: bold;
// // }


// // .delete-btn {
// //   background-color: transparent;
// //   border: none;
// //   cursor: pointer;
// //   color: red; /* Icon color */
// //   font-size: 1.5em; /* Adjust the size of the icon */
// //   transition: color 0.3s ease;
// // }

// // .delete-btn:hover {
// //   color: darkred; /* Darker red when hovered */
// // }


