'use client'

import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusSquare, FaTrashAlt } from 'react-icons/fa'
import ModalCreateNewCrew from './ModalCreateNewCrew'
import { useRouter } from 'next/navigation'
import ModalUpdateCrews from './ModalUpdateCrews'

function TableCrews (props) {
    const router = useRouter();
    var iter = -1
    var Crews= props.data

    var [CrewObject, SetCrewObject] = useState([
        {
           CrewId:'',
           CarId:'',
           DriverId:'' 
        }
    ])

    var Driver= props.Driver
    var Car= props.Car

    const [showCreate, setShowCreate] = useState(false);
    const handleCloseCreate = () => setShowCreate(false);
    const handleShowCreate = () => setShowCreate(true);

    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = (CrewId, CarId, DriverId) => {
      SetCrewObject([
            {
            CrewId:CrewId,
            CarId:CarId,
            DriverId:DriverId 
            }
        ]);
      setShowUpdate(true);
    }


    function formEmit(CarId, DriverId) {
        props.sendCrew(CarId, DriverId)
        handleCloseCreate()
        Crews=props.data
        router.refresh()
    }

    function deleteCrewFunc(CrewId) {
        props.deleteCrew(CrewId)        
        Crews = []
        Crews = props.data
        router.refresh()
    }

    function updateEmit(crewObject){
        props.updateCrew(crewObject[0].CrewId, crewObject)
        
        Crews = []        
        Crews = props.data
        Driver=[]        
        Driver= props.Driver
        Car=[]      
        Car= props.Car
        router.refresh()
    }
    
  return (
    <div>
        <Table striped bordered hover> 
          <thead className="table-dark">
            <tr>
              <th><p>ID экипажа</p></th>
              <th><p>ID автомобиля</p></th>
              <th><p>Брэнд автомобиля</p></th>
              <th><p>Номер автомобиля</p></th>
              <th><p>ID водителя</p></th>
              <th><p>Имя Водителя</p></th>
              <th><p>Номер Телефона Водителя</p></th>
              <th>
                <Button onClick={()=> handleShowCreate()} variant="success" title="Добавить"><FaPlusSquare/></Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {
               Crews.map ((crew) => {
                iter++
                return Car[iter].map((Car) => {
                    return Driver[iter].map((Driver) => {
                        return <tr key={crew.CrewId}>
                        <td>{crew.CrewId}</td>
                        <td>{crew.CarId}</td>
                        <td>{Car.Brand}</td>
                        <td>{Car.SerialPlate}</td>
                        <td>{crew.DriverId}</td>
                        <td>{Driver.FullName}</td>
                        <td>{Driver.PhoneNumber}</td>
                        <td className='d-flex'>
                            <Button onClick={()=>handleShowUpdate(crew.CrewId, crew.CarId, crew.DriverId)} size="sm" variant="warning" title="Редактировать"><FaPen/></Button>
                            <Button onClick={()=>deleteCrewFunc(crew.CrewId)} size="sm" variant="danger" title="Удалить"><FaTrashAlt/></Button>
                        </td>
                    </tr>
                    })
                    
               })
            })
            }               
          </tbody>
        </Table>
        <ModalCreateNewCrew show={showCreate} handleClose={handleCloseCreate} formEmit={formEmit}/>
        <ModalUpdateCrews show={showUpdate} handleClose={handleCloseUpdate} CrewObject={CrewObject} recieve={updateEmit}/>
    </div>
  )
}

export default TableCrews