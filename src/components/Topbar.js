import React, { Component } from 'react'
import { Nav, Navbar } from "react-bootstrap"
import SemestersMenu from './SemestersMenu'
import SubjectsMenu from './SubjectsMenu'
import GroupsMenu from './GroupsMenu'

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
                        <SubjectsMenu userType={this.props.userType} subjects={this.props.subjects} planRef={this.props.planRef}/>
                        <SemestersMenu userType={this.props.userType} planRef={this.props.planRef} semesters={this.props.planRef.state.semesters}/>
                        <GroupsMenu userType={this.props.userType} planRef={this.props.planRef} groups={this.props.planRef.state.groups}/>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
