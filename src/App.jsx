import { useEffect, useState } from 'react'
//import data from './data.json'
import { 
  MapContainer, 
  TileLayer,
  Marker, 
  Popup 
} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import { hotels } from './Hotels.json'
import './App.css'
const center = [40.8116, -73.9465]   

function App() {

  const [data, setData] = useState(hotels)
  const [popInfo, setPopInfo] = useState([])

  const addHotel = (info) => {
     if(popInfo.includes(info)) return
    setPopInfo([...popInfo, info])
  }
  console.log(popInfo)
  return (

    <div className="cont" >

    {/* ----  Menu-slider ---- */}
      <input type="checkbox" name="" id="check"/>
      <div className="menu-container" style={{zIndex: '1000', height: '95%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <label for="check">
          <span className="menu fas fa-times" id="times"></span>
          <span className="menu fa-solid fa-bars" id="bar"></span>
        </label>
        {
          popInfo.map((hotel) => {
            return(
              <>
                <div style={{width: '100%', height: '35%', background: 'red'}}>
                  {/* <img src={hotel.image} alt="" /> */}
                </div>
                <div style={{width: '100%', height: '55%', background: 'blue', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <ul style={{padding: '0'}}>
                    <li>{hotel.name}</li>
                    <li>{hotel.address}</li>
                    <li>{hotel.rooms_available}</li>
                    <li>{hotel.price}</li>
                    <li>{hotel.rooms_available}</li>
                    <li>{hotel.broom_rating}</li>
                  </ul>
                </div>
              </>
              
            )
          })
        }
        
      </div>
    {/* ----  Menu-slider Ends---- */}

      <div className="info-cont" style ={{ width: '35%', background: '#fff', height: '60%', display: 'flex', flexDirection: 'column', borderRadius: '10px', alignItems: 'center'}}>
        {
          popInfo.map((hotel)=> {
            return(
              <>
                <div className='info-head' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '98%', height: '30%', background: 'red', borderRadius: '10px'}}>

                  {/* <img src="" alt="" /> */}
                  <div style={{display: 'flex'}}>
                    {/* <img src="" alt="use a png" /> */}
                    <p>{hotel.broom_rating}</p>
                  </div>
                  
                </div>
                
                <ul>
                  <li>{hotel.address}</li>
                  <li>{hotel.rooms_available}</li>
                  <li>{hotel.name}</li>
                </ul>
              </>
            )
          })
        }
      </div>

      <MapContainer
        center ={center}
        zoom = {10.5}
        style={{width: "45%", height: "90%", borderRadius: '10px'}}
      >
        <TileLayer
          url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
        />
        {
           data.map((location)=> {
            return(
              <Marker position={location.coordinate}>
                  <Popup>
                    <div className='popup' onClick={()=>{addHotel(location)}}>{location.name}</div>
                  </Popup>
              </Marker>
            )
           })
        }
      </MapContainer>

    </div>
  )
}

export default App
