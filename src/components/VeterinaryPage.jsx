import React from "react";

import Footer from "./Siteframe/Footer";
import Header from "./Siteframe/Header";
import AddVeterinaryDocter from "./veterinary/AddVeterinaryDocter";
// import DoctorList from "./veterinary/carddoctor/Doctormainpage";




function Veterinarian (){
    return (
        <>
    
    <Header/>
         
        
         {/* <DoctorList /> */}
          <AddVeterinaryDocter/>
         
          
         <Footer/>

        
        </>
    );
};


export default Veterinarian;