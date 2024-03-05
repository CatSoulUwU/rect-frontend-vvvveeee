'use client'

import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

function ModalCreateNewRoute(props) {
    const [From, setFrom] = useState('')
    const [To, setTo] = useState('')
    const [Distance, setDistance] = useState('')
    const [ETA, setETA] = useState('')

    function sendRoute(params) {
        props.formEmit(From, To, Distance, ETA)
        props.handleClose()
        setDistance('')
        setETA('')
        setFrom('')
        setTo('')
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
                        <Form.Label>Введите Откуда</Form.Label>
                        <Form.Control value={From} onChange={e => setFrom(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Куда </Form.Label>
                        <Form.Control value={To} onChange={e => setTo(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Расстояние (только цифры)</Form.Label>
                        <Form.Control value={Distance} onChange={e => setDistance(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Время в Пути (только цифры)</Form.Label>
                        <Form.Control value={ETA} onChange={e => setETA(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=> sendRoute()} variant='success'>Отправить</Button>
                <Button onClick={props.handleClose} className="btn btn-dark">Отменить</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default ModalCreateNewRoute