import DatePicker from "react-datepicker"
import React, { Component } from 'react'
import { Dropdown, Form, Button} from "react-bootstrap"
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css";

export default class SemestersMenu extends Component {

    constructor(props) {
        super(props)

        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            selectedSemester: ""
        }
    }

    addSemester = (input) => {
        input.preventDefault()

        let semesterData = {
            startDate: input.target[0].value,
            endDate: input.target[1].value,
            name: input.target[2].value
        }

        axios.post('/addSemester', semesterData, {withCredentials: true}).then(result => {
            semesterData.ID = result.data

            this.props.planRef.setState({semesters: [...this.props.semesters, semesterData]})
        })
    }

    selectOption = (input) => {
        this.props.planRef.setState({chosenSemester: input.target.value}, () => {
            this.props.planRef.loadDeansSubjects()
        })
    }

    render() {
        if(this.props.userType == 2)
        {
            return (
                <Dropdown>
                        <Dropdown.Toggle bsPrefix="toggleButton" variant="none" id="dropdown-basic">
                            Semestry
                        </Dropdown.Toggle>

                        <Dropdown.Menu bsPrefix="dropdown-menu dropdownMenu">
                            <Form onSubmit={this.addSemester}>
                                <DatePicker selected={this.state.startDate} onChange={date => this.setState({startDate: date})} dateFormat="yyyy/MM/dd"/>
                                <DatePicker selected={this.state.endDate} onChange={date => this.setState({endDate: date})} dateFormat="yyyy/MM/dd"/>

                                <Form.Group>
                                    <Form.Control bsPrefix="dataInput" placeholder="Semester Name"></Form.Control>
                                </Form.Group>

                                <Button bsPrefix="toggleButton marginsForSubjectButton" type="sumbmit">Dodaj Semestr!</Button>
                            </Form>

                            <select onChange={this.selectOption}>
                                {
                                    this.props.semesters.map((item, index) => {
                                        return(
                                            <option value={`${item.ID}`} key={`${item.ID}`}>
                                                {
                                                    item.name
                                                }
                                            </option>
                                        )
                                        
                                    })
                                }
                            </select>
                        </Dropdown.Menu>          
                </Dropdown>
            )
        }
        else
        {
            return null;
        }
    }
}
