import React, { useState, useEffect, useRef, useCallback } from "react";
import { Modal, useModalContext } from "../../context/Modal"
import ReactMapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';
import { getRides } from '../../services/rides'
import { getMapToken } from '../../services/auth'
import { Link } from 'react-router-dom'
import RoomIcon from '@material-ui/icons/Room';
import deepOrange from '@material-ui/core/colors/deepOrange'
import lightBlue from '@material-ui/core/colors/lightBlue'
import "./HomePage.css"
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import Geocoder from 'react-map-gl-geocoder'


import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'


// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;


const HomePage = () => {

  const {
    user,
    authenticated,
    setAuthenticated,
  } = useModalContext();



  const [rides, setRides] = useState([])
  const [popup, setPopup] = useState(false)
  const [mapToken, setMapToken] = useState()

  const [selectedRide, setSelectedRide] = useState(null)
  const [viewport, setViewport] = useState({
    latitude: 39.703683999394386,
    longitude: -105.0444,
    zoom: 8
  });

  const navControlStyle = {
    left: 10,
    top: 10,
  }

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
      const token = await getMapToken()
      setRides(rides.Rides)
      setMapToken(token.token)
    })();
  }, [])

  if (!mapToken) {
    return null
  }


  return (
    <>
      <div className="home-container">
        <ReactMapGL
          {...viewport} width="100%" height="100%"
          ref={mapRef}
          onClick={() => setPopup(false)}
          mapStyle="mapbox://styles/dft609/cklyko9gp16fx17qkfkqteipz"
          mapboxApiAccessToken={mapToken}
          onViewportChange={handleViewportChange}
        >
          <Geocoder
            mapRef={mapRef}
            onViewportChange={handleGeocoderViewportChange}
            mapboxApiAccessToken={mapToken}
            position="top-right"
            marker={false}
          />
          <NavigationControl style={navControlStyle} />
          {rides.map((ride, idx) => (
            <Marker key={idx}
              latitude={ride.latitude}
              longitude={ride.longitude}
            >
              <RoomIcon style={{ fontSize: 50, color: (ride.isLocal) ? lightBlue[600] : deepOrange[600] }}
                onClick={() => {
                  setSelectedRide(ride)
                  setPopup((prev) => !prev)
                }}
              />
            </Marker>
          ))}
          {popup && selectedRide && <Popup
            latitude={selectedRide.latitude}
            longitude={selectedRide.longitude}
            closeButton={true}
            closeOnClick={false}
            offsetLeft={25}
            onClose={() => {
              setSelectedRide(null)
              setPopup(false)
            }}
            anchor="bottom"
          >
            <div className="popup-container">
              <div>{selectedRide.title}</div>
              <Link to={`rides/${selectedRide.id}`}>See more</Link>
            </div>
          </Popup>}
        </ReactMapGL>
      </div>
    </>
  )
}


export default HomePage;
