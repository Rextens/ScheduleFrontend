import React, { Component } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { Col, Container, Row } from 'react-bootstrap'

export default class DeansShedule extends Component {
    render() {
        return (
                <Row>
                    <Col xs={2}>
                        <Droppable droppableId="monday">
                            {(provided) => (
                                <div className="monday SubjectsList" {...provided.droppableProps} ref={provided.innerRef}>
                                    {
                                        this.props.monday.map(({ID, name}, index) => {
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
                    </Col>

                    <Col xs={2}>
                        <Droppable droppableId="tuesday">
                            {(provided) => (
                                <div className="tuesday SubjectsList" {...provided.droppableProps} ref={provided.innerRef}>
                                    {
                                        this.props.tuesday.map(({ID, name}, index) => {
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
                    </Col>

                    <Col xs={2}>
                        <Droppable droppableId="wednesday">
                            {(provided) => (
                                <div className="wednesday SubjectsList" {...provided.droppableProps} ref={provided.innerRef}>
                                    {
                                        this.props.wednesday.map(({ID, name}, index) => {
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
                    </Col>

                    <Col xs={2}>
                        <Droppable droppableId="thursday">
                            {(provided) => (
                                <div className="thursday SubjectsList" {...provided.droppableProps} ref={provided.innerRef}>
                                    {
                                        this.props.thursday.map(({ID, name}, index) => {
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
                    </Col>

                    <Col xs={2}>
                        <Droppable droppableId="friday">
                            {(provided) => (
                                <div className="friday SubjectsList" {...provided.droppableProps} ref={provided.innerRef}>
                                    {
                                        this.props.friday.map(({ID, name}, index) => {
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
                    </Col>

                    <Col xs={2}>
                        <Droppable droppableId="saturday">
                            {(provided) => (
                                <div className="saturday SubjectsList" {...provided.droppableProps} ref={provided.innerRef}>
                                    {
                                        this.props.saturday.map(({ID, name}, index) => {
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
                    </Col>
                </Row>
        )
    }
}
