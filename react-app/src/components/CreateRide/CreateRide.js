import React, { useState, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom'
import { createNewRide } from '../../services/rides';
import { enGB } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import ReactMapGL, { Marker } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder'
import RoomIcon from '@material-ui/icons/Room';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import 'react-nice-dates/build/style.css'
import "./CreateRide.css"


const CreateRide = ({ user }) => {

  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState();
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [level, setLevel] = useState();
  const [isLocal, setIsLocal] = useState(false);
  const [errors, setErrors] = useState([]);



  const postRide = async (e) => {
    e.preventDefault()
    updateDate()
    // const newRide = await createNewRide(user.id, title, content, date, lat, long, isLocal, level)
    // if (newRide.errors) {
    //   setErrors(newRide.errors)
    // } else {
    //   history.push("/")
    // }
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

  return (
    <>
      <div className="container">
        <h1>Create a Ride!</h1>
        <form onSubmit={postRide} className="create-form">
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
            ></input>
          </div>
          <div>
            <textarea
              type="text"
              className="input-text"
              name="content"
              placeholder="Additional Information"
              onChange={updateContent}
            ></textarea>
          </div>
          <div> When
            <DatePicker date={date} onDateChange={setDate} locale={enGB} format={'MM-dd-yyyy'}>
              {/* <DatePicker date={date} onDateChange={(event) => {
              console.log('from the datePicker', event)
            }} locale={enGB} format={'MM-dd-yyyy'}> */}
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
          <div className="map-location"> Where: Click and Drag
            <ReactMapGL
              onClick={(e) => {
                setLong(e.lngLat[0])
                setLat(e.lngLat[1])
              }}
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
                marker={false}
              />
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
                    console.log(lat, long)
                  }}>
                  <RoomIcon style={{ fontSize: 50 }} />
                </Marker>
              )}
            </ReactMapGL>
          </div>
          <div>
            <select name="level" onChange={updateLevel} value={level}>
              <option value="" disabled selected>Level</option>
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
            <label
              for="local"
            >
              Could you ride this trail in your sleep?
              </label>
          </div>
          <button type="submit">Create</button>
          <button onClick={() => history.push('/')}>Cancel</button>
        </form>
      </div>
    </>
  )
}

export default CreateRide;
