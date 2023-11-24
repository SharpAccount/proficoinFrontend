import React from 'react';
import Header from "../HOC/header";

const Layout = ({ children }) => {
    return (
        <>
            <Header/>
            {children}
        </>
    );
};

export default Layout;