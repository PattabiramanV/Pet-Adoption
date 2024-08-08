import React from 'react';
import Footer from "../Siteframe/Footer";
import Header from "../Siteframe/Header";
import Doctorpersonaltable from './doctortablepage'; 
import BreadcrumbComponent from '../../components/commoncomponent/Breadcrumb';
// import './Breadcrums.css';

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
