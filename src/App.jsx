import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login_and_signup/Login';
import Signup from './components/Login_and_signup/RegisterForm';
import PetHostels from './components/PetHostel';
// import PetHostelss from './components/Pet_Hostel/Hostels';
import Reuniting_lost_pets from './components/searchinglostandfoundpets';
import LostingpetAdd  from "./components/lostpetformpage";
import FoundingpetAdd from "./components/foundpetformpage";
import LostPetForm  from "./components/lostpets/lostpetsform";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pethostel" element={<PetHostels />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pet-hostelss" element={<PetHostels />} />
        <Route path="/findpet" element={<Reuniting_lost_pets />} />
        <Route path="/lostingpet" element={<LostingpetAdd />} />
        <Route path="/foundingpet" element={<FoundingpetAdd />} />
        <Route path="/LostPetForm" component={<LostPetForm />} />

      </Routes>
    </Router>
  );
}

export default App;


