import React, {useState} from 'react';
import Web3Service from "../../../Services/Web3Service";
import {Container, Form} from "react-bootstrap";
import {SubmitButton} from "../../Kits/submitButton";

const ShowAllTokens = () => {
    const [userTokens, setUserTokens] = useState({});

    const setUserTokenData = (userToCheck) => {
        setUserTokens(userToCheck);
    }

    const showTokens = async (event) => {
        event.preventDefault();
        const { target } = event;
        const userData = await Web3Service.getBalances(target[0].value);
        setUserTokenData({...userData});
    }

    return (
        <Container className="bg-light rounded-1" >
            <Form onSubmit={showTokens}>
                <Form.Label>Введите адрес пользователя, у которого хотите посмотреть токены пользователя публичной фазы</Form.Label>
                <Form.Control placeholder="адрес пользователя" type="text"></Form.Control>
                <Container>{userTokens[3]}</Container>
                <SubmitButton type="submit"/>
            </Form>
        </Container>
    )
};

export default ShowAllTokens;