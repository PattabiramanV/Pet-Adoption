import React from 'react';
import Footer from "../Siteframe/Footer";
import Header from "../Siteframe/Header";
import Doctorpersonaltable from './doctortablepage'; 
<<<<<<< HEAD
import BreadcrumbComponent from '../../components/commoncomponent/Breadcrumb';
=======
import BreadcrumbComponent from '../commoncomponent/Breadcrumb';
// import '../breadcrums.css';
>>>>>>> Pattabi-pethostel

function Doctortable() {
    return (
        <>
            <Header />
            <BreadcrumbComponent items={[{ title: 'Home', href: '/' },{ title: 'Docter Management Table',href: '/doctorpersonaltable' }]} />
            < Doctorpersonaltable/> 
            <Footer />
        </>
    );
}

export default Doctortable;
