

import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import './DataTable.css';

const CommonTable = ({ data, columns, loading, error, searchTerm, setSearchTerm, title }) => {
  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
console.log(data);
  return (
    <Container className="doctor-page-container" maxWidth="lg">
      <div className="div_search_doctor">
        <div className="div_reacod_name">
          <h4>{title}</h4> <span className='div_reacod_name_span'>Information</span>
        </div>

        <TextField
          label="Search"
          variant="outlined"
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div style={{ width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20]}
          checkboxSelection={false}
          disableSelectionOnClick={true}
        />
      </div>
    </Container>
  );
};

export default CommonTable;




