// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// router setup---------------------

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

// router setup--------------------

// madhan-----
import Home from './components/Home';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/RegisterForm';
import Reset from './components/resetpassword';
import Map from './components/Location';

// madhan-----------------------------------

// pommikan----------------------------------

import ReunitingLostPets from './components/searchinglostandfoundpets';
import LostingpetAdd  from "./components/lostpetformpage";
import LostList from './components/lostlistpets';
import Lostlistallpage from "./components/lostlistmainpage";
import Mylostpostlist from "./components/mypetlost";
import Checkboxlostpets from "./components/checkboxpost";
import Lostpostusertable from "./components/lostpostusertable";
import EditUserForm from './components/edituserform';

// pommikan----------------------------------

// hostall------

import AddHosPage from './components/AddHosPage';
import HosDetailPage from "./components/HosDetailPage";
import HostelDataTable from './components/pethostel/datatable/request';
import BookHosPage from './components/pethostel/BookHosPage';
import PetHostels from './components/PetHostel';
import NormalUserforHos from "./components/pethostel/datatable/NormalUserforHos";
import HostelUserTable from "./components/pethostel/datatable/HostelUserTable"


// hostall------

// Ahalya Durairaj


import DoctorCard from './components/veterinary/carddoctor/doctordata';
import DoctorMoreInfo from './components/veterinary/carddoctor/moreinfo';
import Adddoctorform from './components/veterinary/doctoraddform';
import GroomingPage  from './components/veterinary/petgromming';
import Veterinarian from './components/veterinarypage';
import Groomingmainpage from './components/petgroomingpage';
import Userpersonaltable from './components/veterinary/groomingusertable';
import Doctorpersonaltable from './components/veterinary/docterpersonalpage';
import Venterinarytables from './components/veterinary/tablelrouting';
import BookingSlat from './components/veterinary/bookingslat';
// import EditDoctorInformation from './components/veterinary/doctorprofileedit';

//  Ahalya Durairaj


// Veena

import Pets from './Pets';
import AllPetList from './AllPetList';
import Info from './components/petfilter/petDetailInfo/Info';
import Sale from './components/petfilter/petsForms/sale';
import PetForm from './AllPetList';
import Adoptedlits from './components/petfilter/userpetslist/adoptlists/adoptedlists';
// import UserPetsForSale from './components/petfilter/petDetailInfo/usersale';
import UserPets from './components/petfilter/userpetslist//usersalepetslist/userpetslist';
import AdoptionRequests from './components/petfilter/userpetslist/onwerpetsrequest/petowneradoptionRequests';
import Request from './components/petfilter/userpetslist/requestsale/request';
import OverallTables from './components/Siteframe/overalltablelisting';
import Payment from './components/petfilter/petsForms/payment';
import Requesttables from './components/petfilter/userpetslist/requestsale/requesttables';

// Veena





function RouterPage() {
  return (
          <Router>
      <Routes>


/
{/* Madhan----------------------- */}

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/reset" element={<PublicRoute><Reset /> </PublicRoute>} />
        <Route path="/findnearby" element={<Map />} />
        


{/* Madhan----------------------- */}

{/* pommika -----------------------*/}

<Route path="/findpet" element={<PrivateRoute><ReunitingLostPets /></PrivateRoute>} />
        <Route path="/lostingpet" element={<PrivateRoute><LostingpetAdd /></PrivateRoute>} />
        <Route path="/LostListPet/:id" element={<PrivateRoute><LostList /></PrivateRoute>} />
        <Route path="/mypetlostpost" element={<PrivateRoute><Mylostpostlist /></PrivateRoute>} />
        <Route path="/lostingusertable" element={<PrivateRoute><Lostpostusertable /></PrivateRoute>} />
        <Route path="/petdetails" element={<PrivateRoute><Checkboxlostpets /></PrivateRoute>} />
        <Route path="/lostpetlisting" element={<PrivateRoute><Lostlistallpage /></PrivateRoute>} />
        <Route path="/editform" element={<PrivateRoute><EditUserForm /></PrivateRoute>} /> 
        {/* <Route path="/loctionforallpets" element={<PrivateRoute><Locationpage /></PrivateRoute>} /> */}

{/* pommika -----------------------*/}



    {/* hostall-------------- */}
        <Route path="/normaluserforhos" element={<NormalUserforHos/>} />
        <Route path="/hostelusertable" element={<HostelUserTable/>} />
        <Route path="/addhostel" element={<AddHosPage/>} />
        <Route path="/pethostel/details/:id" element={<HosDetailPage/>} />
        <Route path="/pethostel" element={<PrivateRoute><PetHostels /></PrivateRoute>} />
        <Route path="/pethostel/booking/:id" element={<BookHosPage />} />
        <Route path="/pethostel/booking" element={<BookHosPage />} />

        <Route path="/hosteldeteils/*" element={<HostelDataTable />} />

        
    {/* hostall-------------- */}

    {/* Ahalya Durairaj */}

    <Route path="/veterinary" element={<Veterinarian />} />
        <Route path="/petgroomingmainpage" element={<GroomingPage />} />
        <Route path="/petgrooming" element={<Groomingmainpage />} />
        <Route path="/doctorcard" element={<DoctorCard />} />
        <Route path="/doctormoreinfo" element={<DoctorMoreInfo />} />
        <Route path="/doctoraddform" element={<Adddoctorform />} />
        <Route path="/groomingusertable" element={< Userpersonaltable/>} />
        <Route path="/doctorpersonaltable" element={<Doctorpersonaltable/>} />
        <Route path="/PetGrooming" element={<GroomingPage />} />
        <Route path="/venterinarytables/*" element={<Venterinarytables/>} />

        <Route path="/BookingSlat" element={<BookingSlat/>} />
        {/* <Route path="/doctereditcomponent" element={<EditDoctorInformation/>} /> */}

    {/* Ahalya Durairaj */}

    {/* Veena */}
        <Route path="/reguesttabel" element={<Requesttables />} />
        <Route path="/petHighlights/*" element={<Pets />} />
        <Route path="/petList" element={<AllPetList />} />
         <Route path="/petDetails/:id"  element={<Info />} />
         <Route path="/sale" element={<Sale />} />
         <Route path="/PetGallery" element={<PetForm />} />
         <Route path="/adoptedPetList" element={<Adoptedlits />}  />
         <Route path="/userSalePets" element={<UserPets />}  />
         <Route path="/petRequests" element={<AdoptionRequests />}  />
         <Route path="/requestpets/*" element={<Request />} />
         <Route path="/dashboard/*"  element={<OverallTables />} />
         <Route path="/payment"  element={<Payment />} />

    {/* Veena */}


    
      </Routes>
    </Router>
 
    
  );
}

export default RouterPage;

