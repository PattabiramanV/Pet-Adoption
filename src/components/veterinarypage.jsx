import React from "react";
import { Link } from 'react-router-dom';
import Footer from "./Siteframe/Footer";
import Header from "./Siteframe/Header";

import DoctorList from "./veterinary/carddoctor/doctormainpage";
import BreadcrumbComponent from '../components/commoncomponent/Breadcrumb';



function Veterinarian (){
    return (
        <>
      
    <Header/>
    <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Veterinarian Profiles',href: '/Veterinary' }]} />
    <Link to={"/groomingusertable"} > <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">normal user</button></Link>

    <br></br>
    <Link to={"/doctorpersonaltable"} > <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Doctor personalpage</button></Link>

     <div>
     <p className="text-2xl font-bold mb-6 text-center text-green-800">Doctors Profiles</p>
      <nav>
     <div >
     <Link to="/doctoraddform" className="absolute top-5 right-0 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-20 mr-10">
      Add Your Doctor Profile
    </Link>
     </div>

        </nav>   
     </div>
   

         <DoctorList />
         
         <Footer/>

        
        </>
    );
};


export default Veterinarian;