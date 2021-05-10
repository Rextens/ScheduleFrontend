import React, { Component } from 'react'

export default class Lesson extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <Col sm={2} key={props.index} >
                {
                    props.name
                }
            </Col>
        )
    }
}
