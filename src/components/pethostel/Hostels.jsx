import React from "react";
import Addform from "./AddPetForHos"
import HostelCard from "./HosCard";
const Hostels = () => {

  const data = [
    { location: "New York", name: "John Doe", contact: "123-456-7890" },
    { location: "Los Angeles", name: "Jane Smith", contact: "987-654-3210" },
    { location: "Chicago", name: "Michael Johnson", contact: "555-555-5555" },
    // { location: "Houston", name: "Emily Davis", contact: "444-444-4444" },
    // { location: "Phoenix", name: "Daniel Brown", contact: "333-333-3333" },
  ];

  return (
    <>
      <h1 className="text-3xl text-center mt-10">Book The Best Hostel Service For Your Pet</h1>
      <div className="flex flex-wrap justify-center space-x-4 mt-16">
      {/* <HostelCard hostel={data[0]}/>
      <HostelCard hostel={data[1]}/>
      <HostelCard hostel={data[2]}/> */}
     {data?.map((item) => 

      <HostelCard hostel={item} active={"block"} />


     

     )}

      </div>
     
    </>
  );
}

export default Hostels;
