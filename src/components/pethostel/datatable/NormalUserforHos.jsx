// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Footer from "../components/Siteframe/Footer";
// import Header from "../components/Siteframe/Header";
// import CommonTable from "./commoncomponent/datatable/DataTable";
// import text from "../assets/Cat_login.png";
// import Loader from '../components/Loader/Loader'; // Import the Loader component
// import BreadcrumbComponent from './commoncomponent/Breadcrumb'; // Adjust the path as necessary
// import { message,notification } from "antd";

// const Hosteldetails = () => {
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
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       setError('Error fetching user data.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []); // Empty dependency array means this effect runs once when the component mounts
  
//   const columns = [
//     {
//       field: 'photos',
//       headerName: 'Profile',
//       width: 100,
//       renderCell: (params) => (
//         <img src={`../../backend/hostel/hostelimg/${params.value}`} alt="Profile" style={{ width: '50px', height: '50px' }} />
//       )
//     },
//     {
//       field: 'name',
//       headerName: 'Hostel',
//       width: 250
//     },
//     {
//       field: 'address',
//       headerName: 'Address',
//       width: 300
//     },
//     {
//       field: 'contact',
//       headerName: 'Phone',
//       width: 200
//     },
//     {
//       field: 'price_per_day',
//       headerName: 'Price/Day',
//       width: 150
//     },
//     {
//       field: 'craeted_at',
//       headerName: 'Booking Date',
//       width: 200
//     },
//     {
//       field: 'status',
//       headerName: 'Status',
//       width: 300,
//       renderCell: (params) => (
//         params.value === 'Pending' || params.value === 'Accepted' ? (
//           <div className='flex items-center gap-2'>
//             <p>{params.value}</p>
//             <button 
//               onClick={() => handleClear(params.row)} 
//               className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
//             >
//               Cancel
//             </button>
//           </div>
//         ) : (
//           params.value
//         )
//       )
//     }
//   ];

  // const handleClear = async (data) => {
  //   setLoading(true);
  //   try {
  //     const givenDateString = data.checkin_date;
  //     const givenDate = new Date(givenDateString);
  //     const currentDate = new Date();
  //     if (currentDate > givenDate) {
  //       return message.success("The current date is greater than the given date.");
  //     }
  //     const response = await axios.put(
  //       `${import.meta.env.VITE_API_BASE_URL}/api/hostel.php?id=${data.id}&value=Cancelled`,
  //       {}, // Pass an empty object for the request body
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     if (response.status === 200) {
  //       notification.error({
  //         message: 'Booking Cancelled',
  //         description: 'You have successfully cancelled your hostel booking.',
  //       });
        
       
  //       // message.success("Hostel deleted successfully");
  //       fetchUserData();
  //     }
  //   } catch (error) {
  //     console.error("There was an error submitting the form!", error.response || error.message);
  //     message.error("There was an error submitting the form. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

//   const filteredData = hostelBookUser.filter(row =>
//     Object.values(row).some(value =>
//       value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   return (
//     <>
//       {loading && <Loader />}
//       <Header />
//       <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'NormalUserBookingPage', href: '/normaluserforhos' }]} />
//       <div className="div_table_for_doct">
//         <CommonTable 
//           data={filteredData} 
//           columns={columns} 
//           loading={loading} 
//           error={error} 
//           searchTerm={searchTerm} 
//           setSearchTerm={setSearchTerm} 
//           title="User Information"
//         />
//       </div>
//       <Footer />
//     </>
//   );
// };




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Footer from "../components/Siteframe/Footer";
// import Header from "../components/Siteframe/Header";
// import Loader from '../components/Loader/Loader'; // Import the Loader component
// import BreadcrumbComponent from './commoncomponent/Breadcrumb'; // Adjust the path as necessary
// import { message, notification } from "antd";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
// import { Tooltip } from 'antd';
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
//     <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'User Info',href: '/normaluserforhos' }]} />

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








// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Footer from "../components/Siteframe/Footer";
// import Header from "../components/Siteframe/Header";
// import Loader from '../components/Loader/Loader'; // Import the Loader component
// import BreadcrumbComponent from './commoncomponent/Breadcrumb'; // Adjust the path as necessary
// import { message, notification, Tooltip } from "antd";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
// import './Table.css';
// import ReactPaginate from 'react-paginate';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// const Table = () => {
//   const [hostelBookUser, setHostelBookUser] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 10;
//   const token = localStorage.getItem("token");

//   const fetchUserData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}/api/hostelbook.php?endpoint=normal_user`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setHostelBookUser(response.data);
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

//       if (currentDate > givenDate) {
//         notification.error({
//           message: 'Exit Date',
//           description: 'The current date is greater than the given date.',
//         });
//         return;
//       }

//       const response = await axios.put(
//         `${import.meta.env.VITE_API_BASE_URL}/api/hostel.php?id=${data.id}&value=Cancelled`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.status === 200) {
//         notification.error({
//           message: 'Booking Cancelled',
//           description: 'You have successfully cancelled your hostel booking.',
//         });
//         fetchUserData();
//       }
//     } catch (error) {
//       console.error("There was an error submitting the form!", error.response || error.message);
//       message.error("There was an error submitting the form. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   console.log(hostelBookUser);
//   const filteredData = hostelBookUser.filter(item =>
//     [item.name, item.contact, item.address,item.price_per_day].some(field =>
//       String(field).toLowerCase().includes(searchTerm.toLowerCase().trim())
//     )
//   );
  
//   console.log(filteredData);

//   const currentData = filteredData.slice(
//     (currentPage - 1) * recordsPerPage,
//     currentPage * recordsPerPage
//   );
// console.log(currentData);
//   const handlePageClick = (page) => {
//     setCurrentPage(page.selected + 1);
//   };

//   const handleChange=(e)=>{

//     setSearchTerm(e.target.value);

//   }

//   return (
//     <>
//       <Header />
//       <div className="table-container mt-10 mb-10">
//       <div className="search-container">
//       {searchTerm=='' && (
//   <FontAwesomeIcon icon={faSearch} className="search-icon" />
// )}

//   <input 
//     type="text" 
//     placeholder="Search..." 
//     value={searchTerm} 
//     onChange={handleChange} 
//     className="search-input searchBox"
//   />
// </div>
//         <table className="custom-table">
//           <thead>
//             <tr>
//               <th>S.No:</th>
//               <th>
             
//                   <span>Name</span> 
              
//               </th> 
//               <th>Address</th>
//               <th>Phone</th>
//               <th>Booking Date</th>
//               <th>Check-in/out</th>
//               <th>Status</th>
//               <th>Action</th>
              
//             </tr>
//           </thead>
//           <tbody>
//             {currentData.length > 0 ? (
//               currentData.map((item, index) => (
//                 <tr key={item.id}>
//                   <td>{(currentPage - 1) * recordsPerPage + index + 1}</td>
//                   <td>
//                     <div className='profileName'>
//                   <img src={`../../backend/hostel/hostelimg/${item.photos}`} alt=""  className='profileImg'/>
//                    <span>{item.name}</span> 
//                     </div>

//                     </td>
//                   <td>{item.address}</td>
//                   <td>{item.contact}</td>
                  
//                   <td>{item.craeted_at}</td>
//                   <td>{`${item.checkin_date}-${item.checkout_date}`}</td>

//                   <td>
//                     <span className={`status-label ${getStatusClass(item.status)}`}>
//                       {item.status}
//                     </span>
//                   </td>
//                   <td className="action-buttons">
//                     <Tooltip title="Cancel" placement="top">
//                       <button className="delete-btn" onClick={() => handleClear(item)}>
//                         <FontAwesomeIcon icon={faTrashCan} />
//                       </button>
//                     </Tooltip>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr className="no-data-row">
//               <td colSpan="8">No data found</td>
//             </tr>
            
//             )}
//           </tbody>
//         </table>
//         {/* <div className='paginationDiv'> */}
//         <ReactPaginate
//   previousLabel={'Previous'}
//   nextLabel={'Next'}
//   breakLabel={'...'}
//   pageCount={Math.ceil(filteredData.length / recordsPerPage)}
//   marginPagesDisplayed={2}
//   pageRangeDisplayed={5}
//   onPageChange={handlePageClick}
//   containerClassName={'pagination'}
//   pageClassName={'page-item'}
//   pageLinkClassName={'page-link'}
//   activeClassName={'active-page'}
//   previousClassName={'previous-page'}
//   nextClassName={'next-page'}
//   disabledClassName={'disabled-page'}
// />

//         {/* </div> */}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Table;







//.................>>Lost...............

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../../Siteframe/Footer";
import Header from "../../Siteframe/Header";
import Loader from '../../Loader/Loader'; // Import the Loader component
import BreadcrumbComponent from '../../commoncomponent/Breadcrumb'; // Adjust the path as necessary
import { message, notification, Tooltip } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import CommonTable from '../../commoncomponent/datatable/DataTable'; // Import the CommonTable component
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



















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Header from "../components/Siteframe/Header";
// import Footer from "../components/Siteframe/Footer";
// import CommonTable from './commoncomponent/datatable/DataTable'; // Adjust path as necessary

// const YourPage = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem("token");

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}/api/hostelbook.php?endpoint=normal_user`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setData(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const columns = [
//     { key: 'name', header: 'Name' },
//     { key: 'address', header: 'Address' },
//     { key: 'contact', header: 'Phone' },
//     { key: 'created_at', header: 'Booking Date' },
//     { key: 'checkin_date', header: 'Check-in Date' },
//     { key: 'checkout_date', header: 'Check-out Date' },
//     { key: 'status', header: 'Status' },
//   ];

//   const handleAction = (item) => {
//     // Handle action for item
//   };

//   const handleClear = async (item) => {
//     // Handle clear action for item
//   };

//   return (
//     <>
//       <Header />
//       <CommonTable 
//         data={data} 
//         columns={columns} 
//         onAction={handleAction}
//         onClear={handleClear}
//       />
//       <Footer />
//     </>
//   );
// };

// export default YourPage;







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
//           `${import.meta.env.VITE_API_BASE_URL}/api/hostelbook.php?endpoint=normal_user`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setHostelBookUser(response.data);
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
//             message: 'Exit Date',
//             description: 'The current date is greater than the given date.',
//           });
//           return;
//         }

//         const response = await axios.put(
//           `${import.meta.env.VITE_API_BASE_URL}/api/hostel.php?id=${data.id}&value=Cancelled`,
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
// const headers=['Name','Address','Phone','Booking Date','Check-in/out','Status'];

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


















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Footer from "../components/Siteframe/Footer";
// import Header from "../components/Siteframe/Header";
// import Loader from '../components/Loader/Loader'; // Import the Loader component
// import BreadcrumbComponent from './commoncomponent/Breadcrumb'; // Adjust the path as necessary
// import { message, notification } from "antd";
// import './table.css'; // Ensure that the Table.css is imported

// const Hosteldetails = () => {
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
//       case 'Delivered':
//         return 'status-delivered';
//       case 'Process':
//         return 'status-process';
//       case 'Canceled':
//         return 'status-canceled';
//       default:
//         return '';
//     }
//   };

//   const columns = [
//     {
//       field: 'photos',
//       headerName: 'Profile',
//       width: 100,
//       renderCell: (params) => (
//         <img src={`../../backend/hostel/hostelimg/${params.value}`} alt="Profile" style={{ width: '50px', height: '50px' }} />
//       )
//     },
//     {
//       field: 'name',
//       headerName: 'Hostel',
//       width: 250
//     },
//     {
//       field: 'address',
//       headerName: 'Address',
//       width: 300
//     },
//     {
//       field: 'contact',
//       headerName: 'Phone',
//       width: 200
//     },
//     {
//       field: 'price_per_day',
//       headerName: 'Price/Day',
//       width: 150
//     },
//     {
//       field: 'craeted_at',
//       headerName: 'Booking Date',
//       width: 200
//     },
//     {
//       field: 'status',
//       headerName: 'Status',
//       width: 300,
//       renderCell: (params) => (
//         <span className={`status-label ${getStatusClass(params.value)}`}>
//           {params.value === 'Pending' || params.value === 'Accepted' ? (
//             <>
//               <p>{params.value}</p>
//               <button 
//                 onClick={() => handleClear(params.row)} 
//                 className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
//               >
//                 Cancel
//               </button>
//             </>
//           ) : (
//             params.value
//           )}
//         </span>
//       )
//     }
//   ];

//   const handleClear = async (data) => {
//     setLoading(true);
//     try {
//       const givenDateString = data.checkin_date;
//       const givenDate = new Date(givenDateString);
//       const currentDate = new Date();
//       if (currentDate > givenDate) {
//         return message.success("The current date is greater than the given date.");
//       }
//       const response = await axios.put(
//         `${import.meta.env.VITE_API_BASE_URL}/api/hostel.php?id=${data.id}&value=Cancelled`,
//         {}, 
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (response.status === 200) {
//         notification.error({
//           message: 'Booking Cancelled',
//           description: 'You have successfully cancelled your hostel booking.',
//         });
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
//       <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'NormalUserBookingPage', href: '/normaluserforhos' }]} />
//       <div className="table-container mt-10 mb-10">
//         <table className="custom-table">
//           <thead>
//             <tr>
//               <th>S.No:</th>
//               <th>Tracking ID</th>
//               <th>Product</th>
//               <th>Customer</th>
//               <th>Date</th>
//               <th>Amount</th>
//               <th>Payment Mode</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((item, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>{item.trackingId}</td>
//                 <td>{item.product}</td>
//                 <td>{item.customer}</td>
//                 <td>{item.date}</td>
//                 <td>{item.amount}</td>
//                 <td>{item.paymentMode}</td>
//                 <td>
//                   <span className={`status-label ${getStatusClass(item.status)}`}>
//                     {item.status}
//                   </span>
//                 </td>
//                 <td className="action-buttons">
//                   <button className="edit-btn">✏️</button>
//                   <button className="delete-btn">🗑️</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Hosteldetails;















// ----------------------------chat gpt 



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Pagination from './Pagination';
// import './Table.css'

// const Table = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage] = useState(10);
// const token=localStorage.getItem("token");
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//                 `${import.meta.env.VITE_API_BASE_URL}/api/hostelbook.php?endpoint=normal_user`,
//                 { headers: { Authorization: `Bearer ${token}` } }
//               );
//               console.log(response.data);
//       setData(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const getStatusClass = (status) => {
//     switch (status) {
//       case 'Delivered':
//         return 'status-delivered';
//       case 'Process':
//         return 'status-process';
//       case 'Canceled':
//         return 'status-canceled';
//       default:
//         return '';
//     }
//   };

//   const filteredData = data.filter(row => 
//     (row.name && row.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//     (row.contact && row.contact.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
//     (row.address && row.address.toLowerCase().includes(searchTerm.toLowerCase()))
//     // Add more fields as needed
// );



// console.log(data);

//   // Pagination logic
//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

//   return (
//     <div>
//       <h1>Customer Orders</h1>
      
   
//     <div className="table-container">
//       <input
//         type="text"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={handleSearch}
//         style={{ marginBottom: '10px', padding: '5px' }}
//       />
//       <table className="custom-table">
//         <thead>
//           <tr>
//             <th>Tracking ID</th>
//             <th>Product</th>
//             <th>Customer</th>
//             <th>Date</th>
//             <th>Amount</th>
//             <th>Payment Mode</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentRows.map((item, index) => (
//             <tr key={index}>
//               <td>{item.id}</td>
//               <td>{item.name}</td>
//               <td>{item.address}</td>
//               <td>{item.craeted_at}</td>
//               <td>{item.price_per_day}</td>
//               <td>{item.contact}</td>
//               <td>
//                 <span className={`status-label ${getStatusClass(item.status)}`}>
//                   {item.status}
//                 </span>
//               </td>
//               <td className="action-buttons">
//                 <button className="edit-btn">✏️</button>
//                 <button className="delete-btn">🗑️</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <Pagination
//         rowsPerPage={rowsPerPage}
//         totalRows={filteredData.length}
//         paginate={(pageNumber) => setCurrentPage(pageNumber)}
//         currentPage={currentPage}
//       />
//     </div>
//     </div>
//   );
// };

// export default Table;










///////////////.Final............................//

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import GenericTable from './commoncomponent/datatable/DataTable'; // Ensure correct path
// import Loader from '../components/Loader/Loader'; // Import the Loader component
// import { Alert } from "antd";
// import './Pagination';
// const Hosteldetails = () => {
//   const [hostelBookUser, setHostelBookUser] = useState([]);
//   const token = localStorage.getItem("token"); // Replace with your actual token
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchUserData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}/api/hostelbook.php?endpoint=normal_user`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setHostelBookUser(response.data);
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
//       title: 'Profile',
//       dataIndex: 'photos',
//       key: 'photos',
//       render: (text) => (
//         <img
//           src={text ? `../../backend/profile/uploads/${text}` : "https://via.placeholder.com/150"}
//           alt="Profile"
//           style={{ width: '50px', height: '50px' }}
//         />
//       )
//     },
//     {
//       title: 'Hostel name',
//       dataIndex: 'name',
//       key: 'name'
//     },
//     {
//       title: 'contact',
//       dataIndex: 'contact',
//       key: 'contact'
//     },
//     {
//       title: 'State',
//       dataIndex: 'state',
//       key: 'state'
//     },
//     {
//       title: 'Phone',
//       dataIndex: 'phone',
//       key: 'phone'
//     },
//     {
//       title: 'Hostel',
//       dataIndex: 'name',
//       key: 'name'
//     },
//     {
//       title: 'Price/Day',
//       dataIndex: 'price_per_day',
//       key: 'price_per_day'
//     },
//     {
//       title: 'Booking Date',
//       dataIndex: 'created_at',
//       key: 'created_at'
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status, record) => (
//         status === 'Pending' ? (
//           <button 
//             onClick={() => handleAccept(record)} 
//             className="bg-green-500 text-white px-4 py-2 rounded"
//           >
//             Accept
//           </button>
//         ) : (
//           status
//         )
//       )
//     }
//   ];

//   const actionButtons = (item) => (
//     <>
//       {/* <button className="edit-btn" onClick={() => handleEdit(item)}>✏️</button> */}
//       <button className="delete-btn" onClick={() => handleDelete(item)}>🗑️</button>
//     </>
//   );

//   // const handleEdit = (item) => {
//   //   console.log('Edit', item);
//   // };

//   const handleDelete = (item) => {
//     // console.log('Delete', item);
//     alert("ppp")
//   };

//   const handleAccept = (item) => {
//     console.log('Accept', item);
//   };

//   if (loading) return <Loader />;
//   if (error) return <Alert message={error} type="error" />;
// console.log(hostelBookUser);
//   return (
//     <GenericTable
//       columns={columns}
//       data={hostelBookUser}
//       actionButtons={actionButtons}
//     />
//   );
// };

// export default Hosteldetails;