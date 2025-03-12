import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const ViewMyScreen = () => {
    const [screens, setscreens] = useState([])

    const getHording = async()=>{
        let x = localStorage.getItem("Id")
        console.log(x);
        const res = await axios.get("/hording/getHordingsbyuserid/"+x);
        console.log(res.data.data)
        setscreens(res.data.data)
        
    }

    useEffect(() => {
      getHording()
    }, [])
    


  return (
    <div>
        <table  className='table table-striped'>
            <thead style={{color:"black"}}>
                <th>hoardingDimension</th>
                <th>hoardingType</th>
                <th>Availablity_Status</th>
                <th>hourlyRate</th>
                <th>hordingURL</th>
                <th>latitude</th>
                <th>longitude</th>
                <th>Action</th>
            </thead>
            <tbody>
                {
                  screens?.map((screen)=>{
                    return <tr>
                        <td>{screen.hoardingDimension}</td>
                        <td>{screen.hoardingType}</td>
                        <td>{screen.availabilityStatus}</td>
                        <td>{screen.hourlyRate}</td>
                        <td><img src={screen.hordingURL} alt="hording" width="100" height="100" /></td>
                        <td>{screen.latitude}</td>
                        <td>{screen.longitude}</td>
                        <td ><Link to=''><button className='btn btn-info'>Update</button></Link></td>
                    </tr>
                  })
                }
            </tbody>
        </table>
    </div>
  )
}
