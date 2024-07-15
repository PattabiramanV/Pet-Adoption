import React from "react";

import Footer from "./Siteframe/Footer";
import Header from "./Siteframe/Header";

import GrommingForm from './veterinary/grommingform';
import PetGroomingPage from "./veterinary/PetGromming";
// import Bookingform from "./veterinary/groomingBookingform";

const GroomingPage=()=>{

    return(
<>
        <Header/>
       <PetGroomingPage></PetGroomingPage>  
<GrommingForm></GrommingForm>
        
         
        <Footer/>

        </>
    )
}

export default GroomingPage;