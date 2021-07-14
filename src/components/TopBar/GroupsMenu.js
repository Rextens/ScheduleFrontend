import React, { Component } from 'react'
import { Dropdown, Form, Button} from "react-bootstrap"
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css";

export default class GroupsMenu extends Component {

    constructor(props) {
        super(props)

        this.state = {

            selectedGroup: ""
        }
    }

    addGroup = (input) => {
        input.preventDefault()

        const groupData = {
            group: input.target[0].value
        }

        axios.post('/addGroups', groupData, {withCredentials: true}).then(result => {
            this.props.planRef.setState({groups: [...this.props.groups, groupData]})
        })
    }

    selectOption = (input) => {
        this.props.planRef.setState({chosenGroup: input.target.value}, () => {
            const semesterAndGroup = {
                semester: this.props.planRef.state.chosenSemester,
                group: this.props.planRef.state.chosenGroup
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
                        dndID: this.props.planRef.indexCounting
                    }

                    ++this.props.planRef.indexCounting

                    if(result.data[i].isFriday)
                    {
                        tempFriday.push(tempSubject)
                    }
                    else
                    {
                        tempSaturday.push(tempSubject)
                    }
                }

                this.props.planRef.setState({friday: tempFriday})
                this.props.planRef.setState({saturday: tempSaturday})
            })
        })
    }

    render() {
        if(this.props.userType == 2)
        {
            return (
                <Dropdown>
                        <Dropdown.Toggle bsPrefix="toggleButton" variant="none" id="dropdown-basic">
                            Grupy
                        </Dropdown.Toggle>

                        <Dropdown.Menu bsPrefix="dropdown-menu dropdownMenu">
                            <Form onSubmit={this.addGroup}>
                                <Form.Group>
                                    <Form.Control bsPrefix="dataInput" placeholder="Nazwa grupy"></Form.Control>
                                </Form.Group>

                                <Button bsPrefix="toggleButton marginsForSubjectButton" type="sumbmit">Dodaj Grupę!</Button>
                            </Form>

                            <select onChange={this.selectOption}>
                                {
                                    this.props.groups.map((item, index) => {
                                        return(
                                            <option value={`${item.group}`} key={`${item.group}`}>
                                                {
                                                    item.group
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