'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusSquare, FaTrashAlt } from 'react-icons/fa'
import ModalCreateNewTimetable from './ModalCreateNewTimetable';
import ModalUpdateTimetable from './ModalUpdateTimetable';

function TableTimetable(props) {
    const router = useRouter();
    var iter = -1;
    var [TimetableObject, setTimetableObject] = useState(
      [
        {
          TimetableId:'',
          RouteId:'',
          CrewId:'',
          DepartTime:'',
          ArrivalDate:''
        }
      ]
    )

    var Timetable = props.data
    var Route = props.Route
    var Driver = props.Driver
    var Car = props.Car
    var Crew = props.Crew

    const [showCreate, setShowCreate] = useState(false);
    const handleCloseCreate = () => setShowCreate(false);
    const handleShowCreate = () => setShowCreate(true);

    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = (TimetableId, RouteId, CrewId, DepartTime, ArrivalDate) => {
      setTimetableObject([
            {
              TimetableId:TimetableId,
              RouteId:RouteId,
              CrewId:CrewId,
              DepartTime:DepartTime,
              ArrivalDate:ArrivalDate
            }
        ]);

      setShowUpdate(true);
    }

    function formEmit(RouteId, CrewId, DepartDate, ArrivalDate) {
      props.sendTimetable(RouteId, CrewId, DepartDate, ArrivalDate)
      handleCloseCreate()
      Timetable = props.data
      Route = props.Route
      Driver = props.Driver
      Car = props.Car
      Crew = props.Crew
      router.refresh()
    }

    function updateEmit(TimetableObject){
      props.updateTimetable(TimetableObject[0].TimetableId, TimetableObject)
      router.refresh()
  }

  function deleteTimetableFunc(TimetableId) {
    props.deleteTimetable(TimetableId)
    Timetable = []
    Timetable = props.data
    Route = []
    Driver = []
    Car = []
    Crew = []
    Route = props.Route
    Driver = props.Driver
    Car = props.Car
    Crew = props.Crew
    router.refresh()
  }


  return (
    <div>
        <Table striped bordered hover> 
          <thead className="table-dark">
            <tr>
              <th><p className='fs-6'>ID Расписания</p></th>
              <th><p className='fs-6'>ID Маршрута</p></th>
              <th><p className='fs-6'>Откуда</p></th>
              <th><p className='fs-6'>Куда</p></th>
              <th><p className='fs-6'>ID Экипажа</p></th>
              <th><p className='fs-6'>Имя Водителя</p></th>
              <th><p className='fs-6'>Номер автомобиля</p></th>
              <th><p className='fs-6'>Дата отправления</p></th>
              <th><p className='fs-6'>Дата приезда</p></th>
              <th>
                <Button onClick={()=>handleShowCreate()} variant="success" title="Добавить"><FaPlusSquare/></Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {
                Timetable.map ((timetable)=>{
                    iter++
                    return Route[iter].map ((route)=>{
                        return Driver[iter].map ((driver) => {
                            return Car[iter].map ((car) => {
                                return Crew[iter].map ((crew) =>{
                                    return <tr key={timetable.TimetableId}>
                                        <td className='fs-6'>{timetable.TimetableId}</td>
                                        <td className='fs-6'>{timetable.RouteId}</td>
                                        <td className='fs-6'>{route.From}</td>
                                        <td className='fs-6'>{route.To}</td>
                                        <td className='fs-6'>{crew.CrewId}</td>
                                        <td className='fs-6'>{driver.FullName}</td>
                                        <td className='fs-6'>{car.SerialPlate}</td>
                                        <td className='fs-6'>{(timetable.DepartDate== null)? "":timetable.DepartDate.toISOString().substring(0, 10)}</td>
                                        <td className='fs-6'>{(timetable.ArrivalDate== null)? "":timetable.ArrivalDate.toISOString().substring(0, 10)}</td>
                                        <td className='d-flex'>
                                            <Button onClick={()=> handleShowUpdate(timetable.TimetableId, timetable.RouteId, crew.CrewId, timetable.DepartDate, timetable.ArrivalDate)} size="sm" variant="warning" title="Редактировать"><FaPen/></Button>
                                            <Button onClick={()=> deleteTimetableFunc(timetable.TimetableId)} size="sm" variant="danger" title="Удалить"><FaTrashAlt/></Button>
                                        </td>
                                    </tr>
                                })
                            })
                        })
                    })
                })
            }
          </tbody>
        </Table>
        <ModalCreateNewTimetable show={showCreate} handleClose={handleCloseCreate} formEmit={formEmit}/>
        <ModalUpdateTimetable show={showUpdate} handleClose={handleCloseUpdate} TimetableObject={TimetableObject} recieve={updateEmit}/>
    </div>
  )
}

export default TableTimetable