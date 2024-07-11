// import Form from "antd/es/form/Form";
// import React from "react";
import Footer from "../components/Header_and_Footer/Footer";
import Header from "../components/Header_and_Footer/Header";
import PetaddForm from "./pethostel/AddPetForHos";
import Hostels from "./pethostel/Hostels"; 



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
