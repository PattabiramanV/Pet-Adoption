import React from "react";
import { Link } from 'react-router-dom';
import Footer from "./Siteframe/Footer";
import Header from "./Siteframe/Header";

import DoctorList from "./veterinary/carddoctor/doctormainpage";




function Veterinarian (){
    return (
        <>
      
    <Header/>
    
    <Link to={"/groomingusertable"} > <button>normal user</button></Link>

    <br></br>
    <Link to={"/doctorpersonaltable"} > <button>Doctor personalpage</button></Link>


 
   

         <DoctorList />
         
         <Footer/>

        
        </>
    );
};


export default Veterinarian;