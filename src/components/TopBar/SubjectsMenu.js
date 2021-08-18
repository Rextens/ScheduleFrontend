import React, { Component } from 'react'
import { Button, Dropdown, Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../cssComponents/PlanPage.css'
import Subject from '../Subject'
import axios from 'axios'
import reactCSS from 'reactcss'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { SketchPicker } from 'react-color'
import TimeInput from 'react-time-input';

export default class SubjectsMenu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirectToLoginPage: false,
            menuOpen: false,
            displayColorPicker: false,
            color: "A30000"
        }

        this.addSubjec = this.addSubject.bind(this);
    }

    addSubject = (input) => {

        input.preventDefault()

        

        let ingredients = input.target[3].value.split(':')

        let timeInMinutes = parseInt(ingredients[0]) * 60 + parseInt(ingredients[1])

        console.log(input.target[2].value)

        let subjectProps = {
            name: input.target[0].value,
            proffesor: input.target[1].value,
            subjectLength: timeInMinutes,
            dndID: this.props.planRef.indexCounting,
            color: this.state.color,
            roomNumber: input.target[2].value
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

    onColorChange = (color) => {
        this.setState({ color: color.hex })
    }

    hideColorPicker = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    render() {
        const styles = reactCSS({
            'default': {
              color: {
                width: '50%',
                height: '14px',
                borderRadius: '2px',
                background: this.state.color,
              },
              swatch: {
                padding: '5px',
                background: this.state.color,
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
              },
              popover: {
                position: 'absolute',
                zIndex: '2',
              },
              cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
              },
            },
          });

        if(this.props.userType == 2)
        {
            return(
                <Dropdown show={this.state.menuOpen}>
                    <Dropdown.Toggle bsPrefix="toggleButton" variant="none" id="dropdown-basic" onClick={this.toggleDropdown}>
                        Przedmioty
                    </Dropdown.Toggle>

                    <Dropdown.Menu bsPrefix="dropdownMenu dropdown-menu">
                        <div className="dropdownContainer">
                            <Form onSubmit={this.addSubject}>
                                <Form.Group>
                                    <Form.Control bsPrefix="dataInput" placeholder="Subject Name"></Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control bsPrefix="dataInput" placeholder="Proffesor"></Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control bsPrefix="dataInput" placeholder="RoomNumber"></Form.Control>
                                </Form.Group>

                                <div style={ styles.swatch } onClick={ this.hideColorPicker } className="bhg">
                                    <div style={ styles.color } />
                                </div>
                                { 
                                    this.state.displayColorPicker ? <div style={ styles.popover }>
                                    <div style={ styles.cover } onClick={ this.handleClose }/>
                                    <SketchPicker color={this.state.color} onChange={this.onColorChange}/>
                                    </div> : null 
                                }


                                <TimeInput initTime='01:30'/>
                                <div className="dropdownContainer">
                                    <Button className="toggleButton marginsForSubjectButton" type="sumbmit">Dodaj przedmiot!</Button>
                                </div>
                            </Form>

                                <div className="marginForScrollbar">
                                    <Droppable droppableId="subjects">
                                        {(provided) => (
                                            <div className="subjects" id="subjectsMenuList" {...provided.droppableProps} ref={provided.innerRef}>
                                                {
                                                    this.props.subjects.map(({dndID, name, color, roomNumber}, index) => {           
                                                        return (
                                                            <Draggable key={`${dndID}`} draggableId={`${dndID}`} index={index} >
                                                                {
                                                                (provided) => (
                                                                    <div className="deansSubject" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={this.props.planRef.getItemStyle(color, provided.draggableProps.style)}>
                                                                        <Subject name={name} roomNumber={roomNumber}/>                                                                        
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
                                </div>
                            </div>
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
