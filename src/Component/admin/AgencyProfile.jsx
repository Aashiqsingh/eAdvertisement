import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const AgencyProfile = () => {

  const {register , handleSubmit} = useForm();
  const [state, setstate] = useState([]);
  const [cities, setcities] = useState([])
  const [areas, setareas] = useState([])

  const getState = async()=>{
    const states = await axios.get("/state/getState");
    console.log(states.data.data);
    
    setstate(states.data.data)
  }
  const getCitiByStateId = async(id)=>{
    // console.log(id);
    // setcities(id);
    const cities = await axios.get("/city/getcitybystateid/"+id);
    console.log(cities.data.data);
    setcities(cities.data.data);
    
  }

  const getAreaByCityId = async(id)=>{
    const areas = await axios.get("/area/getareabystate/"+id)
    console.log(areas.data.data);
    setareas(areas.data.data);
  }

  useEffect(() => {
    getState();
  }, [])

  const submitHandler = async (data) => {
    console.log(data);
    data.userId = "67c5e2e2c32b3a837ea2ef53"

    const res = await axios.post("/hording/add",data);
    console.log(res.data.data);
  }
  

  return (
    <div className='app-main' style={{textAlign:"center"}}>
        <h1>Agency Profile</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div>
            <label htmlFor="">hoardingDimension</label>
            <input type="text" {...register("hoardingDimension")} />
          </div>
          <div>
            <label htmlFor="">hoardingType</label>
            <select {...register("hoardingType")}>
              <option value="">Select</option>
              <option value="Unipole">Unipole</option>
              <option value="Billboard">Billboard</option>
              <option value="Gantry">Gantry</option>
              <option value="Digital">Digital</option>
            </select>
          </div>
          <div>
            <label htmlFor="">hourlyRate</label>
            <input type="number" {...register("hourlyRate")} />
          </div>
          <div>
            <label htmlFor="">hordingURL</label>
            <input type="text" {...register("hordingURL")} />
          </div>
          <div>
            <label htmlFor="">latitude</label>
            <input type="number" {...register("latitude")} />
          </div>
          <div>
            <label htmlFor="">longitude</label>
            <input type="number" {...register("longitude")} />
          </div>
          <div>
            <label htmlFor="">State</label>
            <select {...register("stateId")} onChange={(event)=>{getCitiByStateId(event.target.value)}}>
              <option value="">Select State</option>
              {
                state?.map((state , index)=>{
                  return <option key={index} value={state._id} >{state.name}</option>
                })
              }
            </select>
          </div>
          <div>
            <label htmlFor="">City</label>
            <select {...register("cityId")} onChange={(event)=>{getAreaByCityId(event.target.value)}}>
            <option value="">Select city</option>
            {
              cities?.map((city, index)=>{
                return <option key={index} value={city._id} >{city.name}</option>
              })
            }
            </select>
          </div>
          <div>
            <label htmlFor="">Area</label>
            <select {...register("areaId")}>
              <option value="">Select city</option>
              {
                areas?.map((area,index)=>{
                  return <option key={index} value={area._id}>{area.name}</option>
                })
              }
            </select>
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
    </div>
  )
}
