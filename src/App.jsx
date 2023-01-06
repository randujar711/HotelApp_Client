import { useEffect, useState } from 'react'
import './App.css'
import Map from './Map'
import Slider from './Slider'
import PopUpModal from './PopupModal';

function App() {

  const [popInfo, setPopInfo] = useState([])
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

  return (
    
    <div className="cont" >
    {console.log(ressy)}
      <Slider handleRessy={handleRessy} delHotel={delHotel} popInfo={popInfo} setName={setName} setRessy={setRessy} selectedHotel={selectedHotel} notifyPopup={notifyPopup}/>
      <Map PopUpModal={PopUpModal} popInfo={popInfo} setPopInfo={setPopInfo} addHotel={addHotel} posts={posts} delHotel={delHotel}/>

    </div>
  )
}

export default App
