import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { updateRideById, getRideById } from '../../services/rides';
import { getMapToken } from "../../services/auth"
import { enGB } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder'
import RoomIcon from '@material-ui/icons/Room';
import deepOrange from '@material-ui/core/colors/deepOrange'
import lightBlue from '@material-ui/core/colors/lightBlue'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import 'react-nice-dates/build/style.css'
import "../CreateRide/CreateRide.css"
import "./EditRide.css"



const EditRide = ({ user }) => {

  const history = useHistory();
  const { rideId } = useParams();
  const [ride, setRide] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState();
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [level, setLevel] = useState();
  const [isLocal, setIsLocal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [mapToken, setMapToken] = useState()


  useEffect(() => {
    (async () => {
      const token = await getMapToken()
      setMapToken(token.token)
      const ride = await getRideById(rideId)
      setRide(ride)
      setTitle(ride.title)
      setLong(ride.longitude)
      setLat(ride.latitude)
      setIsLocal(ride.isLocal)
      setContent(ride.content)
    })();
  }, [])


  const updateRide = async (e) => {
    e.preventDefault()
    const newRide = await updateRideById(user.user.id, rideId, title, content, date.toISOString(), lat, long, isLocal, level)
    if (newRide.errors) {
      setErrors(newRide.errors)
    } else {
      history.push(`/rides/${rideId}`)
    }
  }

  const updateTitle = (e) => {
    setTitle(e.target.value)
  };

  const updateContent = (e) => {
    setContent(e.target.value)
  };

  const updateLevel = (e) => {
    setLevel(e.target.value)
  }
  const updateisLocal = (e) => {
    setIsLocal((prev) => !prev)
  }

  const updateDate = (date) => {
    const x = document.getElementById("input-date-value")
    setDate(x.value)
  }

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

  if (!mapToken) {
    return null
  }

  return (
    <>
      { ride && user.user.id === ride.userId && <div className="create-grid-container">
        <div className="form-grid-container">
          <h1>Create a Ride!</h1>
          <form onSubmit={updateRide} className="create-form">
            <div>
              {errors.map((error, idx) => (
                <ul classname="errors" key={idx}>{error}</ul>
              ))}
            </div>
            <div>
              <input
                type="text"
                className="input-text"
                name="name"
                placeholder="Title of Ride"
                onChange={updateTitle}
                value={title}
              ></input>
            </div>
            <div className="input-number">
              <DatePicker date={date} onDateChange={setDate}
                locale={enGB}
                format={'MM-dd-yyyy'}>
                {({ inputProps, focused }) => (

                  <input
                    className={'input' + (focused ? ' -focused' : '')}
                    {...inputProps}
                    id="input-date-value"
                    required
                  />
                )}
              </DatePicker>

            </div>
            <div>
              <textarea
                type="text"
                className="input-text"
                name="content"
                placeholder="Additional Information. When? What should you bring? What socks should you wear?"
                onChange={updateContent}
                value={content}
                rows="10"
              ></textarea>
            </div>
            <div>
              <select className="input-select" name="level" onChange={updateLevel} value={level} required>
                <option value="" disabled selected>Level of the Ride</option>
                <option value="Easiest">Novice</option>
                <option value="Easy">Intermediate</option>
                <option value="More Difficult">Intermediate+</option>
                <option value="Very Difficult">Advanced</option>
                <option value="Extremely Difficult">Advanced+</option>
              </select>
            </div>
            <div className="is-local-container">
              <input
                type="checkbox"
                className="private-check"
                name="local"
                checked={isLocal}
                onClick={updateisLocal}
              ></input>

              <label className="main-label" for="local">
                Are you a local? Feel comfortable taking others on this ride?
                </label>
            </div>
            <div className="submit-cancel-container">
              <button className="submit-button" type="submit">Update</button>
              <button className="cancel-button" onClick={() => history.push(`/rides/${rideId}`)}>Cancel</button>
            </div>
          </form>
        </div>

        <div className="map-grid-container">
          <h1>Click and Drag to select location</h1>
          <div className="map-location">
            <ReactMapGL
              onClick={(e) => {
                setLong(e.lngLat[0])
                setLat(e.lngLat[1])
              }}
              {...viewport} width="100%" height="100%"
              ref={mapRef}
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
              {lat && long && (
                <Marker key={1}
                  latitude={lat}
                  longitude={long}
                  offsetLeft={-30}
                  offsetTop={-40}
                  draggable={true}
                  onDragEnd={(e) => {
                    setLong(e.lngLat[0])
                    setLat(e.lngLat[1])
                  }}>
                  <RoomIcon style={{ fontSize: 50, color: (isLocal) ? lightBlue[600] : deepOrange[600] }} />
                </Marker>
              )}
            </ReactMapGL>
          </div>
        </div>
      </div>}
      {ride && user.user.id !== ride.userId && <h1 className="error-message">Oops! This is not your ride!</h1>}
    </>
  )
}

export default EditRide;
