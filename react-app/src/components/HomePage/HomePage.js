import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import { enGB } from 'date-fns/locale'
import { getImage } from '../../services/getImages'
import Moment from "react-moment"
import CheckCircleIcon from '@material-ui/icons/CheckCircle';



const HomePage = () => {

  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [filteredRides, setFilteredRides] = useState();
  const [rides, setRides] = useState([])
  const [popup, setPopup] = useState(false)
  const [mapToken, setMapToken] = useState()

  const [selectedRide, setSelectedRide] = useState(null)
  const [viewport, setViewport] = useState({
    latitude: 39.703683999394386,
    longitude: -105.0444,
    zoom: 8
  });


  useEffect(() => {
    (async () => {
      const rides = await getRides()
      const token = await getMapToken()
      setRides(rides.Rides)
      setFilteredRides(rides.Rides)
      setMapToken(token.token)
    })();
  }, [])

  useEffect(() => {
    let filtered = [];
    if (rides && startDate && !endDate) {
      rides.forEach((ride) => {
        const newDate = new Date(ride.date.slice(5, 16)).toISOString()
        if (startDate.toISOString() <= newDate) {
          filtered.push(ride)
        }
      })
      setFilteredRides(filtered)
    }
    if (rides && endDate && !startDate) {
      filtered = []
      rides.forEach((ride) => {
        const newDate = new Date(ride.date.slice(5, 16)).toISOString()
        if (endDate.toISOString() >= newDate) {
          filtered.push(ride)
        }
      })
      setFilteredRides(filtered)
    }
    if (rides && endDate && startDate) {
      filtered = []
      rides.forEach((ride) => {
        const newDate = new Date(ride.date.slice(5, 16)).toISOString()
        if (startDate.toISOString() <= newDate && endDate.toISOString() >= newDate) {
          filtered.push(ride)
        }
      })
      setFilteredRides(filtered)
    }
    if (!startDate && !endDate) {
      setFilteredRides(rides)
    }
  }, [startDate, endDate])

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




  if (!mapToken) {
    return null
  }


  return (
    <>
      <div className="home-container">
        <div className="date-range-container">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            // minimumDate={new Date()}
            minimumLength={1}
            format='dd MMM yyyy'
            locale={enGB}
          >
            {({ startDateInputProps, endDateInputProps, focus }) => (
              <div className='date-range'>
                <input
                  className={'input-select' + (focus === START_DATE ? ' -focused' : '')}
                  {...startDateInputProps}
                  placeholder='Start date'
                />
                <span className='date-range_arrow' />
                <input
                  className={'input-select' + (focus === END_DATE ? ' -focused' : '')}
                  {...endDateInputProps}
                  placeholder='End date'
                />
              </div>
            )}
          </DateRangePicker>
        </div>
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
          {filteredRides.map((ride, idx) => (
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
              <div className="homepage-username-image-container">
                <img id="homepage-username-image" src={getImage(selectedRide.level)}></img>
              </div>
              <div className="homepage-pop-title">{selectedRide.title}</div>
              <div className="homepage-pop-username">From {selectedRide.user.username}</div>
              <div className="homepage-pop-ride-date"><Moment format="MMM D" date={selectedRide.date} /></div>
              {selectedRide.isLocal && (
                <div className="local-check">
                  <div>
                    <CheckCircleIcon style={{ fontsize: 50, color: lightBlue[600] }}></CheckCircleIcon>
                  </div>
                  <div className="local-check-label">
                    Local
                  </div>
                </div>)}
              < Link className="popup-link" to={`rides/${selectedRide.id}`}>See more</Link>
            </div>
          </Popup>}
        </ReactMapGL>
      </div>
    </>
  )
}


export default HomePage;
