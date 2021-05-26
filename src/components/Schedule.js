import axios from 'axios'
import React, { Component } from 'react'
import { Col, Container, Row } from "react-bootstrap"

export default class Schedule extends Component {
    constructor(props) {
        super(props)

        this.state = {
           friday: [],
           saturday: []
        }
    }

    componentDidMount = () => {

        let todayDate = new Date()

        let today = `${todayDate.getFullYear()}/${todayDate.getMonth()+1}/${todayDate.getDate()}`

        axios.post('/getSubjectsForDate', today, {withCredentials: true}).then(result => {
            
            let tempFriday = []
            let tempSaturday = []
            
            result.data.map((item, index) => {
                let tempConstruct = {
                    name: item.name,
                    proffessor: item.proffesor,
                    subjectLength: item.subjectLength,
                    color: item.color
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

            console.log(this.state.friday)
            console.log(this.state.saturday)
        })
    }

    render() {
        return (
            <Container fluid={true} className="PlanRow" className="Background">        
                <Row noGutters={true}>
                    <Col xs={2}>
                                    
                    </Col>
                    <Col xs={5}>
                        {
                            this.state.friday.map((item, index) => {
                                return (
                                    <div style={{background: item.color}}>
                                        {
                                            item.name
                                        }
                                    </div>
                                )
                            })
                        }
                    </Col>

                    <Col xs={5}>
                        {
                            this.state.saturday.map((item, index) => {
                                return (
                                    <div style={{background: item.color}}>
                                        {
                                            item.name
                                        }
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
