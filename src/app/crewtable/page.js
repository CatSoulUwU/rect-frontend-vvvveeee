import React from 'react'
import NavigationSidebar from '../components/NavigationSidebar'
import TableCrews from '../components/TableCrews'
import pool from '@/utils/postgres'
    

var Crews=[]
var Driver=[]
var Car=[]

const fetchCrews = async () => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM public."Crews" ORDER BY "CrewId" ASC ');
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

  const sendCrew = async (CarId, DriverId) => {
    'use server'
    try {
      const client = await pool.connect();
      const result = await client.query(
        `INSERT INTO public."Crews" (
        "CarId", "DriverId") 
        VALUES ('${CarId}'::integer, '${DriverId}'::integer)`)
      client.release();

      Crews=[]
      Car=[]
      Driver=[]

      await fetchCrews()
      .then (data => {Object.assign(Crews, data)})
      .catch(error => {console.error("Error fetching:", error)});
      
      for (let index = 0; index < Crews.length; index++) {
        Driver.push( await fetchDriver(Crews[index].DriverId))
        Car.push( await fetchCar(Crews[index].CarId))
      }

    } catch (error) {
      console.error(error)
    }
  }

  const deleteCrew = async (CrewId) => {
    'use server'
    try {
      const client = await pool.connect();
      const result = await client.query(`DELETE FROM public."Crews" WHERE "CrewId" IN (${CrewId});`)
      Crews=[]
      Car=[]
      Driver=[]
     
      
      await fetchCrews()
      .then (data => {Object.assign(Crews, data)})
      .catch(error => {console.error("Error fetching:", error)});
      
      for (let index = 0; index < Crews.length; index++) {
        Driver.push( await fetchDriver(Crews[index].DriverId))
        Car.push( await fetchCar(Crews[index].CarId))
      }

      client.release();
    } catch (error) {
      console.error(error)
    }
    }

    const updateCrew = async (CrewId, CrewChanges) => {
        'use server'
        try {
          const client = await pool.connect();
           const result = await client.query(
          `UPDATE public."Crews" SET
          "CarId" = '${CrewChanges[0].CarId}'::integer, "DriverId" = '${CrewChanges[0].DriverId}'::integer
          WHERE "CrewId" = ${CrewId};`)
    
          Crews=[] 
          Car=[]
          Driver=[]
    
          await fetchCrews()
          .then (data => {Object.assign(Crews, data)})
          .catch(error => {console.error("Error fetching:", error)});
          
          for (let index = 0; index < Crews.length; index++) {
            Driver.push( await fetchDriver(Crews[index].DriverId))
            Car.push( await fetchCar(Crews[index].CarId))
          }

          client.release();
    
        } catch (error) {
          console.error(error)
        }
      }


  await fetchCrews()
  .then (data => {Object.assign(Crews, data)})
  .catch(error => {console.error("Error fetching:", error)}); 

  for (let index = 0; index < Crews.length; index++) {
    Driver.push( await fetchDriver(Crews[index].DriverId))
    Car.push( await fetchCar(Crews[index].CarId))
    
  }

function page() {
  return (
    <div>
        <div className="d-flex flex-row">
            <NavigationSidebar showtoggle="/crewtable"/>
            <h2 className="mt-2">Экипажи</h2>
        </div>
        <div>
            <TableCrews data={Crews} Car={Car} Driver={Driver} sendCrew={sendCrew} deleteCrew={deleteCrew} updateCrew={updateCrew}/>
        </div>
    </div>
  )
}

export default page