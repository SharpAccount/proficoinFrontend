import React, {useContext, useEffect} from 'react';
import {Accordion, AccordionHeader, Container, Form, ListGroup} from "react-bootstrap";
import {Context} from "../../../Core/Context";
import AccordionBody from "react-bootstrap/AccordionBody";
import {ShowInfoForm} from "../../Components/ShowInfoForm";

const MainPage = () => {

    const { user } = useContext(Context);

    // useEffect(() => {
    //
    // }, []);

    return (
        <div>
            <Container className="d-flex flex-column justify-content-center w-100 mt-3 gap-3">
                    <Container className="w-100 bg-light rounded-1 p-0">
                        <Container>Время жизни системы:</Container>
                        <Container></Container>
                    </Container>
                    <Container className="d-flex flex-row w-100 gap-3">

                        <Container className="bg-light rounded-1 p-2">
                                <ListGroup>
                                    <ListGroup.Item>Ваша роль:
                                        {
                                            user.role === "1" ? (
                                                <>{" Private Provider"}</>
                                            ) : user.role === "2" ? (
                                                <>{" Public Provider"}</>
                                            ) : user.role === "3" ? (
                                                <>{" Owner"}</>
                                            ) : <>{" User"}</>
                                        }
                                    </ListGroup.Item>
                                    <ListGroup.Item> Ваш адресс: { user.addr } </ListGroup.Item>
                                    <ListGroup.Item> Ваш баланс в ETH: 0{ /*eth balance*/} </ListGroup.Item>
                                    <ListGroup.Item> Ваш баланс PROFI подготовительной фазы: { user.seedBalance } </ListGroup.Item>
                                    <ListGroup.Item> Ваш баланс PROFI приватной фазы: { user.privateBalance } </ListGroup.Item>
                                    <ListGroup.Item> Ваш баланс PROFI публичной фазы: { user.publicBalance } </ListGroup.Item>
                                </ListGroup>
                        </Container>
                        <Container className="bg-light rounded-1 p-2">
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="1">
                                    <AccordionHeader>Купить токены</AccordionHeader>
                                    <AccordionBody></AccordionBody>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <AccordionHeader>Перевести токены</AccordionHeader>
                                    <AccordionBody></AccordionBody>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <AccordionHeader>Дать право на пользование токенами</AccordionHeader>
                                    <AccordionBody></AccordionBody>
                                </Accordion.Item>
                                <Accordion.Item eventKey="4">
                                    <AccordionHeader>Отправить заявку в вайтлист</AccordionHeader>
                                    <AccordionBody></AccordionBody>
                                </Accordion.Item>
                            </Accordion>
                        </Container>
                    </Container>
                        {
                            user.role === "1" ? (
                                <ShowInfoForm />
                            ) : user.role === "2" ? (
                                <ShowInfoForm />
                            ) : user.role === "3" ? (
                                <ShowInfoForm />
                            ) : <></>
                        }
            </Container>
        </div>
    );
};

export default MainPage;