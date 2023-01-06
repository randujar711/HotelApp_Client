import React from 'react';
import NavBar from './Navbar';
import Button from 'react-bootstrap/Button';

function Slider ({popInfo, delHotel}) {
return(
    <>
        <input type="checkbox" name="" id="check"/>
        <div className="menu-container" style={{zIndex: '1000', height: '95%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <label for="check">
            <span className="menu fas fa-times" id="times"></span>
            <span className="menu fa-solid fa-bars" id="bar"></span>
            </label>
                <NavBar />
            {
                popInfo.map((hotel) => {
                return(
                    <>
                    <div style={{width: '100%', height: '55%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                        <ul style={{padding: '0'}}>
                            <li>{hotel.name}</li>
                            <li>{hotel.address} New York, NY</li>
                            <li>{hotel.rooms_available} possible reservations</li>
                            <li>{hotel.broom_rating} broom rating</li>
                        </ul>
                        <Button style={{background: '#c0c0c0', border: 'black', width: '10%'}} onClick={()=>{delHotel(hotel)}}>Delete</Button>
                    </div>
                    </>
                    
                )
                })
            }
        </div>
    </>
)
}

export default Slider;