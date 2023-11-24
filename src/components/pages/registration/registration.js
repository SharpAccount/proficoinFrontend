import React from 'react';
import {Container, Form} from "react-bootstrap";
import {SubmitButton} from "../../submitButton";
import "./registration.css";

const Registration = () => {
    return (
        <div className="h-75 d-flex justify-content-center align-items-center">
            <Form className="regForm bg-light text-dark w-50 rounded-1">
                <Container className="d-flex justify-content-center fs-3">Регистрация</Container>
                <Form.Group>
                    <Form.Label>Логин</Form.Label>
                    <Form.Control type="text" placeholder="Введите свой логин"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="Введите свой пароль"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Подтвердите пароль</Form.Label>
                    <Form.Control type="password" placeholder="Подтвердите свой пароль"></Form.Control>
                </Form.Group>
                <SubmitButton/>
            </Form>
        </div>
    );
};

export default Registration;