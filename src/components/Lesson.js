import React, { Component } from 'react'

export default class Lesson extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <Col sm={4} key={props.index} >
                {
                    props.name
                }
            </Col>
        )
    }
}
