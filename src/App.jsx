import { useEffect, useState } from 'react'

import './App.css'
import Map from './Map'
import Slider from './Slider'
import PopUpModal from './PopupModal';

function App() {

  const [popInfo, setPopInfo] = useState([])

  const [open, setOpen] = useState(false)
  const [available, setAvailable] = useState([])
  const [name, setName] = useState([])
  const [data, setData] = useState([])
  const [posts, setPosts] = useState([])

  // const [open, setOpen] = useState(false)
  const [rooms_available, setRooms_available] = useState(0)
  const [name, setName] = useState([])
  const [selectedHotel, setSelectedHotel] = useState({})
  const [ressy, setRessy] = useState([])

  useEffect(()=> {
    let ws;
    const request = async() => {
      let req = await fetch('http://127.0.0.1:3000/hotels')
      let res = await req.json()
      setPosts(res)
    }
    
    const connect = async () => {
      ws = new WebSocket("ws://localhost:3000/cable")

      ws.onopen = () => {
        ws.send(JSON.stringify({"command": "subscribe", "identifier": "{\"channel\": \"LiveViewChannel\"}"}))
        console.log('workiing')
      }
      ws.onmessage = (event) => {
          const data = JSON.parse(event.data)
          if (data.type === "ping"|| data.type === "welcome" || data.type === "confirm_subscription") return
          const post = data.message?.post
          console.log("data is", event)
          if (post) {
            setPosts(prevState =>[post, ...prevState])
          } else {
            alert(data.message.notification.message)
          }

          setRessy((currentState) => {
            console.log("updated!")
            return ([...currentState, { rooms_available }])
          })
        }
    }
    
    connect()
    request()

  }, [])

  const notifyPopup = async () => {
      console.log("sending notification")
      let req = await fetch("http://localhost:3000/popups/")
      let res = await req.json()
    }

  const addHotel = (info) => {
    if(popInfo.includes(info)) return
    // notifyPopup()
    setPopInfo([...popInfo, info])
  }
  console.log(popInfo)

  
  // Creating a reservation Form
  const handleRessy = (e) => {
    e.preventDefault()

    const getRooms = async () => {
      let req = await fetch('http://127.0.0.1:3000/hotels/available')
      let res = await req.json()
      console.log(res)
      return res
    }
    getRooms()

       
    const newRessy = async () => {
      let req = await fetch('http://127.0.0.1:3000/hotels/available', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          available: available - 1         
        })
      })
      setRessy((currentState) => {
        console.log("updated!")
        return([...currentState, {available}])
      })
    }
    newRessy()
  }
  const handleOpen = () => {
    setOpen(!open)
  }
  
  return (
    <div className="cont" >

    {/* ----  Menu-slider ---- */}
      <input className="form-menu" type="checkbox" name="" id="check"/>
      <div className="menu-container" style={{zIndex: '1000', height: '95%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <label for="check">
          <span className="menu fas fa-times" id="times"></span>
          <span className="menu fa-solid fa-bars" id="bar"></span>
        </label>
        {
          <div className="parent-ressy-div">
            <form onSubmit={(e)=>handleRessy(e)}>
              {
                <div className="children-ressy-div">
                  <h2 className="h2-fonts">Book Your Trip!</h2>
                  <input className="input-field" type="text" onChange={(e) => { e.target.value }} placeholder="Full Name" /><br />
                  <label>Start date:
                    <input className="input-field" onChange={(e) => { e.target.value }} type="date" value="2023-01-07" /><br />
                  </label>
                  <label>End date:</label>
                  <input className="input-field" onChange={(e) => { e.target.value }} type="date" value="2023-01-07" /><br />
                  <select className="input-field" onChange={(e) => { setName(e.target.value) }}>
                    <option value="disabled selected">choose a hotel</option>
                    <option value="1st">Motel 9 3/4</option>
                    <option value="2nd">The Shrieking Shack</option>
                    <option value="3rd">The SlytherInn</option>
                    <option value="4th">The Leaky Cauldron</option>
                    <option value="5th">Wizard's Way</option>
                    <option value="6th">Hagrid's Quality Hut</option>
                    <option value="7th">the 4 Broomsticks</option>
                    <option value="8th">the Night Bus</option>
                  </select>                  
                  <div className="submit-btn-div">
                    <input className="submit-button" type="submit" />
                  </div>
                </div>
              }
            </form>
          </div>
        }
      </div>
    {/* ----  Menu-slider Ends---- */}


   const delHotel = (info) => {
    setPopInfo((prevState)=> {
      return [...prevState.filter((x)=> x.id !== info.id)]
    })
  }
 
  // Creating a reservation Form
  const handleRessy = (e) => {
    e.preventDefault()
        let x = rooms_available - 1
        console.log("rooms:", rooms_available)
    // const getRooms = async () => {
    //   let req = await fetch(`http://127.0.0.1:3000/hotels/${selectedHotel}/rooms_available`)
    //   let res = await req.json()
    //   console.log(res)
    //   return res
    // }
    // getRooms()
    const newRessy = async () => {
  
    
      let req = await fetch(`http://127.0.0.1:3000/hotels/1`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name
        })
      })
    }
    newRessy()
    console.log(ressy)
  }

                  {/* <img src="" alt="" /> */}
                  <div style={{display: 'flex'}}>
                    {/* <img src="" alt="use a png" /> */}
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

  return (
    
    <div className="cont" >
    {console.log(ressy)}
      <Slider handleRessy={handleRessy} delHotel={delHotel} popInfo={popInfo} setName={setName} setRessy={setRessy} selectedHotel={selectedHotel} notifyPopup={notifyPopup}/>
      <Map PopUpModal={PopUpModal} popInfo={popInfo} setPopInfo={setPopInfo} addHotel={addHotel} posts={posts} delHotel={delHotel}/>


    </div>
  )
}

export default App
