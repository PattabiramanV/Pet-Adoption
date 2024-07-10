import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/RegisterForm';
import PetHostels from './components/PetHostel';
// import PetHostelss from './components/Pet_Hostel/Hostels';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pet-hostels" element={<PetHostels />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/pet-hostelss" element={<PetHostelss />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
