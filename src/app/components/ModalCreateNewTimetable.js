'use client'

import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

function ModalCreateNewTimetable(props) {
    const [RouteId, setRouteId] = useState('')
    const [CrewId, setCrewId] = useState('')
    const [DepartDate, setDepartDate] = useState('')
    const [ArrivalDate, setArrivalDate] = useState('')

    function sendTimetable(){
        props.formEmit(RouteId, CrewId, (DepartDate === '')? null: DepartDate, (ArrivalDate === '')? null: ArrivalDate)
        props.handleClose
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
                    <p>Создать новую запись</p>
                </Modal.Title> 
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Введите ID маршрута</Form.Label>
                        <Form.Control value={RouteId} onChange={e => setRouteId(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите ID Экипажа </Form.Label>
                        <Form.Control value={CrewId} onChange={e => setCrewId(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Дату Отправления</Form.Label>
                        <Form.Control value={DepartDate} onChange={e => setDepartDate(e.target.value)} type='date' ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Дату Приезда (если есть)</Form.Label>
                        <Form.Control value={ArrivalDate} onChange={e => setArrivalDate(e.target.value)} type='date' ></Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=> sendTimetable()} variant='success'>Отправить</Button>
                <Button onClick={props.handleClose} className="btn btn-dark">Отменить</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default ModalCreateNewTimetable