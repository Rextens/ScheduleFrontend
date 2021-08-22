import React, { Component } from 'react'
import { Col } from "react-bootstrap"
import '../cssComponents/PlanPage.css'

export default class DeansSubject extends Component {
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
