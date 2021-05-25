import React, { Component } from 'react'
import { Button, Dropdown, Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import '../cssComponents/PlanPage.css'
import axios from 'axios'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TimeInput from 'react-time-input';

export default class SubjectsMenu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirectToLoginPage: false,
            menuOpen: false
        }

        this.addSubjec = this.addSubject.bind(this);
    }

    addSubject = (input) => {

        input.preventDefault()

        let ingredients = input.target[2].value.split(':')

        let timeInMinutes = parseInt(ingredients[0]) * 60 + parseInt(ingredients[1])

        let subjectProps = {
            name: input.target[0].value,
            proffesor: input.target[1].value,
            subjectLength: timeInMinutes,
            dndID: this.props.planRef.indexCounting
        }

        axios.post('/addSubject', subjectProps, {withCredentials: true}).then(result => {
            subjectProps.ID = result.data

            this.props.planRef.setState({subjects: [...this.props.subjects, subjectProps]}, () => {
                this.props.planRef.indexCounting++;
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
                        Przedmioty
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Form onSubmit={this.addSubject}>
                            <Form.Group>
                                <Form.Control placeholder="Subject Name"></Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control placeholder="Proffesor"></Form.Control>
                            </Form.Group>

                            <TimeInput initTime='01:30'/>

                            <Button type="sumbmit">Dodaj przedmiot!</Button>
                        </Form>

                            <Droppable droppableId="subjects">
                                {(provided) => (
                                    <div className="subjects" id="subjectsMenuList" {...provided.droppableProps} ref={provided.innerRef}>
                                        {
                                            this.props.subjects.map(({dndID, name}, index) => {           
                                                return (
                                                    <Draggable key={`${dndID}`} draggableId={`${dndID}`} index={index}>
                                                        {
                                                        (provided) => (
                                                            <div className="deansSubject" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
