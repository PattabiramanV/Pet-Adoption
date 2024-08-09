import React from 'react';
import Footer from "./Siteframe/Footer";
import Header from "./Siteframe/Header";
import LostUsersTable from './lostpets/lostingusertable'
import BreadcrumbComponent from './commoncomponent/Breadcrumb';



function Lostpostusertable() {
    return (
        <>
            <Header />
            <div className="Breadcrumbs">
            <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Reuniting', href: '/findpet' },{ title: 'LostUsersTable', href: '/lostingusertable' }]} /> 
            </div>
            <LostUsersTable /> 
            <Footer />
        </>
    );
}

export default Lostpostusertable;