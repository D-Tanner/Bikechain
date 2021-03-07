import React, { useState, useEffect, useRef, useCallback } from "react";
import { Modal, useModalContext } from "../../context/Modal"
import { useParams } from "react-router-dom"
import { getRideById } from "../../services/rides"
import "./RidePage.css"

const RidePage = () => {

  const { rideId } = useParams();

  const [ride, setRide] = useState();


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
    </>
  )
}

export default RidePage;
