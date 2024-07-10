import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login_and_signup/Login';
import Signup from './components/Login_and_signup/RegisterForm';
import PetHostels from './components/PetHostel';
import HosBookPage from "./components/pethostel/BookHosPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pethostel" element={<PetHostels />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/bookHos" element={<HosBookPage />} />
      </Routes>
    </Router>
  );
}

export default App;
