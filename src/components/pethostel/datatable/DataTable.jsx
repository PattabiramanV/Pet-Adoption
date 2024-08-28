







import React from 'react';
import PropTypes from 'prop-types';
import './DataTable.css'; // Ensure your styles are imported

const CommonTable = ({ headers, body, onAction, isLoading }) => {
  return (
    <div className="table-container hostelDataTable">
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
