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
            <Col sm={{span: 4, offset: 0.5}} key={this.props.index} className="Subject">
                {
                    this.props.name
                }
            </Col>
        )
    }
}
