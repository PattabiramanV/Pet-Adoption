// import Form from "antd/es/form/Form";
// import React from "react";
import Footer from "../components/Siteframe/Footer";
import Header from "../components/Siteframe/Header";
import PetaddForm from "./pethostel/addhostel/AddPetForHos";
import Hostels from "./pethostel/Hostels"; // Adjusted the import path
import BreadcrumbComponent from './commoncomponent/Breadcrumb';

function PetHostelPage() {

  return (
    <>
      <Header />
      {/* <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Pet Hostel',href: '/pethostel' }]} /> */}
      <BreadcrumbComponent 
  items={[
    { title: 'Home', href: '/' }, 
    { title: 'Pet Hostels', href: '/pethostel' }
  ]} 
/>

      <Hostels />
      {/* <Hostels hostel={data[1]}/>
      <Hostels hostel={data[2]}/> */}
      {/* <PetaddForm /> */}
      <Footer />
    </>
  );
}

export default PetHostelPage;
