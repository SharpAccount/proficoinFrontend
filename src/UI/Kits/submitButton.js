import {Button, Container} from "react-bootstrap";
import React from "react";

export const SubmitButton = (type) => {
    return (
        <Container className="d-flex justify-content-center p-2">
            <Button type={type}>Отправить</Button>
        </Container>
    )
}