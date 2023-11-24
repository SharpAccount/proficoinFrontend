import React from 'react';
import Header from "./HOCs/header";

const Layout = ({ children }) => {
    return (
        <>
            <Header/>
            {children}
        </>
    );
};

export default Layout;