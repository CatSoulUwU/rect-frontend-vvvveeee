'use client'

import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

function ModalCreateNewCrew(props) {
    const [DriverId, SetDriverId] = useState('')
    const [CarId, SetCarId] = useState('')

    function sendCrew(params) {
        props.formEmit(CarId, DriverId)
        props.handleClose()
        SetDriverId('')
        SetCarId('')
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
                        <Form.Label>Введите ID автомобиля (Только Цифры)</Form.Label>
                        <Form.Control value={CarId} onChange={e => SetCarId(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите ID водителя (Только Цифры)</Form.Label>
                        <Form.Control value={DriverId} onChange={e => SetDriverId(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=>sendCrew()} variant='success'>Отправить</Button>
                <Button onClick={props.handleClose} className="btn btn-dark">Отменить</Button>
            </Modal.Footer>
        </Modal> 
    </div>
  )
}

export default ModalCreateNewCrew