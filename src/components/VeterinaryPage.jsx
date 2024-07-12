import React from "react";

import Footer from "./Header_and_Footer/Footer";
import Header from "./Header_and_Footer/Header";
import AddVeterinaryDocter from "./veterinary/AddVeterinaryDocter";
// import DoctorList from "./veterinary/carddoctor/Doctormainpage";
// import GrommingForm from './veterinary/grommingform';
// import PetGroomingPage from "./veterinary/PetGromming";
// import Bookingform from "./veterinary/groomingBookingform";




function Veterinarian (){
    return (
        <>
    
    <Header/>
         
        
         {/* <DoctorList /> */}
          <AddVeterinaryDocter/>
          {/* <PetGroomingPage/> */}
         
          {/* <GrommingForm/> */}
          {/* <Bookingform /> */}
          
         <Footer/>

        
        </>
    );
};


export default Veterinarian;