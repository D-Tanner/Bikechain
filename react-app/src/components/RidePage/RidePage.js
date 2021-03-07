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
    <div className="ride-page-container">
      <h1>{rideId}</h1>
      <div>{ride}</div>
    </div>
  )
}

export default RidePage;
