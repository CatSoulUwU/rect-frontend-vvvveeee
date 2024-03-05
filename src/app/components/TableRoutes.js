'use client'

import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusSquare, FaTrashAlt } from 'react-icons/fa'
import ModalCreateNewRoute from './ModalCreateNewRoute'
import { useRouter } from 'next/navigation'
import ModalUpdateRoute from './ModalUpdateRoute'

function TableRoutes(props) {
    var Routes = props.data
    const router = useRouter();

    var [routeObject, setrouteObject] = useState([
        {
            RouteId: '', 
            From: '', 
            To: '', 
            Distance: '', 
            ETA: ''
        }
    ])

    const [showCreate, setShowCreate] = useState(false);
    const handleCloseCreate = () => setShowCreate(false);
    const handleShowCreate = () => setShowCreate(true);

    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = (RouteId, From, To, Distance, ETA) => {
      setrouteObject([
            {
                RouteId: RouteId, 
                From: From, 
                To: To, 
                Distance: Distance, 
                ETA: ETA

            }
        ]);
      setShowUpdate(true);
    }

    function formEmit(From, To, Distance, ETA) {
        props.sendRoute(From, To, Distance, ETA)
        handleCloseCreate()
        Routes=props.data
        router.refresh()
    }

    function updateEmit(routeObject){
        props.updateRoute(routeObject[0].RouteId, routeObject)
        router.refresh()
    }

    function deleteRouteFunc(RouteId) {
        props.deleteRoute(RouteId)
        Routes = []
        Routes = props.data
        router.refresh()
    }


  return (
    <div>
        <Table striped bordered hover> 
          <thead className="table-dark">
            <tr>
              <th><p>ID</p></th>
              <th><p>Откуда</p></th>
              <th><p>Куда</p></th>
              <th><p>Расстояние</p></th>
              <th><p>Время в пути</p></th>
              <th>
                <Button onClick={()=> handleShowCreate()} variant="success" title="Добавить"><FaPlusSquare/></Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {
               Routes.map ((route) => {
                return <tr key={route.RouteId}>
                    <td>{route.RouteId}</td>
                    <td>{route.From}</td>
                    <td>{route.To} </td>
                    <td>{route.Distance} км</td>
                    <td>{route.ETA} часов</td>
                    <td className='d-flex'>
                        <Button onClick={() => handleShowUpdate(route.RouteId, route.From, route.To, route.Distance, route.ETA)} size="sm" variant="warning" title="Редактировать"><FaPen/></Button>
                        <Button onClick={()=> deleteRouteFunc(route.RouteId)} size="sm" variant="danger" title="Удалить"><FaTrashAlt/></Button>
                    </td>
                </tr>
               })
            }
          </tbody>
        </Table>
        <ModalCreateNewRoute show={showCreate} handleClose={handleCloseCreate} formEmit={formEmit}/>
        <ModalUpdateRoute show={showUpdate} handleClose={handleCloseUpdate} routeObject={routeObject} recieve={updateEmit}/>
    </div>
  )
}

export default TableRoutes