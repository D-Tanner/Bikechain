import React, { useState, useEffect, useRef, useCallback } from "react";
import { Modal, useModalContext } from "../../context/Modal"
import { useParams } from "react-router-dom"
import { getRideById } from "../../services/rides"
import "./RidePage.css"

const RidePage = () => {

  const { rideId } = useParams();

  const [ride, setRide] = useState();

  // console.log(ride)
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
          <div class="ride-page-grid-container">
            <div class="ride-info">Ride Info</div>
            <div class="ride-posts">Posts</div>
            <div class="ride-committed">Committed Riders</div>
            <div class="ride-main-feed">Main</div>
            <div class="ride-location">location</div>
          </div>
        </div>
      }


    </>
  )
}

export default RidePage;
