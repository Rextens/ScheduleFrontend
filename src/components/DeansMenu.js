import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Collapse, Dropdown, Nav, Form, FormControl, Container, Row, Col, NavItem } from "react-bootstrap"
import { Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../cssComponents/PlanPage.css'
import axios from 'axios'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Subject from './Subject'

export default class DeansMenu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirectToLoginPage: false,
            menuOpen: false
        }
    }

    addSubject = (input) => {

        input.preventDefault()

        const subjectProps = {
            subjectName: input.target[0].value,
            proffesor: input.target[1].value
        }

        axios.post('/addSubject', subjectProps, {withCredentials: true}).then(result => {
            this.setState({subjects: [...this.state.subjects, subjectProps]}, () => {
                console.log(this.state.subjects)
            })
        }).then(() => {
            
        })
    }

    toggleDropdown = (event) => {
        this.setState({menuOpen: !this.state.menuOpen})
    }

    render() {
        if(this.props.userType == 2)
        {
            return(
                <Dropdown show={this.state.menuOpen}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" onClick={this.toggleDropdown}>
                        Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Form onSubmit={this.addSubject}>
                            <Form.Group>
                                <Form.Control placeholder="Subject Name"></Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control placeholder="Proffesor"></Form.Control>
                            </Form.Group>
                            <Button type="sumbmit">Add Subject!</Button>
                        </Form>

                            <Droppable droppableId="subjects">
                                {(provided) => (
                                    <div className="subjects" {...provided.droppableProps} ref={provided.innerRef}>
                                        {
                                            this.props.subjects.map(({ID, name}, index) => {
                                                return (
                                                    <Draggable key={name} draggableId={`${ID}`} index={index}>
                                                        {(provided) => (
                                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                <div>
                                                                    {
                                                                        name
                                                                    }
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable> 
                                                    )
                                                })
                                            }
                                        {provided.placeholder}                           
                                    </div>
                                )}
                            </Droppable>
                    </Dropdown.Menu>
                </Dropdown>
            )
        }
        else
        {
            return null
        }
    }
}
