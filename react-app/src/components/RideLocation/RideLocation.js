import React, { useState, useEffect, useCallback, useRef } from "react";
import { Modal, useModalContext } from "../../context/Modal"
import { createPost } from "../../services/rides"
import CloseIcon from '@material-ui/icons/Close';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import { getMapToken } from "../../services/auth"
import RoomIcon from '@material-ui/icons/Room';
import deepOrange from '@material-ui/core/colors/deepOrange'
import lightBlue from '@material-ui/core/colors/lightBlue'


import "./RideLocation.css"

const RideLocation = ({ ride }) => {
  const { showRideLocationModal, setShowRideLocationModal } = useModalContext();
  const [mapToken, setMapToken] = useState()
  const mapRef = useRef();

  const [viewport, setViewport] = useState({
    latitude: ride.latitude,
    longitude: ride.longitude,
    zoom: 8
  });

  useEffect(() => {
    (async () => {
      const token = await getMapToken()
      setMapToken(token.token)
      console.log(ride)
    })();
  }, [])

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const navControlStyle = {
    left: 10,
    top: 10,
  }

  if (!mapToken) {
    return null
  }

  return (
    <>
      {showRideLocationModal && ride && (
        <Modal onClose={() => setShowRideLocationModal(false)}>
          <div className="ride-location-container">
            <div className="ride-location-close-button">
              <CloseIcon className="close-button-icon" onClick={() => setShowRideLocationModal((prev) => !prev)}></CloseIcon>
            </div>
            {/* <div> */}
            <ReactMapGL
              {...viewport} width="100%" height="100%"
              ref={mapRef}
              mapStyle="mapbox://styles/dft609/cklyko9gp16fx17qkfkqteipz"
              mapboxApiAccessToken={mapToken}
              onViewportChange={handleViewportChange}
            >
              <NavigationControl style={navControlStyle} />

              <Marker key={1}
                latitude={ride.latitude}
                longitude={ride.longitude}
                offsetLeft={-30}
                offsetTop={-40}
                draggable={true}>
                <RoomIcon style={{ fontSize: 50, color: (ride.isLocal) ? lightBlue[600] : deepOrange[600] }} />
              </Marker>

            </ReactMapGL>
            {/* </div> */}
          </div>
        </Modal>
      )}
    </>
  )
}

export default RideLocation;
