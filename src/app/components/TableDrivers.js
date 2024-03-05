"use client"

import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusSquare, FaTrashAlt } from 'react-icons/fa'
import ModalCreateNewDriver from './ModalCreateNewDriver';
import { useRouter } from 'next/navigation';
import ModalUpdateDriver from './ModalUpdateDriver';

function TableDrivers(props) {
    var Drivers = props.data
    const router = useRouter();

    var [driverObject, setdriverObject] = useState([
        {
            DriverId: '',
            FullName: '', 
            DriverAge: '', 
            DriverExperience: '', 
            PassportNumber: '', 
            PhoneNumber: ''
        }
    ])

    const [showCreate, setShowCreate] = useState(false);
    const handleCloseCreate = () => setShowCreate(false);
    const handleShowCreate = () => setShowCreate(true);

    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = (DriverId, FullName, DriverAge, DriverExperience, PassportNumber, PhoneNumber) => {
      setdriverObject([
            {
                DriverId: DriverId, 
                FullName: FullName, 
                DriverAge: DriverAge, 
                DriverExperience: DriverExperience, 
                PassportNumber: PassportNumber, 
                PhoneNumber: PhoneNumber

            }
        ]);
      setShowUpdate(true);
    }


    function formEmit(FullName, DriverAge, DriverExperience, PassportNumber, PhoneNumber) {
        props.sendDriver(FullName, DriverAge, DriverExperience, PassportNumber, PhoneNumber)
        handleCloseCreate()
        Drivers=props.data
        router.refresh()
    }

    function updateEmit(driverObject){
        props.updateDriver(driverObject[0].DriverId, driverObject)
        router.refresh()
      }

    function deleteDriverFunc (DriverId){
        props.deleteDriver(DriverId)
        Drivers = []
        Drivers=props.data
        router.refresh()
    }

  return (
    <div>
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th><p>ID</p></th>
              <th><p>Имя Отчество</p></th>
              <th><p>Возраст</p></th>
              <th><p>Опыт Работы</p></th>
              <th><p>Номер Паспорта</p></th>
              <th><p>Номер Телефона</p></th>
              <th>
                <Button onClick={() => handleShowCreate()} variant="success" title="Добавить"><FaPlusSquare/></Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {
               Drivers.map ((driver) => {
                return <tr key={driver.DriverId}>
                    <td>{driver.DriverId}</td>
                    <td>{driver.FullName}</td>
                    <td>{driver.DriverAge} лет</td>
                    <td>{driver.DriverExperience} лет</td>
                    <td>{driver.PassportNumber}</td>
                    <td>{driver.PhoneNumber}</td>
                    <td className='d-flex'>
                        <Button onClick={() => handleShowUpdate(driver.DriverId, driver.FullName, driver.DriverAge, driver.DriverExperience, driver.PassportNumber, driver.PhoneNumber)} size="sm" variant="warning" title="Редактировать"><FaPen/></Button>
                        <Button onClick={() => deleteDriverFunc(driver.DriverId)} size="sm" variant="danger" title="Удалить"><FaTrashAlt/></Button>
                    </td>
                </tr>
               })
            }
          </tbody>
        </Table>
        <ModalCreateNewDriver show={showCreate} handleClose={handleCloseCreate} formEmit={formEmit}/>
        <ModalUpdateDriver show={showUpdate} handleClose={handleCloseUpdate} driverObject={driverObject} recieve={updateEmit}/>
    </div>
  )
}

export default TableDrivers