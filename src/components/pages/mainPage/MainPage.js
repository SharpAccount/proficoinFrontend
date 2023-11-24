import React, {useContext, useEffect} from 'react';
import {Accordion, AccordionHeader, AccordionItem, Container, ListGroup} from "react-bootstrap";
import {Context} from "../../../Core/Context";
import AccordionBody from "react-bootstrap/AccordionBody";

const MainPage = () => {

    const {Sender, setSender} = useContext(Context);

    useEffect(() => {

    }, []);

    console.log(Sender);

    return (
        <div>
            <Container className="d-flex justify-content-center text-white w-100 mt-3 gap-3">
                <Container className="bg-light rounded-1 p-2">
                        <ListGroup>
                            <ListGroup.Item>Ваша роль:
                                {
                                    Sender.role === 1 ? (
                                        <>{" Priv Provider"}</>
                                    ) : Sender.role === 2 ? (
                                        <>{" Pub Provider"}</>
                                    ) : Sender.role === 3 ? (
                                        <>{" Owner"}</>
                                    ) : <>{" Guest"}</>
                                }
                            </ListGroup.Item>
                            <ListGroup.Item> Ваш адресс: { Sender.address } </ListGroup.Item>
                            <ListGroup.Item> Ваш баланс в ETH: 0{ /*eth balance*/} </ListGroup.Item>
                            <ListGroup.Item> Ваш баланс PROFI подготовительной фазы: { Sender.seedBalance } </ListGroup.Item>
                            <ListGroup.Item> Ваш баланс PROFI приватной фазы: { Sender.privateBalance } </ListGroup.Item>
                            <ListGroup.Item> Ваш баланс PROFI публичной фазы: { Sender.publicBalance } </ListGroup.Item>
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
        </div>
    );
};

export default MainPage;