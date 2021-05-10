import axios from 'axios'
import React, { Component } from 'react'
import { Button, Col, Container, Form, Row, Navbar, Nav, NavDropdown, FormControl, Collapse } from "react-bootstrap"
import { Redirect } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css'
import "../cssComponents/PlanPage.css"
import { DragDropContext } from 'react-beautiful-dnd';
import DeansMenu from './DeansMenu';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Topbar from './Topbar';
import DeansShedule from './DeansShedule';

export default class PlanPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirectToLoginPage: false,
            userType: 0,
            subjects: [],
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: []
        }

        this.indexCounting = 0;
    }

    componentDidMount = () => {
        axios.get('/isLogged', {withCredentials: true}).then(result => {
            this.setState({redirectToLoginPage: result.data.redirect, userType: result.data.userType})
        })

        axios.get('/getSubjects', {withCredentials: true}).then(result => {
            result.data.map((item, index) => {
                let tempItem = item;
                tempItem.ID = this.indexCounting;

                ++this.indexCounting;

                this.setState({
                    subjects: [...this.state.subjects, item]
                })
            })
        })
    }

    reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
      
        return result;
    };

    swap = (destination, source) => {
        const removedItem = this.state[source.droppableId][source.index];

        let tempSourceArray = this.state[source.droppableId];

        tempSourceArray.splice(source.index, 1);

        let tempDestinationArray = this.state[destination.droppableId];
        tempDestinationArray.splice(destination.index, 0, removedItem)

        this.setState({[source.droppableId]: tempSourceArray})
        this.setState({[destination.droppableId]: tempDestinationArray})

        //this.setState({[source.droppableId]: })
    }

    onDragEnd(result) {
        // dropped outside the list
        const {destination, source} = result;

        console.log(result)

        if (!result.destination) {
            return;
        }

        if(destination.droppableId === source.droppableId)
        {
            const subjects = this.reorder(
                this.state[destination.droppableId],
                result.source.index,
                result.destination.index
            );
          
            this.setState({
                [destination.droppableId]: subjects
            });
        }
        else if(source.droppableId === "subjects")
        {
            let tempItem = { ...this.state.subjects[source.index] }
            tempItem.ID = this.indexCounting;

            ++this.indexCounting;

            this.setState({[destination.droppableId]: [...this.state[destination.droppableId], tempItem]})
        }
        else
        {
            this.swap(destination, source);
        }

        console.log(result);
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
                    <DragDropContext onDragEnd={result => this.onDragEnd(result)}>
                        <Topbar userType={this.state.userType} subjects={this.state.subjects} planRef={this}/>
                        
                        <Row>
                            <Col xs={2}>
                                
                            </Col>
                            <Col xs={10} className="DragAndDropColumn">
                                <DeansShedule monday={this.state.monday} tuesday={this.state.tuesday} wednesday={this.state.wednesday} thursday={this.state.thursday} friday={this.state.friday} saturday={this.state.saturday}/>
                            </Col>
                        </Row>
                        
                    </DragDropContext>
                </Container>
            )       
        }
    }
}
