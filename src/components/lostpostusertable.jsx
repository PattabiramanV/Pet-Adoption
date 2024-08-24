import React from 'react';
import Footer from "./Siteframe/Footer";
import Header from "./Siteframe/Header";
import LostUsersTable from './lostpets/lostingusertable'
import BreadcrumbComponent from '../components/commoncomponent/Breadcrumb';



function Lostpostusertable() {
    return (
        <>
            <Header />
            <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Find Pet', href: '/findpet' },{ title: 'Lost Post Users Table', href: '/lostingusertable' }]} /> 
            <LostUsersTable /> 
            <Footer />
        </>
    );
}

export default Lostpostusertable;