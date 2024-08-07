import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import './Doctorpersonalpage.css';

const Doctorpersonalpage = () => {
  const [doctorData, setDoctorData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      let token = localStorage.getItem('token');

      try {
        const response = await axios.get('http://localhost/petadoption/backend/api/doctortable.php', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const dataWithId = response.data.map((item, index) => ({ id: index + 1, ...item }));
        setDoctorData(dataWithId);
        setFilteredData(dataWithId);
      } catch (error) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const result = doctorData.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(result);
  }, [searchTerm, doctorData]);

  const columns = [
    { field: 'id', headerName: 'S.No', width: 80 },
    { field: 'grooming_user_name', headerName: 'User Name', width: 150 },
    { field: 'grooming_user_phone', headerName: 'Phone', width: 150 },
    { field: 'grooming_user_email', headerName: 'Email', width: 200 },
    { field: 'pet_type', headerName: 'Pet Type', width: 120 },
    { field: 'pet_gender', headerName: 'Pet Gender', width: 120 },
    { field: 'pet_age', headerName: 'Pet Age', width: 120 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'what_you_need_for_your_pet', headerName: 'Needs', width: 200 },
    { field: 'doctor_name', headerName: 'Doctor Name', width: 150 },
    { field: 'doctor_address', headerName: 'Doctor Address', width: 250 },
  ];

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div className="div_table_for_doct">

 
    <Container className="doctor-page-container" maxWidth="lg">
      <div className="div_search_doctor">
        <div className="div_reacod_name">
          <h4>Doctor</h4> <span className='div_reacod_name_span'>Information</span>
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
          rows={filteredData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20]}
          checkboxSelection={false} // Remove checkbox selection
          disableSelectionOnClick={true} // Disable row selection on click
        />
      </div>
    </Container>
    </div>
  );
};

export default Doctorpersonalpage;
