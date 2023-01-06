import React from 'react';
import NavBar from './Navbar';

function Slider ({handleRessy, setName, notifyPopup}) {
return(
    <>
        <input type="checkbox" name="" id="check"/>
        <div className="menu-container" style={{zIndex: '1000', height: '95%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <label for="check">
            <span className="menu fas fa-times" id="times"></span>
            <span className="menu fa-solid fa-bars" id="bar"></span>
            </label>
                <NavBar />
                <div className="parent-ressy-div">
            <form onSubmit={(e)=>handleRessy(e)}>
              {
                <div className="children-ressy-div">
                  <h2 className="h2-fonts">Book Your Trip!</h2>
                  <input className="input-field" type="text" onChange={(e) => { e.target.value }} placeholder="Full Name" /><br />
                  <label>Start date:
                    <input className="input-field" onChange={(e) => { e.target.value }} type="date" /><br />
                  </label>
                  <label>End date:</label>
                  <input className="input-field" onChange={(e) => { e.target.value }} type="date" /><br />
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
                  <div onClick={notifyPopup} className="submit-btn-div">
                    <input style={{background: 'rgb(34, 73, 82)', border: 'black', color: '#fff', borderRadius: '4px', width: '40%'}} className="submit-button" type="submit" />
                  </div>
                </div>
              }
            </form>
          </div>
        </div>
    </>
)
}

export default Slider;