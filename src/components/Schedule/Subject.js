import React from 'react'
import Popup from 'reactjs-popup'
import { Col, Container, Row, Button, Form } from "react-bootstrap"
import axios from 'axios'

/*
props:
lessonHours
day
item
index
notes
userType
chosenDate
*/

const Subject = (props) => 
{
    const subjectHeight = 100;

    const getEndTime = (index) => {
        if(props.lessonHours[props.day[index].subjectIndex])
        {
            let pair = props.lessonHours[props.day[index].subjectIndex].split('.')

            let tempDate = new Date()
                
            tempDate.setHours(parseInt(pair[0]))
            tempDate.setMinutes(parseInt(pair[1]) + parseInt(props.day[index].subjectLength))

            return (
                <div>
                    {
                        tempDate.getHours() + "." + tempDate.getMinutes()
                    }
                </div>
            )
        }
    }

    const translateSubjectToProperPosition = (itemIndex) => {
        return itemIndex * subjectHeight;
    }

    const handleProffesorText = (input, itemIndexArg) => {
        input.preventDefault()

        const noteData = {
            noteText: input.target[0].value,
            itemIndex: itemIndexArg,
            chosenDate: props.chosenDate.toJSON().slice(0, 10).replace('T', ' '),
            inScheduleId: props.inScheduleId
        }

        axios.post('/addTeacherNote', noteData, {withCredentials: true}, () => {

        })
    }

    const letInput = (itemIndex) => {
        let key = {
            changer: parseInt(props.item.proffessor),
            index: props.item.subjectIndex
        }

        let temp = props.notes.get(JSON.stringify(key))

        if(props.userType == 1)
        {
            return (
                <Form onSubmit={e => handleProffesorText(e, itemIndex)} style={{width: '100%', height: '100%'}}>
                    <textarea style={{width: '100%', height: '90%'}} defaultValue={temp ? temp.note : ""}/>
                    
                    <Button type="sumbmit" style={{bottom: 0}}>Dodaj notatkę</Button>
                </Form>
            )
        }
        else
        {
            return (
                <div>
                {   
                /*
                    temp && temp.changer === parseInt(props.item.proffessor) ? temp.note : ""
                */
                    temp ? temp.note : ""
                }
                </div>
            )
        }
    }

    return (
        <div className="SubjectContainer" style={{transform: `translateY(${translateSubjectToProperPosition(props.item.subjectIndex)}px)`, justifyContent: 'content', flexDirection: 'row', display: 'flex'}}> 
            {   
            <div style={{transform: `translateX(30px)`}}>
                <div>
                    {
                        props.lessonHours[props.item.subjectIndex]
                    }    
                </div>
                <div style={{ marginTop: '25px' }}>
                    {
                        getEndTime(props.index)
                    }
                </div>  
            </div>
            }     
            <div className="Subject" style={{background: props.item.color}}>
                <Popup trigger={
                    <div className="PopupButtonContainer">
                        <div className="SubjectPart">
                        {
                            props.item.name 
                        }
                        </div>
                        <div className="SubjectPart">
                        {
                            /*
                            props.item.roomNumber
                            */

                            props.inScheduleId  
                        }
                        </div>
                        <div>
                        {
                            `${props.item.userName}`
                        }
                        </div>
                    </div>} modal>
                                                    
                    <div className="overlay"/>
                    <div customvalue="abc" className="SubjectPopup">
                    {
                        letInput(1, props.item.subjectIndex)
                    }
                    </div>
                </Popup>
            </div>
        </div>
    )
}

export default Subject