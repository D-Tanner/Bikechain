import React, { useState, useEffect, useRef, useCallback } from "react";
import { Modal, useModalContext } from "../../context/Modal"
import { useParams } from "react-router-dom"
import { getRideById } from "../../services/rides"
import "./RidePage.css"

const RidePage = () => {

  const { rideId } = useParams();

  const [ride, setRide] = useState();

  console.log(ride)
  useEffect(() => {
    (async () => {
      const ride = await getRideById(rideId)
      setRide(ride)
    })();
  }, [])

  return (
    <>
      { ride &&

        <div className="ride-page-container">
          <h1>{ride.title}</h1>
          <div>{ride.content}</div>
        </div>
      }

      {/* <div class="grid-container">
        <div class="item1">Your rides</div>
        <div class="item2">Committments</div>
        <div class="item3">Following</div>
        <div class="item4">Profile</div>
        <div class="item5">Main</div>
        <div class="item6">Right</div>
        <div class="item7">Left</div>
        <div class="item8">Footer</div>
      </div> */}
    </>
  )
}

export default RidePage;
