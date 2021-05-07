import axios from 'axios'
import React, { Component } from 'react'
import { Button, Col, Container, Form, Row, Navbar, Nav, NavDropdown, FormControl, Collapse } from "react-bootstrap"
import { Redirect } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css'
import "../cssComponents/PlanPage.css"
import DeansMenu from './DeansMenu';

export default class PlanPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirectToLoginPage: false,
            userType: 0
        }
    }

    componentDidMount = () => {
        axios.get('/isLogged', {withCredentials: true}).then(result => {
            this.setState({redirectToLoginPage: result.data.redirect, userType: result.data.userType})
        })
    }

    render() {
        
        if(this.state.redirectToLoginPage)
        {
            return <Redirect to="/" />
        }
        else
        {
            return (
                <Container fluid={true} className="PlanRow">
                    <DeansMenu userType={this.state.userType}/>
                </Container>
            )       
        }
    }
}
