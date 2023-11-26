import React, {useEffect, useState} from 'react';
import Web3Service from "../../../Services/Web3Service";
import {Container} from "react-bootstrap";

const Timers = () => {
    const[Lifetime, setLifetime] = useState(0);

    const setLifetimeData = (time) => {
        setLifetime(time);
    }

     useEffect(() => {
         const getTime = setInterval(async () => {
             const currentTime = await Web3Service.getTime();
             setLifetimeData(currentTime);
         }, 1000)
         setLifetimeData();
         return () => clearInterval(getTime);
     }, []);

    return (
        <>
            <Container className="w-100 bg-light rounded-1 p-0">
                <Container>Время жизни системы:</Container>
                <Container>{Lifetime}</Container>
            </Container>
        </>
    );
};

export default Timers;