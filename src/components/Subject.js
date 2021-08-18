import React, { Component } from 'react'
import { Col } from "react-bootstrap"
import '../cssComponents/PlanPage.css'

export default class Subject extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div>
                {this.props.name}
                " "
                {this.props.roomNumber}
            </div>
        )
    }
}
