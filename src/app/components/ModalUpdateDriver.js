'use client'
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

function ModalUpdateDriver(props) {
    const [FullName, setFullName] = useState('')
    const [DriverAge, setDriverAge] = useState('')
    const [DriverExperience, setDriverExperience] = useState('')
    const [PassportNumber, setPassportNumber] = useState('')
    const [PhoneNumber, setPhoneNumber] = useState('')

    var newDriverObject = [
        {
            DriverId: '',
            FullName: '',
            DriverAge: '',
            DriverExperience: '',
            PassportNumber: '',
            PhoneNumber: ''
        }
    ]
    
    if (props.driverObject[0].FullName != undefined) {
        newDriverObject = props.driverObject
    }

    function populateObject (){
        var DriverIdd = newDriverObject[0].DriverId
        var FullNamee = (FullName == '') ? newDriverObject[0].FullName : FullName;
        var DriverAgee = (DriverAge == '') ? newDriverObject[0].DriverAge : DriverAge;
        var DriverExperiencee = (DriverExperience == '') ? newDriverObject[0].DriverExperience : DriverExperience;
        var PassportNumberr = (PassportNumber == '') ? newDriverObject[0].PassportNumber : PassportNumber;
        var PhoneNumberr = (PhoneNumber == '') ? newDriverObject[0].PhoneNumber : PhoneNumber;

        const sendDriverObject = [
            {
                DriverId: DriverIdd,
                FullName: FullNamee,
                DriverAge: DriverAgee,
                DriverExperience: DriverExperiencee,
                PassportNumber: PassportNumberr,
                PhoneNumber:  PhoneNumberr
            }
        ]

        props.recieve(sendDriverObject)
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
                    <p>Изменить запись ID: {newDriverObject[0].DriverId}</p>
                </Modal.Title> 
            </Modal.Header>
            <Modal.Body>
            <Form>
                    <Form.Group>
                        <Form.Label>Введите Имя Отчество</Form.Label>
                        <Form.Control placeholder={props.driverObject == []? ``:`${newDriverObject[0].FullName}`} value={FullName} onChange={e => setFullName(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Возраст (только цифры)</Form.Label>
                        <Form.Control placeholder={props.driverObject == []? ``:`${newDriverObject[0].DriverAge}`} value={DriverAge} onChange={e => setDriverAge(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Опыт Работы (только цифры)</Form.Label>
                        <Form.Control placeholder={props.driverObject == []? ``:`${newDriverObject[0].DriverExperience}`} value={DriverExperience} onChange={e => setDriverExperience(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Номер Паспорта (в форме хххх-хххххх)</Form.Label>
                        <Form.Control placeholder={props.driverObject == []? ``:`${newDriverObject[0].PassportNumber}`} value={PassportNumber} onChange={e => setPassportNumber(e.target.value)} type='text' ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите Номер Телефона</Form.Label>
                        <Form.Control placeholder={props.driverObject == []? ``:`${newDriverObject[0].PhoneNumber}`} value={PhoneNumber} onChange={e => setPhoneNumber(e.target.value)} type='text' ></Form.Control>
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

export default ModalUpdateDriver