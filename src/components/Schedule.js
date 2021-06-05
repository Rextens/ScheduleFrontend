import axios from 'axios'
import React, { Component } from 'react'
import { Col, Container, Row, Button, Form } from "react-bootstrap"
import { Redirect } from "react-router";
import Popup from 'reactjs-popup'
import "../cssComponents/SchedulePage.css"

export default class Schedule extends Component {
    constructor(props) {
        super(props)

        this.state = {
           friday: [],
           saturday: [],
           redirectToLoginPage: false,
           userType: 0,
           fridayY: 0,
           saturdayY: 0,
           fridayDate: new Date(),
           saturdayDate: new Date(),
           fridayNotes: new Map(),
           saturdayNotes: new Map()
        }
    }

    componentDidMount = () => {
        let today = new Date()

        if(today.getDay() != 5 && today.getDay() != 6)
        {
            let tempFridayDate = new Date()
            tempFridayDate.setDate(today.getDate() + 5 - today.getDay())

            let tempSaturdayDate = new Date()
            tempSaturdayDate.setDate(today.getDate() + 6 - today.getDay())
            
            this.state.fridayDate = tempFridayDate
            this.state.saturdayDate = tempSaturdayDate
            //this.setState({saturdayDate: tempSaturdayDate,
            //    fridayDate: tempFridayDate})
        }
        else if(today.getDay() == 5)
        {
            let tempSaturdayDate = new Date()
            tempSaturdayDate.setDate(today.getDate() + 1)
            //this.setState({saturdayDate: tempSaturdayDate})
            this.state.saturdayDate = tempSaturdayDate
        }
        else if(today.getDay() == 6)
        {
            let tempFridayDate = new Date()
            tempFridayDate.setDate(today.getDate() - 1)
            //this.setState({fridayDate: tempFridayDate})
            this.state.fridayDate = tempFridayDate
        }

        axios.get('/isLogged', {withCredentials: true}).then(result => {
            //this.setState({redirectToLoginPage: result.data.redirect, userType: result.data.userType}, () => {

                this.state.redirectToLoginPage = result.data.redirect
                this.state.userType = result.data.userType

                if(this.state.userType == 0)
                {
                    let todayDate = new Date()
    
                    let today = `${todayDate.getFullYear()}/${todayDate.getMonth()+1}/${todayDate.getDate()}`
    
                    axios.post('/getSubjectsForDate', today, {withCredentials: true}).then(result => {
                        console.log(result)
                        let tempFriday = []
                        let tempSaturday = []
                        
                        result.data.map((item, index) => {
                            let tempConstruct = {
                                name: item.name,
                                proffessor: item.proffesor,
                                subjectLength: item.subjectLength,
                                color: item.color,
                                subjectIndex: item.subjectIndex
                            }
                            
                            if(item.isFriday)
                            {
                                tempFriday.push(tempConstruct)
                            }
                            else
                            {
                                tempSaturday.push(tempConstruct)
                            }
                        })
    
                        this.setState({friday: tempFriday})
                        this.setState({saturday: tempSaturday})
                    })
                }
                else if(this.state.userType == 1)
                {
                    axios.get('/getSubjectsForProffesor', {withCredentials: true}).then(result => {
                        let tempFriday = []
                        let tempSaturday = []

                        let lastFridayY = 0;
                        let lastSaturdayY = 0;
                        
                        result.data.map((item, index) => {
                            console.log(item)
                            
                            let tempConstruct = {
                                name: item.name,
                                proffessor: item.proffesor,
                                subjectLength: item.subjectLength,
                                color: item.color,
                                subjectIndex: item.subjectIndex
                            }
                            
                            if(item.isFriday)
                            {
                                lastFridayY = item.subjectIndex * 50 + 50;
                                tempFriday.push(tempConstruct)
                            }
                            else
                            {
                                lastSaturdayY = item.subjectIndex * 50  + 50;
                                tempSaturday.push(tempConstruct)
                            }
                        })
                        
                        this.setState({friday: tempFriday,
                                        saturday: tempSaturday,
                                        fridayY: lastFridayY,
                                        saturdayY: lastSaturdayY})
                        
                       /*
                        this.state.friday = tempFriday,
                        this.state.saturdayY = tempSaturday,
                        this.state.fridayY = lastFridayY,
                        this.state.saturdayY = lastSaturdayY
                            */
                    })
                }

                this.loadNotes();
            //})
        })
    }

    translateSubjectToProperPosition = (itemIndex) => {
        return itemIndex * 50;
    }

    subDate = () => {
        this.state.fridayDate.setDate(this.state.fridayDate.getDate() - 7)
        this.state.saturdayDate.setDate(this.state.saturdayDate.getDate() - 7)

        this.loadNotes();

        //this.setState({})
    }

    addDate = () => {
        this.state.fridayDate.setDate(this.state.fridayDate.getDate() + 7)
        this.state.saturdayDate.setDate(this.state.saturdayDate.getDate() + 7)

        this.loadNotes();

        //this.setState({})
    }

    loadNotes = () => {
        this.state.fridayNotes.clear()
        this.state.saturdayNotes.clear()

        const dates = {
            friday: this.state.fridayDate.toJSON().slice(0, 10).replace('T', ' '),
            saturday: this.state.saturdayDate.toJSON().slice(0, 10).replace('T', ' ')
        }

        axios.post('/loadNotes', dates, {withCredentials: true}).then(result => {

            result.data.fridayNotes.map((item) => {
                this.state.fridayNotes.set(item.index, item.note)
            })

            result.data.saturdayNotes.map((item) => {
                this.state.saturdayNotes.set(item.index, item.note)
            })

            this.setState({})
        })
    }

    handleProffesorText = (input, checkIsFriday, itemIndexArg) => {
        input.preventDefault()

        const noteData = {
            noteText: input.target[0].value,
            isFriday: checkIsFriday,
            itemIndex: itemIndexArg
        }

        //care for month is starting from 0, not from 1
        if(checkIsFriday)
        {
            noteData.chosenDate = this.state.fridayDate.toJSON().slice(0, 10).replace('T', ' ')
        }
        else
        {
            noteData.chosenDate = this.state.saturdayDate.toJSON().slice(0, 10).replace('T', ' ')
        }

        axios.post('/addTeacherNote', noteData, {withCredentials: true}, () => {

        })
    }

    letInput = (isFridayOpened, itemIndex) => {
        if(this.state.userType == 1)
        {
            return (
                <Form onSubmit={e => this.handleProffesorText(e, isFridayOpened, itemIndex)} style={{width: '100%', height: '100%'}}>
                    <textarea style={{width: '100%', height: '90%'}} defaultValue={this.state.fridayNotes.get(itemIndex)}/>
                    
                    <Button type="sumbmit" style={{bottom: 0}}>Dodaj notatkę</Button>
                </Form>
            )
        }
        else
        {
            
            if(isFridayOpened)
            {
                return (
                    <div>
                        {   
                            this.state.fridayNotes.get(itemIndex)
                        }
                    </div>
                )
            }
            else
            {
                return (
                    <div>
                        {   
                            this.state.saturdayNotes.get(itemIndex)
                        }
                    </div>
                )
            }
        }
    }
 
    render() {
        if(this.state.redirectToLoginPage)
        {
            return <Redirect to="/" />
        }
        else
        {
            return (
                <Container fluid={true} className="PlanRow" className="Background">        
                    <Row>
                        <Col xs={{span: 10, offset: 2}}>
                            <Button style={{float: 'left'}} onClick={this.subDate}>Poprzedni</Button> 
                            
                            <Button style={{float: 'right'}} onClick={this.addDate}>Następny</Button>
                        </Col>
                    </Row>
                    
                    <Row noGutters={true}>
                        <Col xs={{span: 10, offset: 2}} md={{span: 5, offset: 2}} style={{position: 'relative', height: `${this.state.fridayY + 40}px`}}>                           
                            {
                                `Piątek: ${this.state.fridayDate.getFullYear()}/${this.state.fridayDate.getMonth() + 1}/${this.state.fridayDate.getDate()}`
                            }
                            {
                                this.state.friday.map((item, index) => {
                                    console.log(item)

                                    return (                          
                                        <div className="Subject" style={{background: item.color, transform: `translateY(${this.translateSubjectToProperPosition(item.subjectIndex)}px)`}}>
                                            <Popup trigger={<div className="PopupButtonContainer">{item.name}</div>} modal>
                                                <div customvalue="abc" className="SubjectPopup">
                                                    {
                                                        this.letInput(1, item.subjectIndex)
                                                    }
                                                </div>
                                            </Popup>
                                        </div>                                        
                                    )
                                })
                            }
                        </Col>

                        <Col xs={{span: 10, offset: 2}} md={{span: 5, offset: 0}} style={{position: 'relative', height: `${this.state.saturdayY + 40}px`}}>                          
                            {
                                `Sobota: ${this.state.saturdayDate.getFullYear()}/${this.state.saturdayDate.getMonth() + 1}/${this.state.saturdayDate.getDate()}`
                            }
                            {
                                this.state.saturday.map((item, index) => {
                                    return (
                                        <div className="Subject" style={{background: item.color, transform: `translateY(${this.translateSubjectToProperPosition(item.subjectIndex)}px)`}}>                                        
                                            <Popup trigger={<div className="PopupButtonContainer">{item.name}</div>} modal>
                                                <div className="SubjectPopup">
                                                    {
                                                        this.letInput(0, item.subjectIndex)
                                                    }
                                                </div>
                                            </Popup>
                                        </div>
                                    )
                                })                            
                            }
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}
