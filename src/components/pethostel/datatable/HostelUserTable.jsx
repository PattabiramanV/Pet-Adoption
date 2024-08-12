// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Footer from "../components/Siteframe/Footer";
// import Header from "../components/Siteframe/Header";
// import DataTable from "../components/commoncomponent/datatable/DataTable";
// import Loader from '../components/Loader/Loader';
// import { Form, Input, Button, Typography, Divider, message } from "antd";
// import BreadcrumbComponent from './commoncomponent/Breadcrumb'; // Adjust the path as necessary

// const Hosteldetails = () => {
//   const [hostelBookUser, setHostelBookUser] = useState(null);
//   const token = localStorage.getItem("token"); // Replace with your actual token
//   const [loading, setLoading] = useState(false); 

//   const fetchUserData = async () => {
//     setLoading(true)
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}/api/hostelbook.php?endpoint=hostel_user`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setHostelBookUser(response.data);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }finally{
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//   fetchUserData();
   
//   }, []); // Empty dependency array means this effect runs once when the component mounts
//   console.log(hostelBookUser);
//   const columns = [
//     {
//         title: 'Profile',
//         dataIndex: 'avatar',
//         key: 'avatar',
//         render: (text) => (
//             <img
//                 src={text ? `../../backend/profile/uploads/${text}` : "https://via.placeholder.com/150"}
//                 alt="Profile"
//                 style={{ width: '50px', height: '50px' }}
//             />
//         )
//     },    
//     {
//         title: 'User',
//         dataIndex: 'username',
//         key: 'username'
//     },
//     {
//         title: 'City',
//         dataIndex: 'city',
//         key: 'city'
//     },
//     {
//         title: 'State',
//         dataIndex: 'state',
//         key: 'state'
//     },
//     {
//         title: 'Phone',
//         dataIndex: 'phone',
//         key: 'phone'
//     },
//     {
//         title: 'Hostel',
//         dataIndex: 'name',
//         key: 'name'
//     },
    
//     // {
//     //     title: 'Email',
//     //     dataIndex: 'doctor_email',
//     //     key: 'doctor_email'
//     // },
//     {
//         title: 'Price/Day',
//         dataIndex: 'price_per_day',
//         key: 'price_per_day'
//     },
//     {
//         title: 'Booking Date',
//         dataIndex: 'craeted_at',
//         key: 'craeted_at'
//     },

   
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status,record) => (
//           status === 'Pending' ? (
//             <button 
//             onClick={() => handleAccept(record)} 
//             className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//             Accept
//         </button>

//           ) : (
//               status
//           )
//       )
//   }
  
// ];

// const handleAccept = async(data) => {

//   try {
//     setLoading(true);
//     console.log(token);
//     const response = await axios.put(
//       `${import.meta.env.VITE_API_BASE_URL}/api/hostel.php?id=${data.id}&value=Accepted`,
//       {}, // Pass an empty object for the request body
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
  
//     console.log(response.data);
//     if (response.status === 200) {
//       message.success("Hostel Accepted successfully");

//       fetchUserData();
     
//       // alert("Successfully added your request!");
//       // navigate('/success'); // Uncomment this if you have a success page
//     }
  
//   } catch (error) {
//     console.error("There was an error submitting the form!", error.response || error.message);
//     alert("There was an error submitting the form. Please try again.");
//   } finally {
//     setLoading(false); // Set loading to false after response is received
//   }

// };

//   return (
//     <>
//      {loading && <Loader />}

//       <Header />
// <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'HostelUserBookingPage',href: '/hostelusertable' }]} />

//       <DataTable data={hostelBookUser} columns={columns} title="Hostel  Information" />
//       <Footer />
//     </>
//   );
// };

// export default Hosteldetails;












// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Footer from "../components/Siteframe/Footer";
// import Header from "../components/Siteframe/Header";
// import CommonTable from "../components/commoncomponent/datatable/DataTable"; // Corrected path
// import Loader from '../components/Loader/Loader';
// import { message,notification } from "antd";
// import BreadcrumbComponent from './commoncomponent/Breadcrumb';

// const Hosteldetails = () => {
  
//   const [hostelBookUser, setHostelBookUser] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem("token");

//   const fetchUserData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}/api/hostelbook.php?endpoint=hostel_user`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       // Ensure each data item has an id
//       // const dataWithId = response.data.map((item, index) => ({ ...item, id: item.id || index }));
//       const dataWithId = response.data.map((item, index) => ({
//         ...item,
//         id: item.id || index,  // Existing logic for `id`
//         sno: index + 1         // Adding S.No starting from 1
//       }));
//       setHostelBookUser(dataWithId);
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

//   const columns = [
//     {
//       field: 'sno',
//       headerName: 'S.No',
//       width: 80,
//       renderCell: (params) => params.rowIndex + 1, // Adding 1 to start numbering from 1
//     },
  

//     {
//       field: 'avatar',
//       headerName: 'Profile',
//       renderCell: (params) => (
//         <img
//           src={params.value ? `../../backend/profile/uploads/${params.value}` : "https://via.placeholder.com/150"}
//           alt="Profile"
//           style={{ width: '50px', height: '50px' }}
//         />
//       ),
//       width: 100
//     },
//     { field: 'username', headerName: 'User', width: 200 },
//     { field: 'city', headerName: 'City', width: 200 },
//     { field: 'state', headerName: 'State', width: 150 },
//     { field: 'phone', headerName: 'Phone', width: 150 },
//     { field: 'name', headerName: 'Hostel', width: 150 },
//     { field: 'price_per_day', headerName: 'Price/Day', width: 150 },
//     { field: 'craeted_at', headerName: 'Booking Date', width: 150 },
//     {
//       field: 'status',
//       headerName: 'Status',
//       renderCell: (params) => (
//         params.value === 'Pending' ? (
//           <button 
//             onClick={() => handleAccept(params.row)} 
//             className="bg-green-500 text-white px-4 py-2 rounded"
//           >
//             Accept
//           </button>
//         ) : (
//           params.value
//         )
//       ),
//       width: 150
//     }
//   ];

//   const handleAccept = async (data) => {
//     try {
//       setLoading(true);
//       const response = await axios.put(
//         `${import.meta.env.VITE_API_BASE_URL}/api/hostel.php?id=${data.id}&value=Accepted`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.status === 200) {
//         notification.success({
//           message: 'Request Accepted',
//           description: 'The booking request has been accepted successfully.',
//         });
//         // message.success("Hostel Accepted successfully");
//         fetchUserData();
//       }
//     } catch (error) {
//       console.error("There was an error submitting the form!", error.response || error.message);
//       message.error("There was an error submitting the form. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredData = hostelBookUser.filter(row =>

//     Object.values(row).some(value =>
//       value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//     )
   
//   );

//   return (
//     <>
//       {loading && <Loader />}
//       <Header />
//       <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'HostelUserBookingPage', href: '/hostelusertable' }]} />
//       <div className="div_table_for_doct">
//         <CommonTable
//           data={filteredData}
//           columns={columns}
//           loading={loading}
//           error={error}
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           title="Hostel Information"
//         />
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Hosteldetails;





//   // Table.jsx
//   import React, { useState, useEffect } from 'react';
//   import axios from 'axios';
//   import Footer from "../components/Siteframe/Footer";
//   import Header from "../components/Siteframe/Header";
//   import Loader from '../components/Loader/Loader'; // Import the Loader component
//   import BreadcrumbComponent from './commoncomponent/Breadcrumb'; // Adjust the path as necessary
//   import { message, notification } from "antd";
//   import CommonTable from './commoncomponent/datatable/DataTable'; // Import the CommonTable component


//   const Table = () => {
//     const [hostelBookUser, setHostelBookUser] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [error, setError] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const recordsPerPage = 10;
//     const token = localStorage.getItem("token");

//     const fetchUserData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_BASE_URL}/api/hostelbook.php?endpoint=hostel_user`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         // Ensure each data item has an id
//         // const dataWithId = response.data.map((item, index) => ({ ...item, id: item.id || index }));
//         const dataWithId = response.data.map((item, index) => ({
//           ...item,
//           id: item.id || index,  // Existing logic for `id`
//           sno: index + 1         // Adding S.No starting from 1
//         }));
//         setHostelBookUser(dataWithId);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         setError('Error fetching user data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     useEffect(() => {
//       fetchUserData();
//     }, []);

//     const getStatusClass = (status) => {
//       switch (status) {
//         case 'Accepted':
//           return 'status-delivered';
//         case 'Pending':
//           return 'status-process';
//         case 'Cancelled':
//           return 'status-canceled';
//         default:
//           return '';
//       }
//     };

//     const handleClear = async (data) => {
//       setLoading(true);
//       try {
//         const givenDateString = data.checkin_date;
//         const givenDate = new Date(givenDateString);
//         const currentDate = new Date();

//         if (currentDate > givenDate) {
//           notification.error({
//             message: 'Requested Accept',
//             description: 'Sucess fully',
//           });
//           return;
//         }

//         const response = await axios.put(
//           `${import.meta.env.VITE_API_BASE_URL}/api/hostel.php?id=${data.id}&value=Accepted`,
//           {},
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         if (response.status === 200) {
//           notification.error({
//             message: 'Booking Cancelled',
//             description: 'You have successfully cancelled your hostel booking.',
//           });
//           fetchUserData();
//         }
//       } catch (error) {
//         console.error("There was an error submitting the form!", error.response || error.message);
//         message.error("There was an error submitting the form. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     const handlePageClick = (page) => {
//       setCurrentPage(page.selected + 1);
//     };

//     const handleSearchChange = (e) => {
//       setSearchTerm(e.target.value);
//     };
// const headers=['Name','Address','Phone','Booking Date','Check-in/out','Status','Action'];

//     return (
//       <>
//         <Header />
//         {loading ? <Loader /> : (
//           <CommonTable
//           headers={headers}
//             data={hostelBookUser}
//             loading={loading}
//             searchTerm={searchTerm}
//             onSearchChange={handleSearchChange}
//             onActionClick={handleClear}
//             onPageClick={handlePageClick}
//             recordsPerPage={recordsPerPage}
//             currentPage={currentPage}
//             getStatusClass={getStatusClass}
//           />
//         )}
//         <Footer />
//       </>
//     );
//   };

//   export default Table;














import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../../Siteframe/Footer";
import Header from "../../Siteframe/Header";
import Loader from '../../Loader/Loader'; // Import the Loader component
import BreadcrumbComponent from '../../commoncomponent/Breadcrumb'; // Adjust the path as necessary
import { message, notification, Tooltip } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import CommonTable from '../../commoncomponent/datatable/DataTable'; // Import the CommonTable component
import ReactPaginate from 'react-paginate';
import { faSearch,faCheck } from '@fortawesome/free-solid-svg-icons';


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

  const handleAccept = async (data) => {
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
        `${import.meta.env.VITE_API_BASE_URL}/api/hostel.php?id=${data.id}&value=Accepted`,
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
  };

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

   <Tooltip title="Accept" placement="top">
     <button className="" onClick={() => handleAccept(item)} style={{ color: 'gray' }}>
       <FontAwesomeIcon icon={faCheck} />
     </button>
   </Tooltip>
  ]);

  return (
    <>
 {loading && <Loader/>}
 <h1 style={{
  fontSize: '26px',
  color: 'rgba(12, 12, 12, 1)',
  fontWeight: 700,
  textAlign: 'center',
  marginTop: '27px',
  textTransform:'uppercase'
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
  );
};

export default Hosteldetails;
