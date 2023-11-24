import {Container, Form} from "react-bootstrap";
import {SubmitButton} from "../Kits/submitButton";
import React, {useContext} from "react";
import {Context} from "../../Core/Context";

export const ShowInfoForm = () => {
    const { user } = useContext(Context);

    const showInfo =() => {
        //event.defaultPrevented()
    }
    return (
        <Container className="bg-light rounded-1" >
            <Form onSubmit={showInfo}>
                <Form.Label>Введите адрес пользователя, у которого хотите посмотреть токены приватной фазы пользователя </Form.Label>
                <Form.Control placeholder="адрес пользователя" type="text"></Form.Control>
                <SubmitButton type="submit"/>
                <Container>{}</Container>
            </Form>
        </Container>
    )
}