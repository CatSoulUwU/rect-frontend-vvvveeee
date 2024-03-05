import NavigationSidebar from "../components/NavigationSidebar";
import pool from"../../utils/postgres.js";
import TableCars from "../components/TableCars";

  var Cars = [];

  const fetchCars = async () => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM public."Cars" ORDER BY "CarId" ASC ');
      const data = result.rows;
      //console.log("Fetched Data:", data)
      client.release();
      return data;
    } catch (error) {
      console.error("Error fetching:", error)
      throw error;
    }
  };

  const sendCar = async (Brand, Model, CarAge, Kilometrage, SerialPlate, RegistrationRegion) => {
    'use server'
    try {
      const client = await pool.connect();
      const result = await client.query(`INSERT INTO public."Cars" (
        "Brand", "Model", "CarAge", "Kilometrage", "SerialPlate", "RegistrationRegion") VALUES (
        '${Brand}'::text, '${Model}'::text, '${CarAge}'::integer, '${Kilometrage}'::integer, '${SerialPlate}'::text, '${RegistrationRegion}'::text)`)
      client.release();

      await fetchCars()
        .then (data => {      
      //console.log("Recieved data:", data)

          Object.assign(Cars, data)
          console.log("CarsSend:", Cars)
        })
        .catch(error => {
          console.error("Error fetching:", error)
      });

    } catch (error) {
      console.error(error)
    }
  }

  const deleteCar = async (CarId) => {
    'use server'
    try {
      const client = await pool.connect();
      const result = await client.query(`DELETE FROM public."Cars" WHERE "CarId" IN (${CarId});`)
      Cars=[]
      
      await fetchCars()
        .then (data => {      
      //console.log("Recieved data:", data)

          Object.assign(Cars, data)
          console.log("CarsDelete:", Cars)
        })
        .catch(error => {
          console.error("Error fetching:", error)
      });
      client.release();
    } catch (error) {
      console.error(error)
    }

  }

  const updateCar = async (CarId, CarChanges) => {
    'use server'

    /* const Brand = `"Brand" = '${CarChanges[0].Brand}'::text,`;
    const Model = `"Model" = '${CarChanges[0].Model}'::text,`;
    const CarAge = `"CarAge" = '${CarChanges[0].CarAge}'::integer`
    const Kilometrage = `"Kilometrage" = '${CarChanges[0].Kilometrage}'::integer,`;
    const SerialPlate = `"SerialPlate" = '${CarChanges[0].SerialPlate}'::,`;
    const RegistrationRegion = `"RegistrationRegion" = '${CarChanges[0].RegistrationRegion}'::text` */

    console.log("UpdateCar:", CarChanges[0])
    try {
      const client = await pool.connect();
       const result = await client.query(
      `UPDATE public."Cars" SET
      "Brand" = '${CarChanges[0].Brand}'::text, "Model" = '${CarChanges[0].Model}'::text, 
      "CarAge" = '${CarChanges[0].CarAge}'::integer, "Kilometrage" = '${CarChanges[0].Kilometrage}'::integer, 
      "SerialPlate" = '${CarChanges[0].SerialPlate}'::text, "RegistrationRegion" = '${CarChanges[0].RegistrationRegion}'::text 
      WHERE "CarId" = ${CarId};`)

      Cars=[]

      await fetchCars()
        .then (data => {      
          Object.assign(Cars, data)
          console.log("CarsDelete:", Cars)
        })
        .catch(error => {
          console.error("Error fetching:", error)
      });
      client.release();

    } catch (error) {
      console.error(error)
    }
  }
  
  await fetchCars()
    .then (data => {      
      //console.log("Recieved data:", data)

      Object.assign(Cars, data)
    })
    .catch(error => {
      console.error("Error fetching:", error)
    }); 

    //console.log("Cars:", Cars)

function page() {
  return (
    <div>
      <div className="d-flex flex-row">
        <NavigationSidebar showtoggle="/cartable"/>
        <h2 className="mt-2">Машины</h2>
      </div>
      <div>
        <TableCars updateCar={updateCar} deleteCar={deleteCar} sendCars={sendCar} data={Cars}/>
      </div>

    </div>
  )
}

export default page;