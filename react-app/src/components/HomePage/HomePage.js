import React, { useState } from "react";
import { Modal, useModalContext } from "../../context/Modal"
import mapboxgl from 'mapbox-gl';
import ReactMapGL from 'react-map-gl';

import "./HomePage.css"


const HomePage = () => {

  const {
    authenticated,
    setAuthenticated,
  } = useModalContext();

  mapboxgl.accessToken = process.MAP_TOKEN;

  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });
  // const map = new mapboxgl.Map({
  //   container: 'map', // container ID
  //   style: 'mapbox://styles/mapbox/streets-v11', // style URL
  //   center: [-74.5, 40], // starting position [lng, lat]
  //   zoom: 9 // starting zoom
  // });


  return (
    <div className="home-container">
      <ReactMapGL
        {...viewport}
        onViewportChange={nextViewport => setViewport(nextViewport)}
      />
    </div>
  )
}


export default HomePage;
