"use client"; // This is a client component 👈🏽

import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusSquare, FaTrashAlt } from 'react-icons/fa'
import ModalCreateNewCar from './ModalCreateNewCar';
import { useRouter } from 'next/navigation';
import ModalUpdateCar from './ModalUpdateCar';



function TableCars(props) {
    var Cars = props.data;

    var [CarObject, setCarObject] = useState([{
      CarId: '',
      Brand: '',
      Model: '',
      CarAge: '',
      Kilometrage: '',
      SerialPlate: '',
      RegistrationRegion: ''
    }
      
    ]);
    //var CarObject = [];

    const router = useRouter();

    const [showCreate, setShowCreate] = useState(false);
    const handleCloseCreate = () => setShowCreate(false);
    const handleShowCreate = () => setShowCreate(true);

    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = (CarId, Brand, Model, CarAge, Kilometrage, SerialPlate, RegistrationRegion) => {
      setCarObject([
            {
                CarId: CarId,
                Brand: Brand,
                Model: Model,
                CarAge: CarAge,
                Kilometrage: Kilometrage,
                SerialPlate: SerialPlate,
                RegistrationRegion: RegistrationRegion

            }])
        ;
        //console.log(CarObject);
        //console.log("CarObject from TableCars!!!");
      setShowUpdate(true);
    }


    function formEmit(Brand, Model, CarAge, Kilometrage, SerialPlate, RegistrationRegion) {
        props.sendCars(Brand, Model, CarAge, Kilometrage, SerialPlate, RegistrationRegion)
        handleCloseCreate()
        Cars=props.data
      router.refresh()
    }

    function updateEmit(CarObject){
      props.updateCar(CarObject[0].CarId, CarObject)
      router.refresh()
    }

    async function deleteCarfunc(CarId) {
      Cars=props.data
      await props.deleteCar(CarId);
      //console.log("WAHTEVER!!!");
      //console.log(Cars);
      router.refresh()
    }

  return (
    <div>
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th><p className='pb-2'>ID</p></th>
              <th><p>Брэнд Автомобиля</p></th>
              <th><p>Модель Автомобиля</p></th>
              <th><p>Возраст автомобиля</p></th>
              <th><p className='pb-2'>Километраж</p></th>
              <th><p>Номер Автомобиля</p></th>
              <th><p>Регион Регистрации</p></th>
              <th>
                <Button onClick={handleShowCreate} variant="success" title="Добавить"><FaPlusSquare/></Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              Cars.map((car) => {
                return <tr key={car.CarId}>
                  <td>{car.CarId}</td>
                  <td>{car.Brand}</td>
                  <td>{car.Model}</td>
                  <td>{car.CarAge} лет</td>
                  <td>{car.Kilometrage} км</td>
                  <td>{car.SerialPlate}</td>
                  <td>{car.RegistrationRegion}</td>
                  <td className="d-flex">
                    <Button onClick={() => handleShowUpdate(car.CarId, car.Brand, car.Model, car.CarAge, car.Kilometrage, car.SerialPlate, car.RegistrationRegion)} size="sm" variant="warning" title="Редактировать"><FaPen/></Button>
                    <Button onClick={() => deleteCarfunc(car.CarId)} size="sm" variant="danger" title="Удалить"><FaTrashAlt/></Button>
                  </td>
                </tr>
                
              })
            }
          </tbody>
        </Table>
        <ModalCreateNewCar show={showCreate} handleClose={handleCloseCreate} recieve={formEmit}/>
        <ModalUpdateCar carObject={CarObject} show={showUpdate} handleClose={handleCloseUpdate} recieve={updateEmit}/>
    </div>
  )
}

export default TableCars