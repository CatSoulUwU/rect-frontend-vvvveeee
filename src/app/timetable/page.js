import React from 'react'
import NavigationSidebar from '../components/NavigationSidebar'
import TableTimetable from '../components/TableTimetable'
import pool from '@/utils/postgres'

var Timetable = []
var Crew = []
var Route=[]
var Driver=[]
var Car=[]

const fetchTimetables = async () => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM public."Timetable" ORDER BY "TimetableId" ASC ');
      const data = result.rows;
      client.release();
      return data;
    } catch (error) {
      console.error("Error fetching:", error)
      throw error;
    }
  };

  const fetchRoute = async (RouteId) => {
    'use server'
    try {
      const client = await pool.connect();
      const result = await client.query(`SELECT * FROM public."Routes" WHERE "RouteId" IN (${RouteId})`);
      const data = result.rows;
        
      client.release();
      return data;
    } catch (error) {
      console.error("Error fetching:", error)
      throw error;
    }
  };

  const fetchCrew = async (CrewId) => {
    'use server'
    try {
      const client = await pool.connect();
      const result = await client.query(`SELECT * FROM public."Crews" WHERE "CrewId" IN (${CrewId})`);
      const data = result.rows;
      client.release();
      return data;
    } catch (error) {
      console.error("Error fetching:", error)
      throw error;
    }
  };

  const fetchDriver = async (DriverId) => {
    'use server'
    try {
      const client = await pool.connect();
      const result = await client.query(`SELECT * FROM public."Drivers" WHERE "DriverId" IN (${DriverId})`);
      const data = result.rows;

      client.release();
      return data;
    } catch (error) {
      console.error("Error fetching:", error)
      throw error;
    }
  };

  const fetchCar = async (CarId) => {
    'use server'
    try {
      const client = await pool.connect();
      const result = await client.query(`SELECT * FROM public."Cars" WHERE "CarId" IN (${CarId})`);
      const data = result.rows;
        

      client.release();
      return data;
    } catch (error) {
      console.error("Error fetching:", error)
      throw error;
    }
  };

  const sendTimetable = async (RouteId, CrewId, DepartDate, ArrivalDate) => {
    'use server'
    try {
      var stringDepartDate = `'${DepartDate}'`
      var stringArrivalDate = `'${ArrivalDate}'`
      const client = await pool.connect();
      const result = await client.query(
        `INSERT INTO public."Timetable" (
        "RouteId", "CrewId", "DepartDate", "ArrivalDate") 
        VALUES ('${RouteId}'::integer, '${CrewId}'::integer, 
        ${(DepartDate==null)? null : stringDepartDate}::date, ${(ArrivalDate==null)? null : stringArrivalDate}::date)`)
      client.release();
      

      await fetchTimetables()
      .then (data => {Object.assign(Timetable, data) })
      .catch(error => {console.error("Error fetching:", error)}); 

      Crew=[]
      Route=[]
      Driver=[]
      Car=[]
      for (let index = 0; index < Timetable.length; index++) {
        Crew.push( await fetchCrew(Timetable[index].CrewId))
        Route.push( await fetchRoute(Timetable[index].RouteId))
      } 

      for (let index = 0; index < Crew.length; index++) {
        Driver.push( await fetchDriver(Crew[index][0].DriverId))
        Car.push( await fetchCar(Crew[index][0].CarId)) 
      }

    } catch (error) {
      console.error(error)
    }
  }

  const updateTimetable = async (TimetableId, TimetableChanges) => {
    'use server'
    try {
      var stringDepartDate = `'${TimetableChanges[0].DepartDate}'`
      var stringArrivalDate = `'${TimetableChanges[0].ArrivalDate}'`
      const client = await pool.connect();
      const result = await client.query(
      `UPDATE public."Timetable" SET
      "RouteId" = '${TimetableChanges[0].RouteId}'::integer, "CrewId" = '${TimetableChanges[0].CrewId}'::integer, 
      "DepartDate" = ${(TimetableChanges[0].DepartDate==null)? null : stringDepartDate}::date, 
      "ArrivalDate" = ${(TimetableChanges[0].ArrivalDate==null)? null : stringArrivalDate}::date
      WHERE "TimetableId" = ${TimetableId};`)

      Timetable=[]
      
      await fetchTimetables()
      .then (data => {Object.assign(Timetable, data)})
      .catch(error => {console.error("Error fetching:", error)}); 

      Crew=[]
      Route=[]
      Driver=[]
      Car=[]
      for (let index = 0; index < Timetable.length; index++) {
        Crew.push( await fetchCrew(Timetable[index].CrewId))
        Route.push( await fetchRoute(Timetable[index].RouteId))
      } 

      for (let index = 0; index < Crew.length; index++) {
        Driver.push( await fetchDriver(Crew[index][0].DriverId))
        Car.push( await fetchCar(Crew[index][0].CarId)) 
      }
      client.release();

    } catch (error) {
      console.error(error)
    }
  }

  const deleteTimetable = async (TimetableId) => {
    'use server'
    try {
      const client = await pool.connect();
      const result = await client.query(`DELETE FROM public."Timetable" WHERE "TimetableId" IN (${TimetableId});`)
      Timetable=[]
      
      await fetchTimetables()
      .then (data => {Object.assign(Timetable, data)})
      .catch(error => {console.error("Error fetching:", error)}); 
      client.release();

      Crew=[]
      Route=[]
      Driver=[]
      Car=[]
      for (let index = 0; index < Timetable.length; index++) {
        Crew.push( await fetchCrew(Timetable[index].CrewId))
        Route.push( await fetchRoute(Timetable[index].RouteId))
      } 

      for (let index = 0; index < Crew.length; index++) {
        Driver.push( await fetchDriver(Crew[index][0].DriverId))
        Car.push( await fetchCar(Crew[index][0].CarId)) 
      }
      
    } catch (error) {
      console.error(error)
    }

  }


  await fetchTimetables()
  .then (data => {Object.assign(Timetable, data)})
  .catch(error => {console.error("Error fetching:", error)}); 

  for (let index = 0; index < Timetable.length; index++) {
    Crew.push( await fetchCrew(Timetable[index].CrewId))
    Route.push( await fetchRoute(Timetable[index].RouteId))
  } 

  for (let index = 0; index < Crew.length; index++) {
    Driver.push( await fetchDriver(Crew[index][0].DriverId))
    Car.push( await fetchCar(Crew[index][0].CarId)) 
  }


function page() {
  return (
    <div>
        <div className="d-flex flex-row">
            <NavigationSidebar showtoggle="/timetable"/>
            <h2 className="mt-2">Расписание</h2>
        </div>
        <div>
            <TableTimetable updateTimetable={updateTimetable} deleteTimetable={deleteTimetable} sendTimetable={sendTimetable} data={Timetable} Crew={Crew} Route={Route} Driver={Driver} Car={Car}/>
        </div>
    </div>
  )
}

export default page