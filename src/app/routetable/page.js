import React from 'react'
import NavigationSidebar from '../components/NavigationSidebar'
import TableRoutes from '../components/TableRoutes'
import pool from '@/utils/postgres';

    var Routes = [];

    const fetchRoutes = async () => {
        try {
          const client = await pool.connect();
          const result = await client.query('SELECT * FROM public."Routes" ORDER BY "RouteId" ASC ');
          const data = result.rows;
          //console.log("Fetched Data:", data)
          client.release();
          return data;
        } catch (error) {
          console.error("Error fetching:", error)
          throw error;
        }
      };

      const sendRoute = async (From, To, Distance, ETA) => {
        'use server'
        try {
          const client = await pool.connect();
          const result = await client.query(
            `INSERT INTO public."Routes" (
            "From", "To", "Distance", "ETA") 
            VALUES ('${From}'::text, '${To}'::text, 
            '${Distance}'::integer, '${ETA}'::integer)`)
          client.release();
    
          await fetchRoutes()
          .then (data => {      
          //console.log("Recieved data:", data)
  
          Object.assign(Routes, data)
          })
          .catch(error => {
          console.error("Error fetching:", error)
          }); 
    
        } catch (error) {
          console.error(error)
        }
      }

      const deleteRoute = async (RouteId) => {
        'use server'
        try {
          const client = await pool.connect();
          const result = await client.query(`DELETE FROM public."Routes" WHERE "RouteId" IN (${RouteId});`)
          Routes=[]
          
          await fetchRoutes()
          .then (data => {      
          //console.log("Recieved data:", data)
  
          Object.assign(Routes, data)
          })
          .catch(error => {
          console.error("Error fetching:", error)
          }); 

          client.release();
        } catch (error) {
          console.error(error)
        }
    
      }

      const updateRoute = async (RouteId, RouteChanges) => {
        'use server'
        try {
          const client = await pool.connect();
           const result = await client.query(
          `UPDATE public."Routes" SET
          "From" = '${RouteChanges[0].From}'::text, "To" = '${RouteChanges[0].To}'::text, 
          "Distance" = '${RouteChanges[0].Distance}'::integer, "ETA" = '${RouteChanges[0].ETA}'::integer
          WHERE "RouteId" = ${RouteId};`)
    
          Routes=[]
    
          await fetchRoutes()
          .then (data => {Object.assign(Routes, data)})
          .catch(error => {console.error("Error fetching:", error)}); 
          client.release();
    
        } catch (error) {
          console.error(error)
        }
      }


      await fetchRoutes()
        .then (data => {      
        //console.log("Recieved data:", data)

        Object.assign(Routes, data)
        })
        .catch(error => {
        console.error("Error fetching:", error)
        }); 

function page() {
  return (
    <div>
        <div className="d-flex flex-row">
            <NavigationSidebar showtoggle="/routetable"/>
            <h2 className="mt-2">Маршруты</h2>
        </div>
        <div>
            <TableRoutes updateRoute={updateRoute} deleteRoute={deleteRoute} sendRoute={sendRoute} data={Routes}/>
        </div>
    </div>
  )
}

export default page