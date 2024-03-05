"use client"; // This is a client component 👈🏽

import { Button, Nav, Offcanvas, Spinner, Stack } from 'react-bootstrap'
import { FaBars, FaCar, FaList, FaLocationArrow, FaMale, FaObjectUngroup } from "react-icons/fa";
import React, { useState } from 'react'

function NavigationSidebar(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 

  return (
    <div>
      <Button type="button" variant="light" onClick={()=> handleShow()}><FaBars/></Button>

      <Offcanvas show={show} onHide={()=>handleClose()}>
        <Offcanvas.Header closeButton><h3>Таблицы</h3></Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column" variant="pills" defaultActiveKey={props.showtoggle}>
            <Nav.Item onClick={()=>handleClose()}>
              <Nav.Link href="/timetable">
                <Stack className="d-flex align-items-baseline" direction="horizontal" gap={1}>
                  <FaList className='pt-1'/>
                  <p>РАСПИСАНИЕ</p>
                </Stack>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={()=>handleClose()}>
              <Nav.Link href="/routetable">
              <Stack className="d-flex align-items-baseline" direction="horizontal" gap={1}>
                <FaLocationArrow className='pt-1'/>
                <p>МАРШРУТЫ</p> </Stack>
              </Nav.Link>
            </Nav.Item> 
            <Nav.Item onClick={()=>handleClose()}>
              <Nav.Link href="/crewtable">
              <Stack className="d-flex align-items-baseline" direction="horizontal" gap={1}>
                <FaObjectUngroup className='pt-1'/>
                <p>ЭКИПАЖИ</p> </Stack>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={()=>handleClose()}>
              <Nav.Link href="/cartable">
              <Stack className="d-flex align-items-baseline" direction="horizontal" gap={1}>
                <FaCar className='pt-1'/>
                <p>МАШИНЫ</p> </Stack>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={()=>handleClose()}>
              <Nav.Link href="/drivertable">
              <Stack className="d-flex align-items-baseline" direction="horizontal" gap={1}>
                <FaMale className='pt-1'/>
                <p>ВОДИТЕЛИ</p> </Stack>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default NavigationSidebar