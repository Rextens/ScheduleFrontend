import React, { Component } from 'react'
import { Col } from "react-bootstrap"

export default class Subject extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <Col sm={4} key={this.props.index} >
                {
                    this.props.name
                }
            </Col>
        )
    }
}
