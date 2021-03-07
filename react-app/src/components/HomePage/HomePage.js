import React, { useState, useEffect, useRef, useCallback } from "react";
import { Modal, useModalContext } from "../../context/Modal"
import ReactMapGL, { Marker } from 'react-map-gl';
import { getRides } from '../../services/rides'
import RoomIcon from '@material-ui/icons/Room';
import "./HomePage.css"
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import Geocoder from 'react-map-gl-geocoder'

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

  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    [handleViewportChange]
  );

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
          ref={mapRef}
          mapStyle="mapbox://styles/dft609/cklyko9gp16fx17qkfkqteipz"
          mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
          onViewportChange={handleViewportChange}
        >
          <Geocoder
            mapRef={mapRef}
            onViewportChange={handleGeocoderViewportChange}
            mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
            position="top-right"

          />
          {rides.map((ride, idx) => (
            <Marker key={idx} latitude={ride.latitude} longitude={ride.longitude}>
              <RoomIcon style={{ fontSize: 50 }} />
            </Marker>
          ))}
        </ReactMapGL>
      </div>
    </>
  )
}


export default HomePage;
