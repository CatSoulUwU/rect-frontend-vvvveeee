'use client'

import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

function ModalUpdateRoute(props) {
    const [From, setFrom] = useState('')
    const [To, setTo] = useState('')
    const [Distance, setDistance] = useState('')
    const [ETA, setETA] = useState('')

    var newRouteObject = [
        {
            RouteId: '', 
            From: '', 
            To: '', 
            Distance: '', 
            ETA: ''
        }
    ]

    if (props.routeObject[0].From != undefined) {
        newRouteObject = props.routeObject
    }

    function populateObject (){
        var RouteIdd = newRouteObject[0].RouteId
        var Fromm = (From == '')? newRouteObject[0].From : From;
        var Too = (To == '')? newRouteObject[0].To : To;
        var Distancee = (Distance == '')? newRouteObject[0].Distance : Distance;
        var ETAA = (ETA == '')? newRouteObject[0].ETA : ETA;

        const sendRouteObject = [
            {
                RouteId: RouteIdd, 
                From: Fromm, 
                To: Too, 
                Distance: Distancee, 
                ETA: ETAA
            }
        ]

        props.recieve(sendRouteObject)
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
                    <p>Изменить Запись ID: {newRouteObject[0].RouteId}</p>
                </Modal.Title> 
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Введите Откуда</Form.Label>
                        <Form.Control placeholder={props.routeObject == []? ``:`${newRouteObject[0].From}`} value={From} onChange={e => setFrom(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Куда </Form.Label>
                        <Form.Control placeholder={props.routeObject == []? ``:`${newRouteObject[0].To}`} value={To} onChange={e => setTo(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Расстояние (только цифры)</Form.Label>
                        <Form.Control placeholder={props.routeObject == []? ``:`${newRouteObject[0].Distance}`} value={Distance} onChange={e => setDistance(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Время в Пути (только цифры)</Form.Label>
                        <Form.Control placeholder={props.routeObject == []? ``:`${newRouteObject[0].ETA}`} value={ETA} onChange={e => setETA(e.target.value)} type='text' ></Form.Control>
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

export default ModalUpdateRoute