'use client'

import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

function ModalUpdateTimetable(props) {
    const [RouteId, setRouteId] = useState('')
    const [CrewId, setCrewId] = useState('')
    const [DepartDate, setDepartDate] = useState('')
    const [ArrivalDate, setArrivalDate] = useState('')

    var newTimetableObject = (
        [
          {
            TimetableId:'',
            RouteId:'',
            CrewId:'',
            DepartDate:'',
            ArrivalDate:''
          }
        ]
    )

    if (props.TimetableObject[0].RouteId != undefined) {
        newTimetableObject = props.TimetableObject
    }

    function populateObject (){
        var TimetableIdd = newTimetableObject[0].TimetableId
        var RouteIdd = (RouteId == '')? newTimetableObject[0].RouteId : RouteId;
        var CrewIdd = (CrewId == '')? newTimetableObject[0].CrewId : CrewId;
        var DepartDatee = (DepartDate == '')? newTimetableObject[0].DepartDate : DepartDate;
        var ArrivalDatee = (ArrivalDate == '')? newTimetableObject[0].ArrivalDate : ArrivalDate;

        const sendTimetableObject = [
            {
                TimetableId: TimetableIdd,
                RouteId: RouteIdd,
                CrewId: CrewIdd,
                DepartDate: (DepartDatee === '')? null: DepartDatee,
                ArrivalDate: (ArrivalDatee === '')? null: ArrivalDatee
            }
        ]

        props.recieve(sendTimetableObject)
        props.handleClose()

        setArrivalDate('')
        setCrewId('')
        setDepartDate('')
        setRouteId('')
    }

  return (
    <div>
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <p>Изменить Запись ID: </p>
                </Modal.Title> 
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Введите ID маршрута</Form.Label>
                        <Form.Control placeholder={props.TimetableObject == []? ``:`${ newTimetableObject[0].RouteId}`} 
                        value={RouteId} onChange={e => setRouteId(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите ID экипажа </Form.Label>
                        <Form.Control placeholder={props.TimetableObject == []? ``:`${ newTimetableObject[0].CrewId}`} 
                        value={CrewId} onChange={e => setCrewId(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Дату Отправления </Form.Label>
                        <Form.Control placeholder={props.TimetableObject == []? ``:`${ newTimetableObject[0].DepartDate}`} 
                        value={DepartDate} onChange={e => setDepartDate(e.target.value)} type='date' ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Дату Приезда (если есть)</Form.Label>
                        <Form.Control placeholder={props.TimetableObject == []? ``:`${ newTimetableObject[0].ArrivalDate}`} 
                        value={ArrivalDate} onChange={e => setArrivalDate(e.target.value)} type='date' ></Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=>populateObject()} variant='success'>Отправить</Button>
                <Button onClick={props.handleClose} className="btn btn-dark">Отменить</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default ModalUpdateTimetable