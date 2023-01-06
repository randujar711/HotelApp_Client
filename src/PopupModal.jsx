import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PopUpModal({popInfo, delHotel}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button style={{background: '#c0c0c0', border: 'black', width: "100%"}} onClick={handleShow}>
        Details
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>ACCIOHOTELS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            popInfo.map((hotel)=> {
              return(
                <>
                  <div className='info-head' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '98%', height: '30%', borderRadius: '10px'}}>

                    <img style={{width:'30%', height:'auto'}}src="src/assets/broomboy!.png"/>

                    <div style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                      <img style={{width:'15%', height:'auto'}} src="src/assets/53-536725_witch-broom-transparent-clip-art-png-image-harry.png"/>
                      <p> rating {hotel.broom_rating}/5</p>
                    </div>
                    
                  </div>
                  <ul>
                    <li>Hotel Name : {hotel.name}</li>
                    <li>Address : {hotel.address}</li>
                    <li>Available Rooms : {hotel.rooms_available}</li>
                  </ul>
                  <p>For more reservation info please look at the side menu!</p>
                </>
              )
            })
          }
        </Modal.Body>
        <Modal.Footer >
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button style={{background: 'rgb(34, 73, 82)', border: 'black'}}>Start Reservation</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default PopUpModal