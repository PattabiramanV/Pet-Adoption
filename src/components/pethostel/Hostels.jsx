import React from "react";
import Addform from "./AddPetForHos"
import HostelCard from "./HosCard";
import { useState,useEffect } from "react";
import axios from "axios";
const Hostels = () => {

  // const data = [
  //   { location: "1/25,middle Street,Nsk Nagar,Chennai-600113", name: "JEden Pets Care", contact: "123-456-7890" },
  //   { location: "Los Angeles", name: "Jane Smith", contact: "987-654-3210" },
  //   { location: "Chicago", name: "Michael Johnson", contact: "555-555-5555" },
  //   // { location: "Houston", name: "Emily Davis", contact: "444-444-4444" },
  //   // { location: "Phoenix", name: "Daniel Brown", contact: "333-333-3333" },
  // ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual API endpoint
        const token=localStorage.getItem('token');

        const response = await axios.get(
          'http://localhost/petadoption/Backend/api/hostel.php',
          { headers: { Authorization: `Bearer ${token}` } }

        );
        setData(response.data);
        // console.log(JSON.parse(response.data));
        console.log(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this useEffect runs once after the initial render

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


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
