import React, { useState, useEffect } from "react";
import { Modal, useModalContext } from "../../context/Modal"
// import mapboxgl from 'mapbox-gl';
// import MapBoxWorker from 'mapbox-gl'
import ReactMapGL, { Marker } from 'react-map-gl';
import { getRides } from '../../services/rides'
import RoomIcon from '@material-ui/icons/Room';

import "./HomePage.css"
import Room from "@material-ui/icons/Room";


const HomePage = () => {

  const {
    authenticated,
    setAuthenticated,
  } = useModalContext();


  const [lat, setLat] = useState()
  const [long, setLong] = useState()
  const [rides, setRides] = useState([])

  const [viewport, setViewport] = useState({
    latitude: 39.703683999394386,
    longitude: -105.0444,
    zoom: 8
  });

  useEffect(() => {
    (async () => {
      const rides = await getRides()
      setRides(rides.Rides)
    })();
  }, [])

  return (
    <>
      <div className="home-container">
        <ReactMapGL
          {...viewport} width="100%" height="100%"
          mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
          onViewportChange={nextViewport => setViewport(nextViewport)}
        >

          {rides.map((ride, idx) => (
            <Marker key={idx} latitude={ride.latitude} longitude={ride.longitude}>
              <RoomIcon />
            </Marker>
          ))}
        </ReactMapGL>
      </div>
    </>
  )
}


export default HomePage;
