"use client"; // This is a client component 👈🏽

import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

function ModalCreateNewDriver(props) {
    const [FullName, setFullName] = useState('')
    const [DriverAge, setDriverAge] = useState('')
    const [DriverExperience, setDriverExperience] = useState('')
    const [PassportNumber, setPassportNumber] = useState('')
    const [PhoneNumber, setPhoneNumber] = useState('')
    
    function sendDriver(params) {
        props.formEmit(FullName, DriverAge, DriverExperience, PassportNumber, PhoneNumber)
        props.handleClose()
        setDriverAge('')
        setDriverExperience('')
        setFullName('')
        setPassportNumber('')
        setPhoneNumber('')
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
                        <Form.Label>Введите Имя Отчество</Form.Label>
                        <Form.Control value={FullName} onChange={e => setFullName(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Возраст (только цифры)</Form.Label>
                        <Form.Control value={DriverAge} onChange={e => setDriverAge(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Опыт Работы (только цифры)</Form.Label>
                        <Form.Control value={DriverExperience} onChange={e => setDriverExperience(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Номер Паспорта (в форме хххх-хххххх)</Form.Label>
                        <Form.Control value={PassportNumber} onChange={e => setPassportNumber(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Номер Телефона</Form.Label>
                        <Form.Control value={PhoneNumber} onChange={e => setPhoneNumber(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => sendDriver()} variant='success'>Отправить</Button>
                <Button onClick={props.handleClose} className="btn btn-dark">Отменить</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default ModalCreateNewDriver