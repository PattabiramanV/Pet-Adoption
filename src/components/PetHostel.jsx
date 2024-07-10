// import Form from "antd/es/form/Form";
import React from "react";
import Footer from "../components/Siteframe/Footer";
import Header from "../components/Siteframe/Header";
import PetaddForm from "./pethostel/AddPetForHos";
import Hostels from "./pethostel/Hostels"; // Adjusted the import path

function PetHostelPage() {





  return (
    <>
      <Header />
      <Hostels />
      {/* <Hostels hostel={data[1]}/>
      <Hostels hostel={data[2]}/> */}
      <PetaddForm />
      <Footer />
    </>
  );
}

export default PetHostelPage;
