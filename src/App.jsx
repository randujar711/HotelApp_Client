import { useEffect, useState } from 'react'
//import data from './data.json'
import { 
  MapContainer, 
  TileLayer, 
  CircleMarker, 
  Popup 
} from "react-leaflet";

import 'leaflet/dist/leaflet.css'
import './App.css'
const center = [40.907130587496844, -73.86076354749547]   

function App() {

  const [data, setData] = useState([]);
  const [popInfo, setPopInfo] = useState([])

useEffect(()=> {
  const request = async () => {
    let req = await fetch (`hotels4.p.rapidapi.com`, {
      headers: { 
        'X-RapidAPI-Key': '33b0d003a4msh556d9bfdbba56d1p1a5ff9jsnea35eb56d6f0'
      }
    })
    let res = await req.json()
    console.log(res)
    setData(res)
  }
  request()
}, [])

  return (

    <div class="cont" style={{display: "flex", height: "100vh", width: "100%", justifyContent: "center", alignItems: 'center', padding: "0"}}>
      <div style ={{ width: '45%', background: 'aqua', height: '90%', display: 'flex', flexDirection: 'column'}}>
        {
          popInfo.map((hotel)=> {
            return(
              <>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src="" alt="" />
                  <div style={{display: 'flex'}}>
                    <img src="" alt="use a png" />
                    <p>{hotel.broom_rating}</p>
                  </div>
                </div>
                
                <ul>
                  <li>{hotel.address}</li>
                  <li>{hotel.available}</li>
                  <li>{hotel.name}</li>
                </ul>
              </>
            )
          })
        }
      </div>

      <MapContainer
        center ={center}
        zoom = {10}
        style={{width: "45%", height: "90%"}}
      >
        <TileLayer
          url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
        />
        {/* {
          data.__.map(()=> {
            <Popup
              position={___}
            />
          })
        } */}
      </MapContainer>

    </div>
  )
}

export default App
