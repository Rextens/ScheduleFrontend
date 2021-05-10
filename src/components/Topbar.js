import React, { Component } from 'react'
import { Button, Collapse, NavDropdown, Nav, Navbar } from "react-bootstrap"
import DeansMenu from './DeansMenu'

export default class Topbar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <DeansMenu userType={this.props.userType} subjects={this.props.subjects} planRef={this.props.planRef}/>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
