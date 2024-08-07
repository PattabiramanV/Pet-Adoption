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
import Checkboxlostpets from "./components/checkboxpost";
import Lostpostusertable from "./components/lostpostusertable";
import EditUserForm from './components/edituserform';

import Pets from './Pets';
import AllPetList from './AllPetList';

import BookHosPage from './components/pethostel/BookHosPage';
// import GroomingPage  from './components/petgroomingpage';
import PrivateRoute from './PrivateRoute';
// import Practice from './components/practice';
import Reset from './components/resetpassword';
import DoctorCard from './components/veterinary/carddoctor/doctordata';
import DoctorMoreInfo from './components/veterinary/carddoctor/moreinfo';
import Adddoctorform from './components/veterinary/doctoraddform';
import GroomingPage  from './components/veterinary/petgromming';
import Groomingmainpage from './components/petgroomingpage';
import Info from './components/petfilter/petDetailInfo/Info';
import Sale from './components/petfilter/petsForms/sale';
import Userpersonaltable from './components/veterinary/groomingusertable';
import Doctorpersonaltable from './components/veterinary/docterpersonalpage';
// import GroomingForm from './components/veterinary/grommingform';
import Test from './components/text';
import PetForm from './AllPetList';
import Adoptedlits from './components/petfilter/petDetailInfo/adoptedlists';
// import UserPetsForSale from './components/petfilter/petDetailInfo/usersale';
import UserPets from './components/petfilter/petDetailInfo/userpetslist';
import AdoptionRequests from './components/petfilter/petDetailInfo/petowneradoptionRequests';

// import Adoption from './components/petfilter/petsForms/adaption';

function RouterPage() {
  return (
          <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pethostel" element={<PrivateRoute><PetHostels /></PrivateRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
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
        {/* <Route path="/Veterinary" element={<Veterinarian />} /> */}
        {/* <Route path="/PetGrooming" element={<GroomingPage />} /> */}
        <Route path="/reset" element={<Reset />} />
        <Route path="/veterinary" element={<Veterinarian />} />
        <Route path="/petgroomingmainpage" element={<GroomingPage />} />
        <Route path="/petgrooming" element={<Groomingmainpage />} />
        <Route path="/doctorcard" element={<DoctorCard />} />
        <Route path="/doctormoreinfo" element={<DoctorMoreInfo />} />
        <Route path="/doctoraddform" element={<Adddoctorform />} />
        <Route path="/groomingusertable" element={< Userpersonaltable/>} />
        <Route path="/doctorpersonaltable" element={<Doctorpersonaltable/>} />
        {/* <Route path="/pet-hostelss" element={<PetHostelss />} /> */}

        <Route path="/pets" element={<Pets />} />
        <Route path="/petList" element={<AllPetList />} />
         <Route path="/petDetails/:id"  element={<Info />} />
         <Route path="/sale" element={<Sale />} />
         {/* <Route path="/adopte" element={<Adoption />} /> */}
         <Route path="/adopte" element={<PetForm />} />
         <Route path="/test" element={<Test />} />
         {/* <Route path="/salesubmitted" element={<SideBar />} /> */}
                  {/* <Route path="/test" element={<Test />} /> */}
        <Route path="/Veterinary" element={<Veterinarian />} />
        <Route path="/PetGrooming" element={<GroomingPage />} />
        <Route path="/reset" element={<PublicRoute><Reset/></PublicRoute>} /> 
        <Route path="/adoptelist" element={<Adoptedlits />}  />
        {/* <Route path="/salelist" element={<UserPetsForSale />}  /> */}
                 <Route path="/userpets" element={<UserPets />}  />
                                  <Route path="/request" element={<AdoptionRequests />}  />

      </Routes>
    </Router>
 
    
  );
}

export default RouterPage;

