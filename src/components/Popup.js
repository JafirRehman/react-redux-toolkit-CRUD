import React from 'react'
import "./Popup.css";
import { useSelector } from 'react-redux';
export const Popup = ({id, setPop}) => {

    const incomingusers=useSelector(state=>state.ourslice.data)
    const singleuser=incomingusers.find(user=> user.id===id);

  return (
    <div className="popupBackground">
      <div className="popupContainer">
        <button onClick={()=> setPop(false)}>Close</button>
        <br></br>
        <h2>{singleuser.name}</h2>
        <h3>{singleuser.email}</h3>
        <h4>{singleuser.age}</h4>
        <p>{singleuser.gender}</p>
      </div>
    </div>
  )
}