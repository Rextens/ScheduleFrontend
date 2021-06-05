import { Component } from "react";
import '../cssComponents/LoginPage.css'
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import axios from 'axios'
import { Redirect } from "react-router";

export default class LoginPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false,
            index: '',
            password: '',
            userType: ''
        }
    }

    login = (input) => {
        input.preventDefault();

        const loginData = {
            index: input.target[0].value,
            password: input.target[1].value
        }

        axios.post('/login', loginData, {withCredentials: true}).then(result => {
            if(result.data)
            {
                this.setState({redirect: result.data.redirect, userType: result.data.userType})
            }
        })
    }

    render() {
        if(this.state.redirect && this.state.userType == 2)
        {
            return <Redirect to="/plan" />
        }
        else if(this.state.redirect)
        {
            return <Redirect to="/schedule" />
        }
        else
        {
            return (
                <div className="Test">
                    <Container fluid={true}>
                        <Col className="LoginField">
                            <Form onSubmit={this.login}>
                                <Form.Group>
                                    <Form.Control placeholder="Index"></Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control placeholder="Password" type="Password"></Form.Control>
                                </Form.Group>
                                <Button type="sumbmit">Login!</Button>
                            </Form>                    
                        </Col>
                    </Container>
                </div>
            );
        }
    }
}