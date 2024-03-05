'use client'

import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

function ModalUpdateCrews(props) {
    const [CarId, setCarId] = useState('')
    const [DriverId, setDriverId] = useState('')

    var newCrewObject = [
        {
            CrewId:'',
            CarId:'',
            DriverId:''
        }
    ]

    if (props.CrewObject[0].CarId != undefined) {
        newCrewObject = props.CrewObject
    }

    function populateObject(params) {
        var CrewIdd = newCrewObject[0].CrewId
        var CarIdd = (CarId == '')? newCrewObject[0].CarId : CarId;
        var DriverIdd = (DriverId == '')? newCrewObject[0].DriverId : DriverId;

        const sendCrewObject = [
            {
                CrewId:CrewIdd,
                CarId:CarIdd,
                DriverId: DriverIdd
            }
        ]

        props.recieve(sendCrewObject)
        props.handleClose()

        setCarId('')
        setDriverId('')
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
                        <Form.Label>Введите ID автомобиля</Form.Label>
                        <Form.Control placeholder={props.CrewObject == []? ``:`${newCrewObject[0].CarId}`} value={CarId} onChange={e => setCarId(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите ID водителя </Form.Label>
                        <Form.Control placeholder={props.CrewObject == []? ``:`${newCrewObject[0].DriverId}`} value={DriverId} onChange={e => setDriverId(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => populateObject()} variant='success'>Отправить</Button>
                <Button onClick={props.handleClose} className="btn btn-dark">Отменить</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default ModalUpdateCrews