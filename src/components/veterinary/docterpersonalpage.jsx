import React from 'react';
import Footer from "../Siteframe/Footer";
import Header from "../Siteframe/Header";
import Doctorpersonaltable from './doctortablepage'; 
import BreadcrumbComponent from '../../components/breadcriums';
import '../breadcrums.css';

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
