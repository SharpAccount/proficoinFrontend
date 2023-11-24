import React from 'react';
import {Container, Form} from "react-bootstrap";
import "./registration.css";
import Web3Service from "../../../Services/Web3Service";
import {SubmitButton} from "../../Kits/submitButton";

const Registration = () => {

    const registerHandler = async (ev) => {
        ev.preventDefault();
        const { target } = ev;
        const user = await Web3Service.register(target[1].value, target[2].value, target[0].value);
    }

    return (
        <div className="h-75 d-flex justify-content-center align-items-center">
            <Form onSubmit={registerHandler} className="regForm bg-light text-dark w-50 rounded-1">
                <Container className="d-flex justify-content-center fs-3">Регистрация</Container>
                <Form.Group>
                    <Form.Label>Адрес</Form.Label>
                    <Form.Control type="text" placeholder="Введите свой адрес"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Логин</Form.Label>
                    <Form.Control type="text" placeholder="Введите свой логин"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="Введите свой пароль"></Form.Control>
                </Form.Group>
                <SubmitButton type={"submit"}/>
            </Form>
        </div>
    );
};

export default Registration;