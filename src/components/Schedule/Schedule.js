import axios from 'axios'
import React, { Component } from 'react'
import { Col, Container, Row, Button, Form } from "react-bootstrap"
import { Redirect } from "react-router";
import Popup from 'reactjs-popup'
import Subject from './Subject'
import "./SchedulePage.css"

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
           saturdayNotes: new Map(),
           fridayLessonsHours: ['16.15', '18.00', '19.45'],
           saturdayLessonsHours: ['8.15', '10.00', '12.00', '13.45'],
           weekNumber: 0,
        }

        this.subjectHeight = 100;
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
        }
        else if(today.getDay() == 5)
        {
            let tempSaturdayDate = new Date()
            tempSaturdayDate.setDate(today.getDate() + 1)
            this.state.saturdayDate = tempSaturdayDate
        }
        else if(today.getDay() == 6)
        {
            let tempFridayDate = new Date()
            tempFridayDate.setDate(today.getDate() - 1)
            this.state.fridayDate = tempFridayDate
        }

        axios.get('/isLogged', {withCredentials: true}).then(result => {
                this.state.redirectToLoginPage = result.data.redirect
                this.state.userType = result.data.userType

                this.loadTodaysWeekNumber()

                if(this.state.userType == 0)
                {
                    let todayDate = new Date()
    
                    let today = `${todayDate.getFullYear()}/${todayDate.getMonth()+1}/${todayDate.getDate()}`
    
                    axios.post('/getSubjectsForDate', today, {withCredentials: true}).then(result => {

                        console.log(result)

                        let tempFriday = []
                        let tempSaturday = []

                        let lastFridayY = 0;
                        let lastSaturdayY = 0;
                        
                        result.data.map((item, index) => {
                            let tempConstruct = {
                                name: item.name,
                                proffessor: item.proffesor,
                                subjectLength: item.subjectLength,
                                color: item.color,
                                subjectIndex: item.subjectIndex,
                                roomNumber: item.roomNumber,
                                userName: item.userName
                            }
                            
                            if(item.isFriday)
                            {
                                lastFridayY = item.subjectIndex * (this.subjectHeight + 50) + this.subjectHeight + 40;
                                tempFriday.push(tempConstruct)
                            }
                            else
                            {
                                lastSaturdayY = item.subjectIndex * (this.subjectHeight + 50) + this.subjectHeight + 40;
                                tempSaturday.push(tempConstruct)
                            }
                        })
    
                        this.setState({friday: tempFriday,  
                                        saturday: tempSaturday,
                                        fridayY: lastFridayY,
                                        saturdayY: lastSaturdayY})
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
                                subjectIndex: item.subjectIndex,
                                roomNumber: item.roomNumber,
                                userName: item.userName
                            }
                            
                            if(item.isFriday)
                            {
                                lastFridayY = item.subjectIndex * this.subjectHeight + this.subjectHeight + 40;
                                tempFriday.push(tempConstruct)
                            }
                            else
                            {
                                lastSaturdayY = item.subjectIndex * this.subjectHeight + this.subjectHeight + 40;
                                tempSaturday.push(tempConstruct)
                            }
                        })
                        
                        this.setState({friday: tempFriday,
                                        saturday: tempSaturday,
                                        fridayY: lastFridayY,
                                        saturdayY: lastSaturdayY})
                    })
                }

                this.loadNotes();
            //})
        })
    }

    loadTodaysWeekNumber = () => {
        let body = {
            date: this.state.fridayDate
        }

        axios.post('/loadWeekNumber', body, {withCredentials: true}).then(result => {
            this.setState({weekNumber: result.data.weekNumber})
            
        })
    }

    subDate = () => {
        this.state.fridayDate.setDate(this.state.fridayDate.getDate() - 7)
        this.state.saturdayDate.setDate(this.state.saturdayDate.getDate() - 7)

        this.loadNotes();
        this.loadTodaysWeekNumber()
    }

    addDate = () => {
        this.state.fridayDate.setDate(this.state.fridayDate.getDate() + 7)
        this.state.saturdayDate.setDate(this.state.saturdayDate.getDate() + 7)

        this.loadNotes();
        this.loadTodaysWeekNumber()
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
                let temp = item

                let temp2 = new Date(temp.date)

                let key = {
                   // date: temp2.toJSON().slice(0, 10).replace('T', ' '),
                    changer: temp.changer,
                    index: temp.index
                }

                this.state.fridayNotes.set(JSON.stringify(key), temp)
            })

            result.data.saturdayNotes.map((item) => {
                let temp = item

                let temp2 = new Date(temp.date)

                let key = {
                   // date: temp2.toJSON().slice(0, 10).replace('T', ' '),
                    changer: temp.changer,
                    index: temp.index
                }

                this.state.saturdayNotes.set(JSON.stringify(key), temp)
            })

            this.setState({})
        })
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
                    <Row bsPrefix="chooseDateBar row" noGutters={true}>
                        <Col xs={{span: 4}} md={{span: 3, offset: 2}}>
                            <Button bsPrefix="changeDatePrevious toggleButton" style={{float: 'left'}} onClick={this.subDate}>Poprzedni</Button> 
                        </Col>

                        <Col className="WeekNumber" xs={{span: 2}}>
                            <div>
                                Tydzień: 
                                { " " + this.state.weekNumber }
                            </div>
                        </Col>

                        <Col xs={{span: 4}} md={{span: 5}}>
                            <Button bsPrefix="changeDateNext toggleButton" style={{float: 'left'}} onClick={this.addDate}>Następny</Button>
                        </Col>
                    </Row>
                    
                    <Row noGutters={true}>
                        <Col xs={{span: 10, offset: 0}} md={{span: 5, offset: 2}} style={{position: 'relative', height: `${this.state.fridayY + 40}px`}}>                           
                            { 
                                <div style={{marginBottom: 20}}>
                                {
                                    `Piątek: ${this.state.fridayDate.getFullYear()}/${this.state.fridayDate.getMonth() + 1}/${this.state.fridayDate.getDate()}`
                                }
                                </div>
                            }
                            {
                                this.state.friday.map((item, index) => {
                                    return (
                                        <Subject item={item} 
                                                day={this.state.friday} 
                                                index={index} 
                                                lessonHours={this.state.fridayLessonsHours} 
                                                notes={this.state.fridayNotes}
                                                userType={this.state.userType}
                                                chosenDate={this.state.fridayDate}
                                        />                                  
                                    )
                                })
                            }
                        </Col>

                        <Col xs={{span: 10, offset: 0}} md={{span: 5, offset: 0}} style={{position: 'relative', height: `${this.state.saturdayY + 40}px`}}>                          
                            {
                                <div style={{marginBottom: 20}}>
                                {
                                    `Sobota: ${this.state.saturdayDate.getFullYear()}/${this.state.saturdayDate.getMonth() + 1}/${this.state.saturdayDate.getDate()}`
                                }
                                </div>
                            }
                            {
                                this.state.saturday.map((item, index) => {
                                    return (
                                        <Subject item={item} 
                                                day={this.state.saturday} 
                                                index={index} 
                                                lessonHours={this.state.saturdayLessonsHours} 
                                                notes={this.state.saturdayNotes}
                                                userType={this.state.userType}
                                                chosenDate={this.state.saturdayDate}
                                        />                           
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
