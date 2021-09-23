import axios from 'axios'
import React, { Component } from 'react'
import { Col, Container, Row } from "react-bootstrap"
import { Redirect } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css'
import "../cssComponents/PlanPage.css"
import { DragDropContext } from 'react-beautiful-dnd';
import Topbar from './TopBar/Topbar';
import DeansShedule from './DeansShedule';

export default class PlanPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirectToLoginPage: false,
            userType: -1,
            subjects: [],
            friday: [],
            saturday: [],
            semesters: [],
            groups: [],
            chosenSemester: '',
            chosenGroup: '',
            professors: []
        }

        this.indexCounting = 0;
    }

    componentDidMount = () => {
        axios.get('/isLogged', {withCredentials: true}).then(result => {
            console.log('dddddddddddddddddddddddd')

            this.setState({redirectToLoginPage: result.data.redirect, userType: result.data.userType})
    
            axios.get('/getProfessor', {withCredentials: true}).then(result2 => {
                this.setState({professors: result2.data})
            })

            axios.get('/getSubjects', {withCredentials: true}).then(result2 => {
                result2.data.map((item, index) => {
                    let tempItem = item;
                    tempItem.dndID = this.indexCounting;

                    this.setState({
                        subjects: [...this.state.subjects, item]
                    }, () => {
                        ++this.indexCounting;
                    })
                })
            })

            axios.get('/getGroups', {withCredentials: true}).then(result2 => {
                this.setState({groups: result2.data})

                if(result2.data.length > 0)
                {
                    this.setState({chosenGroup: result2.data[0].group}, () => {
                        
                        axios.get('/getSemesters', {withCredentials: true}).then(result3 => {
                
                            this.setState({semesters: result3.data})
            
                            if(result3.data.length > 0)
                            {
                                this.setState({chosenSemester: result3.data[0].ID}, () => {
                                    this.loadDeansSubjects()
                                })
                            }
                        })
                    })
                }
            })
        })
    }

    loadDeansSubjects = () => {
        const semesterAndGroup = {
            semester: this.state.chosenSemester,
            group: this.state.chosenGroup
        }

        axios.post('/loadSubjectsForDean', semesterAndGroup, {withCredentials: true}).then(result => {
            let tempFriday = []
            let tempSaturday = []

            console.log(result.data)

            for(let i = 0; i < result.data.length; ++i)
            {
                let tempSubject = {
                    ID: result.data[i].ID,
                    name: result.data[i].name,
                    proffesor: result.data[i].proffesor,
                    subjectLength: result.data[i].subjectLength,
                    color: result.data[i].color,
                    dndID: this.indexCounting,
                    roomNumber: result.data[i].roomNumber
                }

                ++this.indexCounting

                if(result.data[i].isFriday)
                {
                    tempFriday.push(tempSubject)
                }
                else
                {
                    tempSaturday.push(tempSubject)
                }
            }

            this.setState({friday: tempFriday})
            this.setState({saturday: tempSaturday})
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
    }

    onDragEnd(result) {
        // dropped outside the list
        const {destination, source} = result;

        if(!result.destination)
        {
            if(result.source.droppableId !== "subjects")
            {
                this.state[source.droppableId].splice(source.index, 1);

                this.setState({})
            }
            else
            {
                return
            }
        }
        else if (result.destination.droppableId === "subjects") {
            return;
        }
        else if(destination.droppableId === source.droppableId)
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
            tempItem.dndID = this.indexCounting;

            ++this.indexCounting;

            this.setState({[destination.droppableId]: [...this.state[destination.droppableId], tempItem]})
        }
        else
        {
            this.swap(destination, source);
        }
    }

    getItemStyle = (newColor, draggableStyle) => ({
        background: newColor,
        
        ...draggableStyle
    })

    render() {
        if(this.state.redirectToLoginPage && this.state.userType == 1 || this.state.userType == 0)
        {
            return <Redirect to="/schedule"/>
        }
        else if(this.state.redirectToLoginPage)
        {
            return <Redirect to="/"/>
        }
        else
        {
            return (
                <DragDropContext onDragEnd={result => this.onDragEnd(result)}>
                    <Topbar professors={this.state.professors} userType={this.state.userType} subjects={this.state.subjects} planRef={this}/>

                    <Container fluid={true} className="PlanRow" className="Background">
                            
                            <Row noGutters={true}>
                                <Col xs={2}>
                                    
                                </Col>
                                <Col xs={10} className="DragAndDropColumn">
                                    <DeansShedule friday={this.state.friday} saturday={this.state.saturday} planRef={this}/>
                                </Col>
                            </Row>
                    </Container>
                </DragDropContext>

            )       
        }
    }
}
