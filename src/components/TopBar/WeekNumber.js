import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../cssComponents/PlanPage.css'
import axios from 'axios'

export default class WeekNumber extends Component {

    addSubject = (input) => {
        input.preventDefault()

        let today = new Date()

        let sundayDate = new Date()
            sundayDate.setDate(today.getDate() - today.getDay())

        console.log(sundayDate)

        let data = {
            week: sundayDate.toJSON().slice(0, 10).replace('T', ' '),
            number: input.target[0].value
        }

        axios.post('/setWeekDate', data, {withCredentials: true}).then(result => {
            
        })
    }

    render() {
        return (
            <Form onSubmit={this.addSubject} className="weekNumberForm">
                <Form.Group>
                    <Form.Control type="number" bsPrefix="dataInput" placeholder="Week Number"></Form.Control>
                </Form.Group>

                <Button className="toggleButton marginsForWeekButton" type="sumbmit">Dodaj przedmiot!</Button>
            </Form>
        )
    }
}
