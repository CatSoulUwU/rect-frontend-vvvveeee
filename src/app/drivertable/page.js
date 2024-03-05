import React from 'react'
import NavigationSidebar from '../components/NavigationSidebar'
import TableDrivers from '../components/TableDrivers'
import pool from '@/utils/postgres';

var Drivers = [];

    const fetchDrivers = async () => {
        try {
          const client = await pool.connect();
          const result = await client.query('SELECT * FROM public."Drivers" ORDER BY "DriverId" ASC ');
          const data = result.rows;
          //console.log("Fetched Data:", data)
          client.release();
          return data;
        } catch (error) {
          console.error("Error fetching:", error)
          throw error;
        }
      };

      const sendDriver = async (FullName, DriverAge, DriverExperience, PassportNumber, PhoneNumber) => {
        'use server'
        try {
          const client = await pool.connect();
          const result = await client.query(
            `INSERT INTO public."Drivers" (
            "FullName", "DriverAge", "DriverExperience", "PassportNumber", "PhoneNumber") 
            VALUES (
            '${FullName}'::text, '${DriverAge}'::integer, '${DriverExperience}'::integer, 
            '${PassportNumber}'::text, '${PhoneNumber}'::text)`)
          client.release();
    
          await fetchDrivers()
            .then (data => {      
              Object.assign(Drivers, data)
              //console.log("DriversSend:", Drivers)
            })
            .catch(error => {
              console.error("Error fetching:", error)
          });
    
        } catch (error) {
          console.error(error)
        }
      }

      const deleteDriver = async (DriverId) => {
        'use server'
        try {
          const client = await pool.connect();
          const result = await client.query(`DELETE FROM public."Drivers" WHERE "DriverId" IN (${DriverId});`)
          Drivers=[]
          
          await fetchDrivers()
            .then (data => {          
              Object.assign(Drivers, data)
              //console.log("DriversDelete:", Drivers)
            })
            .catch(error => {
              console.error("Error fetching:", error)
          });
    
          client.release();
        } catch (error) {
          console.error(error)
        }
    
      }

      const updateDriver = async (DriverId, DriverChanges) => {
        'use server'
    
        console.log("UpdateDriver:", DriverChanges[0])
        try {
          const client = await pool.connect();
           const result = await client.query(
          `UPDATE public."Drivers" SET
          "FullName" = '${DriverChanges[0].FullName}'::text, "DriverAge" = '${DriverChanges[0].DriverAge}'::integer, 
          "DriverExperience" = '${DriverChanges[0].DriverExperience}'::integer, "PassportNumber" = '${DriverChanges[0].PassportNumber}'::text, 
          "PhoneNumber" = '${DriverChanges[0].PhoneNumber}'::text 
          WHERE "DriverId" = ${DriverId};`)
    
          Drivers=[]
    
          await fetchDrivers()
            .then (data => {          
              Object.assign(Drivers, data)
              //console.log("DriversDelete:", Drivers)
            })
            .catch(error => {
              console.error("Error fetching:", error)
          });
          client.release();
    
        } catch (error) {
          console.error(error)
        }
      }

        await fetchDrivers()
        .then (data => {      
        //console.log("Recieved data:", data)

        Object.assign(Drivers, data)
        })
        .catch(error => {
        console.error("Error fetching:", error)
        }); 


function page() {
  return (
    <div>
        <div className="d-flex flex-row">
            <NavigationSidebar showtoggle="/drivertable"/>
            <h2 className="mt-2">Водители</h2>
        </div>
        <div>
            <TableDrivers data={Drivers} sendDriver={sendDriver} deleteDriver={deleteDriver} updateDriver={updateDriver}/>
        </div>
    </div>
  )
}

export default page