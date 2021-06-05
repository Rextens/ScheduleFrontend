import axios from 'axios'
import React, { Component } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { Col, Row, Button } from 'react-bootstrap'

export default class DeansShedule extends Component {
    
    componentDidMount = () => {
        const semesterAndGroup = {
            semester: this.props.planRef.state.chosenSemester,
            group: this.props.planRef.state.chosenGroup
        }

        axios.post('/loadSubjectsForDean', semesterAndGroup, {withCredentials: true}).then(result => {
            console.log(result)
        })
    }

    addSubjects = () => {
        const subjects = {
            friday: [],
            saturday: [],
            semester: this.props.planRef.state.chosenSemester,
            group: this.props.planRef.state.chosenGroup
        }

        for(let i = 0; i < this.props.friday.length; ++i)
        {
            subjects.friday.push(this.props.friday[i].ID)
        }

        for(let i = 0; i < this.props.saturday.length; ++i)
        {
            subjects.saturday.push(this.props.saturday[i].ID)
        }

        axios.post('/addSubjectsToSemester', subjects, {withCredentials: true}).then(result => {
            
        })
    }
    
    render() {
        return (
                <Row>
                    <Col xs={1}>
                    </Col>
                    
                    <Col xs={5}>
                        <Droppable droppableId="friday">
                            {(provided) => (
                                <div className="friday SubjectsList" {...provided.droppableProps} ref={provided.innerRef}>
                                    {
                                        this.props.friday.map(({dndID, name, color}, index) => {
                                            return (
                                                <Draggable key={`${dndID}`} draggableId={`${dndID}`} index={index}>
                                                    {(provided) => (
                                                        <div className="deansSubject" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={this.props.planRef.getItemStyle(color, provided.draggableProps.style)}>
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
                    </Col>

                    <Col xs={1}>
                    </Col>

                    <Col xs={5}>
                        <Droppable droppableId="saturday">
                            {(provided) => (
                                <div className="saturday SubjectsList" {...provided.droppableProps} ref={provided.innerRef}>
                                    {
                                        this.props.saturday.map(({dndID, name, color}, index) => {
                                            return (
                                                <Draggable key={`${dndID}`} draggableId={`${dndID}`} index={index}>
                                                    {(provided) => (
                                                        <div className="deansSubject" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={this.props.planRef.getItemStyle(color, provided.draggableProps.style)}>
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

                        <Button onClick={this.addSubjects} id="addSubjectsButton">Dodaj przedmioty</Button>
                    </Col>
                </Row>
        )
    }
}
