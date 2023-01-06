import { useEffect, useState } from 'react'
import './App.css'
import Map from './Map'
import Slider from './Slider'
import PopUpModal from './PopupModal';

function App() {

  const [popInfo, setPopInfo] = useState([])
  const [data, setData] = useState([])
  const [posts, setPosts] = useState([])

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
      return [...prevState.filter((x)=> {return x.id !== info.id})]
    })
  }


  return (
    
    <div className="cont" >
      <Slider delHotel={delHotel} popInfo={popInfo} />
      <Map PopUpModal={PopUpModal} popInfo={popInfo} setPopInfo={setPopInfo} addHotel={addHotel} notifyPopup={notifyPopup} posts={posts}/>

    </div>
  )
}

export default App
