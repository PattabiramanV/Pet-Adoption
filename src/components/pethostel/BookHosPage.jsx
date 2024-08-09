import React from "react";
import Footer from "../Siteframe/Footer";
import Header from "../Siteframe/Header";
import BookHosForm from "./bookhostel/BookHos";
import BreadcrumbComponent from '../commoncomponent/Breadcrumb'; // Adjust the path as necessary
import './bookhostel/bookhostel.css';

const BookHosPage =()=>{


    return (

        <>
        
        <Header></Header>
      <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Pet Hostel',href: '/pethostel' },{ title: 'Pet Detail Page',href: '../pethostel/bookhostel' },{ title: 'Hostel Booking Page',href: '/hosdetailpage' }]} />

        <BookHosForm/>

        <Footer/>
        </>


    )

}

export default BookHosPage;

