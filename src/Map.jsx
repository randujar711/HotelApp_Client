import { 
  MapContainer, 
  TileLayer,
  Marker, 
  Popup 
} from "react-leaflet" 
import 'leaflet/dist/leaflet.css'

const center = [40.8116, -73.9465]   

function Map ({posts, addHotel, PopUpModal, popInfo, delHotel, notifyPopup}) {
    console.log(posts)
    return(
        <MapContainer center ={center} zoom = {10.5} style={{width: "75%", height: "90%", borderRadius: '10px'}}>
            <TileLayer url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'/>
            {
                posts.map((location)=> {

                const coordinates = [location.latitude, location.longitude]

                return(

                    <Marker position={coordinates}>
                        <div onClick={()=>{addHotel(location)}}>
                            <Popup>
                                <div className='popup'>{location.name}</div>
                                <PopUpModal notifyPopup={notifyPopup} popInfo={popInfo} delHotel={delHotel} />
                            </Popup>
                        </div>
                    </Marker>

                )
                })
            }
        </MapContainer>
    );
}
export default Map