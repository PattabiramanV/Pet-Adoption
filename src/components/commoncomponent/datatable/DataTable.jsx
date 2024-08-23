// // src/components/DataTable.js
// import React from 'react';
// import { Table, Spin, Alert } from 'antd';

// const DataTable = ({ data, columns, title }) => {
// //   if (!data) {
// //     return <Spin tip="Loading..." />;
// //   }

//   return (
//     <div>
//       <h1>{title}</h1>
//       <Table dataSource={data} columns={columns} rowKey="id" />
//     </div>
//   );
// };









//////////////// Madhan........................//
// export default DataTable;
// import React from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import CircularProgress from '@mui/material/CircularProgress';
// import Alert from '@mui/material/Alert';
// import Container from '@mui/material/Container';
// import TextField from '@mui/material/TextField';
// import './DataTable.css';

// const CommonTable = ({ data, columns, loading, error, searchTerm, setSearchTerm, title }) => {
//   if (loading) return <CircularProgress />;
//   if (error) return <Alert severity="error">{error}</Alert>;
// console.log(data);
//   return (
//     <Container className="doctor-page-container" maxWidth="lg">
//       <div className="div_search_doctor">
//         <div className="div_reacod_name">
//           <h4>{title}</h4> <span className='div_reacod_name_span'>Information</span>
//         </div>

//         <TextField
//           label="Search"
//           variant="outlined"
//           margin="normal"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div style={{ width: '100%' }}>
//         <DataGrid
//           rows={data}
//           columns={columns}
//           pageSize={10}
//           rowsPerPageOptions={[10, 20]}
//           checkboxSelection={false}
//           disableSelectionOnClick={true}
//         />
//       </div>
//     </Container>
//   );
// };

// export default CommonTable;






// //.......................alternate with Vinith.................//
// import React from 'react';
// import '../../Table.css';

// const GenericTable = ({ data, columns, actionButtons }) => {
//   return (
//     <div className="table-container mt-10 mb-10">
//       <table className="custom-table">
//         <thead>
//           <tr>
//             {columns.map((col, index) => (
//               <th key={index}>{col.title}</th>
//             ))}
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <tr key={index}>
//               {columns.map((col) => (
//                 <td key={col.key}>
//                   {col.render ? col.render(item[col.dataIndex], item) : item[col.dataIndex]}
//                 </td>
//               ))}
//               <td className="action-buttons">
//                 {actionButtons(item)}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
      
//     </div>
//   );
// };

// export default GenericTable;



// // CommonTable.jsx
// import React from 'react';
// import { Tooltip } from 'antd';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrashCan, faSearch } from '@fortawesome/free-solid-svg-icons';
// import ReactPaginate from 'react-paginate';
// import '../../Table.css'; // Adjust the path as needed

// const CommonTable = ({
//   data,
//   loading,
//   searchTerm,
//   onSearchChange,
//   onActionClick,
//   onPageClick,
//   recordsPerPage,
//   currentPage,
//   getStatusClass,
//   headers
// }) => {
//   const filteredData = data.filter(item =>
//     [item.name, item.contact, item.address, item.price_per_day].some(field =>
//       String(field).toLowerCase().includes(searchTerm.toLowerCase().trim())
//     )
//   );

//   const currentData = filteredData.slice(
//     (currentPage - 1) * recordsPerPage,
//     currentPage * recordsPerPage
//   );

//   return (
//     <div className="table-container mt-10 mb-10">
//       <div className="search-container">
//         {searchTerm === '' && (
//           <FontAwesomeIcon icon={faSearch} className="search-icon" />
//         )}

//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={onSearchChange}
//           className="search-input searchBox"
//         />
//       </div>
//       <table className="custom-table">
//         <thead>
//           <tr>
//             <th>S.No:</th>
           
         
//             {headers.map((column,index) => (
//               <th >{column}</th>
//             ))}
         
        
//           </tr>
//         </thead>
//         <tbody>
//           {currentData.length > 0 ? (
//             currentData.map((item, index) => (
//               <tr key={item.id}>
//                 <td>{(currentPage - 1) * recordsPerPage + index + 1}</td>
//                 <td>
//                   <div className='profileName'>
//                     <img src={`../../backend/hostel/hostelimg/${item.photos}`} alt="" className='profileImg' />
//                     <span>{item.name}</span>
//                   </div>
//                 </td>
//                 <td>{item.address}</td>
//                 <td>{item.contact}</td>
//                 <td>{item.craeted_at}</td>
//                 <td>{`${item.checkin_date}-${item.checkout_date}`}</td>
//                 <td>
//                   <span className={`status-label ${getStatusClass(item.status)}`}>
//                     {item.status}
//                   </span>
//                 </td>
//                 <td className="action-buttons">
//                   <Tooltip title="Cancel" placement="top">
//                     <button className="delete-btn" onClick={() => onActionClick(item)}>
//                       <FontAwesomeIcon icon={faTrashCan} />
//                     </button>
//                   </Tooltip>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr className="no-data-row">
//               <td colSpan="8">No data found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <ReactPaginate
//         previousLabel={'Previous'}
//         nextLabel={'Next'}
//         breakLabel={'...'}
//         pageCount={Math.ceil(filteredData.length / recordsPerPage)}
//         marginPagesDisplayed={2}
//         pageRangeDisplayed={5}
//         onPageChange={onPageClick}
//         containerClassName={'pagination'}
//         pageClassName={'page-item'}
//         pageLinkClassName={'page-link'}
//         activeClassName={'active-page'}
//         previousClassName={'previous-page'}
//         nextClassName={'next-page'}
//         disabledClassName={'disabled-page'}
//       />
//     </div>
//   );
// };

// export default CommonTable;








import React from 'react';
import PropTypes from 'prop-types';
import './DataTable.css'; // Ensure your styles are imported

const CommonTable = ({ headers, body, onAction, isLoading }) => {
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={headers.length}>Loading...</td>
            </tr>
          ) : body.length > 0 ? (
            body.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
               
              </tr>
            ))
          ) : (
            <tr className="no-data-row">
              <td colSpan={headers.length}>No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

CommonTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  body: PropTypes.arrayOf(PropTypes.array).isRequired,
  onAction: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default CommonTable;
