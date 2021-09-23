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
            this.props.planRef.loadDeansSubjects()
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