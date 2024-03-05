"use client"; // This is a client component 👈🏽

import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

function ModalCreateNewCar(props) {
    const [Brand, setBrand] = useState('')
    const [Model, setModel] = useState('')
    const [CarAge, setCarAge] = useState('')
    const [Kilometrage, setKilometrage] = useState('')
    const [SerialPlate, setSerialPlate] = useState('')
    const [RegistrationRegion, setRegistrationRegion] = useState('')
    

    function emitCar(params) {
        props.recieve(Brand, Model, CarAge, Kilometrage, SerialPlate, RegistrationRegion)
        setBrand('')
        setModel('')
        setCarAge('')
        setKilometrage('')
        setSerialPlate('')
        setRegistrationRegion('')
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
                        <Form.Label>Введите Брэнд</Form.Label>
                        <Form.Control value={Brand} onChange={e => setBrand(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Модель</Form.Label>
                        <Form.Control value={Model} onChange={e => setModel(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Возраст (только цифры)</Form.Label>
                        <Form.Control value={CarAge} onChange={e => setCarAge(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Километраж (только цифры)</Form.Label>
                        <Form.Control value={Kilometrage} onChange={e => setKilometrage(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Номер</Form.Label>
                        <Form.Control value={SerialPlate} onChange={e => setSerialPlate(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Регион</Form.Label>
                        <Form.Control value={RegistrationRegion} onChange={e => setRegistrationRegion(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='success' onClick={emitCar}>Отправить</Button>
                <Button onClick={props.handleClose} className="btn btn-dark">Отменить</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default ModalCreateNewCar