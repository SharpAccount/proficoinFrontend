import React, {useContext} from 'react';
import {Container, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import "./header.css";
import {Context} from "../../../Core/Context";

const Header = () => {
    const { user, logout } = useContext(Context);

    console.log(user);

    return (
        <Navbar bg="light" className="d-flex justify-content-between">
            <Container>
                <Navbar.Brand>
                    <Link to="/">Главная</Link>
                </Navbar.Brand>
            </Container>
            <Container className="d-flex justify-content-end flex-wrap">
                {
                    user.login === "" ?(<>
                        <Navbar.Brand>
                            <Link to="/login">Авторизация</Link>
                        </Navbar.Brand>
                        <Navbar.Brand>
                            <Link to="/register">Регистрация</Link>
                        </Navbar.Brand>
                    </>): (
                        <Navbar.Brand>
                            <Link to="/login" onClick={logout}>Выйти</Link>
                        </Navbar.Brand>
                    )
                }
            </Container>
        </Navbar>
    );
};

export default Header;