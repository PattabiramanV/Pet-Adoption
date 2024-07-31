// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import Home from './components/Home';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/RegisterForm';
import PetHostels from './components/PetHostel';
import Veterinarian from './components/veterinarypage';

import ReunitingLostPets from './components/searchinglostandfoundpets';
import LostingpetAdd  from "./components/lostpetformpage";
import LostList from './components/lostlistpets';
import Lostlistallpage from "./components/lostlistmainpage";
import Mylostpostlist from "./components/mypetlost";

import Pets from './Pets';
import AllPetList from './AllPetList';

import BookHosPage from './components/pethostel/BookHosPage';
import GroomingPage  from './components/petgroomingpage';
import PrivateRoute from './PrivateRoute';
import Practice from './components/practice';
import Reset from './components/resetpassword';

function RouterPage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pethostel" element={<PrivateRoute><PetHostels /></PrivateRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/findpet" element={<PrivateRoute><ReunitingLostPets /></PrivateRoute>} />
        <Route path="/lostingpet" element={<LostingpetAdd />} />
        <Route path="/LostListPet" element={<LostList />} />
        <Route path="/mypetlostpost" element={<Mylostpostlist />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/petList" element={<AllPetList />} />
        <Route path="/bookHos" element={<BookHosPage />} />
        <Route path="/lostpetlisting" element={<Lostlistallpage />} />


        {/* <Route path="/pet-hostelss" element={<PetHostelss />} /> */}
        <Route path="/Veterinary" element={<Veterinarian />} />
        <Route path="/PetGrooming" element={<GroomingPage />} />
        <Route path="/reset" element={<PublicRoute><Reset/></PublicRoute>} />

      </Routes>
    </Router>
    // <Practice></Practice>
  );
}

export default RouterPage;

