'use client'

import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

function ModalUpdateCar(props) {
    const [Brand, setBrand] = useState('')
    const [Model, setModel] = useState('')
    const [CarAge, setCarAge] = useState('')
    const [Kilometrage, setKilometrage] = useState('')
    const [SerialPlate, setSerialPlate] = useState('')
    const [RegistrationRegion, setRegistrationRegion] = useState('')
    
    //console.log(props.carObject);

    var newCarObject = [
        {
            CarId: '',
            Brand: '',
            Model: '',
            CarAge: '',
            Kilometrage: '',
            SerialPlate: '',
            RegistrationRegion: ''
        }
    ]
    //console.log(newCarObject);

    if (props.carObject[0].Brand != undefined) {
        newCarObject = props.carObject
    } 

    function populateObject (){
        var CarIdd = newCarObject[0].CarId
        var Brandd = (Brand == '') ? newCarObject[0].Brand : Brand;
        var Modell = (Model == '') ? newCarObject[0].Model : Model;
        var CarAgee = (CarAge == '') ? newCarObject[0].CarAge : CarAge;
        var Kilometragee = (Kilometrage == '') ? newCarObject[0].Kilometrage : Kilometrage;
        var SerialPlatee = (SerialPlate == '') ? newCarObject[0].SerialPlate : SerialPlate;
        var RegistrationRegionn = (RegistrationRegion == '') ? newCarObject[0].RegistrationRegion : RegistrationRegion;
        
        const sendCarObject = [
            {
                CarId: CarIdd,
                Brand: Brandd,
                Model: Modell,
                CarAge: CarAgee,
                Kilometrage: Kilometragee,
                SerialPlate: SerialPlatee,
                RegistrationRegion: RegistrationRegionn
                
            }
        ]

        props.recieve(sendCarObject)
        props.handleClose()
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
                    <p>Изменить запись ID: {newCarObject[0].CarId}</p>
                </Modal.Title> 
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Введите Брэнд</Form.Label>
                        <Form.Control value={Brand} onChange={e => setBrand(e.target.value)} type='text' placeholder={props.carObject == []? ``:`${newCarObject[0].Brand}`} ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Модель</Form.Label>
                        <Form.Control value={Model} onChange={e => setModel(e.target.value)} type='text' placeholder={props.carObject == []? ``:`${newCarObject[0].Model}`} ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Возраст (только цифры)</Form.Label>
                        <Form.Control value={CarAge} onChange={e => setCarAge(e.target.value)} type='text' placeholder={props.carObject == []? ``:`${newCarObject[0].CarAge}`} ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Километраж (только цифры)</Form.Label>
                        <Form.Control value={Kilometrage} onChange={e => setKilometrage(e.target.value)} type='text' placeholder={props.carObject == []? ``:`${newCarObject[0].Kilometrage}`} ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Номер</Form.Label>
                        <Form.Control value={SerialPlate} onChange={e => setSerialPlate(e.target.value)} type='text' placeholder={props.carObject == []? ``:`${newCarObject[0].SerialPlate}`} ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Регион</Form.Label>
                        <Form.Control value={RegistrationRegion} onChange={e => setRegistrationRegion(e.target.value)} type='text' placeholder={props.carObject == []? ``:`${newCarObject[0].RegistrationRegion}`} ></Form.Control>
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

export default ModalUpdateCar