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
        <Route path="/map" element={<Map />} />
        


{/* Madhan----------------------- */}

{/* pommika -----------------------*/}

        <Route path="/findpet" element={<PrivateRoute><ReunitingLostPets /></PrivateRoute>} />
        <Route path="/lostingpet" element={<PrivateRoute><LostingpetAdd /></PrivateRoute>} />
        <Route path="/LostListPet" element={<PrivateRoute><LostList /></PrivateRoute>} />
        <Route path="/mypetlostpost" element={<PrivateRoute><Mylostpostlist /></PrivateRoute>} />
        <Route path="/lostingusertable" element={<PrivateRoute><Lostpostusertable /></PrivateRoute>} />
        <Route path="/petdetails" element={<PrivateRoute><Checkboxlostpets /></PrivateRoute>} />
        <Route path="/lostpetlisting" element={<PrivateRoute><Lostlistallpage /></PrivateRoute>} />
        <Route path="/editform" element={<PrivateRoute><EditUserForm /></PrivateRoute>} /> 
        {/* <Route path="/loctionforallpets" element={<PrivateRoute><Locationpage /></PrivateRoute>} /> */}

{/* pommika -----------------------*/}



        
      </Routes>
    </Router>
 
    
  );
}

export default RouterPage;

