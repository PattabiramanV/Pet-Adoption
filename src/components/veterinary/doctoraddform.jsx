import React from 'react';
import Footer from "../Siteframe/Footer";
import Header from "../Siteframe/Header";
import AddVeterinaryDocter from "../veterinary/addveterinarydocter";
import BreadcrumbComponent from '../../components/commoncomponent/Breadcrumb';
// import './Breadcrums.css';



function Adddoctorform(){
    return (
       <>


        <Header/>
        <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Veterinarians',href: '/Veterinary' },{ title: 'DoctorFormPage',href: '/doctoraddform' }]} />
       <div>
           <AddVeterinaryDocter />
        </div> 

      <Footer/>

       </>
    );
}

export default Adddoctorform;