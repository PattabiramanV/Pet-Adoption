import React from 'react';

import Footer from "../Siteframe/Footer";
import Header from "../Siteframe/Header";
import AddVeterinaryDocter from "../veterinary/addveterinarydocter";


function Adddoctorform(){
    return (
       <>
        <Header/>
         <div>
           <AddVeterinaryDocter />
        </div> 

      <Footer/>

       </>
    );
}

export default Adddoctorform;