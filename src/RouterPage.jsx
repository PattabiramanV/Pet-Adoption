// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import Checkboxlostpets from "./components/checkboxpost";
import Lostpostusertable from "./components/lostpostusertable";
import EditUserForm from './components/edituserform';

import Pets from './Pets';
import AllPetList from './AllPetList';

import BookHosPage from './components/pethostel/BookHosPage';
import GroomingPage  from './components/petgroomingpage';
import PrivateRoute from './PrivateRoute';
// import Practice from './components/practice';
import Reset from './components/resetpassword';

function RouterPage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pethostel" element={<PrivateRoute><PetHostels /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/findpet" element={<PrivateRoute><ReunitingLostPets /></PrivateRoute>} />
        <Route path="/lostingpet" element={<PrivateRoute><LostingpetAdd /></PrivateRoute>} />
        <Route path="/LostListPet" element={<PrivateRoute><LostList /></PrivateRoute>} />
        <Route path="/mypetlostpost" element={<PrivateRoute><Mylostpostlist /></PrivateRoute>} />
        <Route path="/lostingusertable" element={<PrivateRoute><Lostpostusertable /></PrivateRoute>} />
        <Route path="/checkboxpage" element={<Checkboxlostpets />} />
        <Route path="/lostpetlisting" element={<Lostlistallpage />} />
        <Route path="/editform" element={<EditUserForm />} /> 

        <Route path="/pets" element={<Pets />} />
        <Route path="/petList" element={<AllPetList />} />
        <Route path="/bookHos" element={<BookHosPage />} />



        {/* <Route path="/pet-hostelss" element={<PetHostelss />} /> */}
        <Route path="/Veterinary" element={<Veterinarian />} />
        <Route path="/PetGrooming" element={<GroomingPage />} />
        <Route path="/reset" element={<Reset />} />

      </Routes>
    </Router>
    // <Practice></Practice>
  );
}

export default RouterPage;

