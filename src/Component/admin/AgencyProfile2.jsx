import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom';

export const AgencyProfile2 = () => {

  const {register , handleSubmit} = useForm();
  const [state, setstate] = useState([]);
  const [cities, setcities] = useState([])
  const [areas, setareas] = useState([])

  const navigate = useNavigate();

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
    let x = localStorage.getItem("Id");
    console.log(x);
    
    data.userId = x;

    const formdata = new FormData();
    formdata.append("hoardingDimension", data.hoardingDimension);
    formdata.append("hoardingType", data.hoardingType);
    formdata.append("hourlyRate", data.hourlyRate);
    formdata.append("latitude", data.latitude);
    formdata.append("longitude", data.longitude);
    formdata.append("stateId", data.stateId);
    formdata.append("cityId", data.cityId);
    formdata.append("areaId", data.areaId);
    formdata.append("userId", data.userId);
    formdata.append("image", data.image[0]);

    const res = await axios.post("/hording/addWithFile",formdata);
    console.log(res);
    if(res.status === 200){
      navigate("/agencysidebar/myscreen");
    }

    
    
  }
  

  return (
    <div style={{width:"800px"}} className="container mt-2">
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card p-4 shadow">
          <h2 className="text-center mb-4">Add Screen</h2>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="mb-3">
              <label className="form-label">Hoarding Dimension</label>
              <input type="text" className="form-control" {...register("hoardingDimension")} />
            </div>
            <div className="mb-3">
              <label className="form-label">Hoarding Type</label>
              <select className="form-select" {...register("hoardingType")}>
                <option value="Unipole">Unipole</option>
                <option value="Billboard">Billboard</option>
                <option value="Gantry">Gantry</option>
                <option value="Digital">Digital</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Hourly Rate</label>
              <input type="number" className="form-control" {...register("hourlyRate")} />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Latitude</label>
                <input type="text" className="form-control" {...register("latitude")} />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Longitude</label>
                <input type="text" className="form-control" {...register("longitude")} />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Select State</label>
              <select
                className="form-select"
                {...register("stateId")}
                onChange={(event) => getCitiByStateId(event.target.value)}
              >
                <option>SELECT STATE</option>
                {state?.map((state) => (
                  <option key={state._id} value={state._id}>{state.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Select City</label>
              <select
                className="form-select"
                {...register("cityId")}
                onChange={(event) => getAreaByCityId(event.target.value)}
              >
                <option>SELECT CITY</option>
                {cities?.map((city) => (
                  <option key={city._id} value={city._id}>{city.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Select Area</label>
              <select className="form-select" {...register("areaId")}>
                <option>SELECT AREA</option>
                {areas?.map((area) => (
                  <option key={area._id} value={area._id}>{area.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Select HORDING URL</label>
                <input type="file" {...register("image")}></input>
              </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}
