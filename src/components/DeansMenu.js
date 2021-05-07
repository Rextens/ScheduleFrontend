import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Collapse, NavDropdown, Nav, Form, FormControl, Container, Row, Col } from "react-bootstrap"
import { Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../cssComponents/PlanPage.css'
import axios from 'axios'
import Subject from './Subject'

export default class DeansMenu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirectToLoginPage: false,
            expandList: false,
            subjects: []
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

    componentDidMount = () => {

        axios.get('/getSubjects', {withCredentials: true}).then(result => {
            this.setState({
                subjects: result.data
            }, () => {
               console.log(this.state.subjects)
            })
        })
    }

    render() {
        if(this.props.userType == 2)
        {
            return(
                <div>
                    <Button onClick={() => this.setState({expandList: !this.state.expandList})} 
                        aria-controls="example-collapse-text"
                        aria-expanded={this.state.expandList}> click </Button>
                    
                    <Collapse in={this.state.expandList}>
                        <div id="example-collapse-text"  className="rtl">
                                <Row noGutters={true}>
                                    <Col sm={3} xs={12}>
                                        <Form onSubmit={this.addSubject}>
                                            <Form.Group>
                                                <Form.Control placeholder="Subject Name"></Form.Control>
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Control placeholder="Proffesor"></Form.Control>
                                            </Form.Group>
                                            <Button type="sumbmit">Add Subject!</Button>
                                        </Form>
                                    </Col>
                                    <Col sm={9} xs={12}> 
                                        <Container fluid={true}>
                                            <Row>
                                            {
                                                this.state.subjects.map((item, index) => 
                                                    
                                                    <Subject name={item.name} index={index}/>
                                                )    
                                            }
                                            </Row>
                                        </Container>
                                    </Col>
                                </Row>
                        </div>
                    </Collapse>
                </div>
            )
        }
        else
        {
            return null
        }
    }
}
