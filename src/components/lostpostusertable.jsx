import React from 'react';
import Footer from "./Siteframe/Footer";
import Header from "./Siteframe/Header";
import LostUsersTable from './lostpets/lostingusertable'
import BreadcrumbComponent from '../components/lostpetbreadcrumbs';



function Lostpostusertable() {
    return (
        <>
            <Header />
            <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Reuniting', href: '/findpet' },{ title: 'LostUsersTable', href: '/lostingusertable' }]} /> 
            <LostUsersTable /> 
            <Footer />
        </>
    );
}

export default Lostpostusertable;