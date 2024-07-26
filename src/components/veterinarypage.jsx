import React from "react";
import { Link } from 'react-router-dom';
import Footer from "./Siteframe/Footer";
import Header from "./Siteframe/Header";

import DoctorList from "./veterinary/carddoctor/doctormainpage";




function Veterinarian (){
    return (
        <>
      
    <Header/>
    <Link to={"/GroomingUsersTable"} > <buttonn>normal user</buttonn></Link>
      <nav>
      <Link to="/doctoraddform" className="absolute top-5 right-0 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-20 mr-10">
      Add Your Doctor Profile
    </Link>

        </nav>   
   

         <DoctorList />
         
         <Footer/>

        
        </>
    );
};


export default Veterinarian;