import React, {useContext} from 'react';
import {Container, Form} from "react-bootstrap";
import "./login.css";
import Web3Service from "../../../Services/Web3Service";
import {Context} from "../../../Core/Context";
import {useHistory} from "react-router-dom";
import {SubmitButton} from "../../Kits/submitButton";

const Login = () => {

    const { user, setUserData } = useContext(Context);
    const navigation = useHistory();

    const loginHandler = async (ev) => {
        ev.preventDefault();
        const { target } = ev;
        const userData = await Web3Service.login(target[0].value, target[1].value);
        if (userData) {
            setUserData({...userData});
            navigation.push("/");
        }
    }

    return (
        <div className="h-75 d-flex justify-content-center align-items-center">
            <Form onSubmit={loginHandler} className="logForm bg-light text-dark w-50 rounded-1">
                <Container className="d-flex justify-content-center fs-3">Вход</Container>
                <Form.Group>
                    <Form.Label>Логин</Form.Label>
                    <Form.Control type="text" placeholder="Введите свой логин"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="Введите свой пароль"></Form.Control>
                </Form.Group>
                <SubmitButton type={"submit"} />
            </Form>
        </div>
    );
};

export default Login;