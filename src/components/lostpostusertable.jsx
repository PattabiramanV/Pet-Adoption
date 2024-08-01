import React from 'react';
import Footer from "./Siteframe/Footer";
import Header from "./Siteframe/Header";
import LostUsersTable from './lostpets/lostingusertable';

function Lostpostusertable() {
    return (
        <>
            <Header />
            <LostUsersTable /> 
            <Footer />
        </>
    );
}

export default Lostpostusertable;