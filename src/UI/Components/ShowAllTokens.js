import React, {useContext} from 'react';
import {Context} from "../../Core/Context";
import Web3Service from "../../Services/Web3Service";
import {Container, Form} from "react-bootstrap";
import {SubmitButton} from "../Kits/submitButton";

const ShowAllTokens = () => {
    const { userToCheck, setUserToCheckData } = useContext(Context);

    const showTokens = async (event) => {
        event.preventDefault();
        const { target } = event;
        const userData = await Web3Service.getUserInfo(target[0].value);
        setUserToCheckData({...userData});
    }

    return (
        <Container className="bg-light rounded-1" >
            <Form onSubmit={showTokens}>
                <Form.Label>Введите адрес пользователя, у которого хотите посмотреть токены пользователя </Form.Label>
                <Form.Control placeholder="адрес пользователя" type="text"></Form.Control>
                <Container>{userToCheck.publicBalance}</Container>
                <Container>{userToCheck.privateBalance}</Container>
                <Container>{userToCheck.seedBalance}</Container>
                <SubmitButton type="submit"/>
            </Form>
        </Container>
    )
};

export default ShowAllTokens;