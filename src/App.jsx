// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/RegisterForm';
import PetHostels from './components/PetHostel';
// import PetHostelss from './components/Pet_Hostel/Hostels';
import Reuniting_lost_pets from './components/searchinglostandfoundpets';
import LostingpetAdd  from "./components/lostpetformpage";
import FoundingpetAdd from "./components/foundpetformpage";
import Pets from './Pets';
// import CardView from './components/Pets/Card/Card.jsx';

import AllPetList from './AllPetList';
import Info from './components/PetFilter/petDetailInfo/Info';

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
        <Route path="/pets" element={<Pets />} />
        <Route path="/petList" element={<AllPetList />} />
              {/* <Route path="/" element={<CardView />} /> */}

          <Route path="/petDetails" element={<Info />} />
      </Routes>
    </Router>
  );
}

export default App;


