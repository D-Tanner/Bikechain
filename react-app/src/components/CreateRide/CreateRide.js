import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { createNewRide } from '../../services/rides';
import { enGB } from 'date-fns/locale'
import { DatePicker, useDateInput } from 'react-nice-dates'
import ReactMapGL, { Marker } from 'react-map-gl';

import 'react-nice-dates/build/style.css'
import "./CreateRide.css"
import { LngLat, LngLatBounds } from 'mapbox-gl';


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
    const newRide = await createNewRide(user.id, title, content, date, lat, long, isLocal, level)
    if (newRide.errors) {
      setErrors(newRide.errors)
    } else {
      history.push("/")
    }
  }


  const updateTitle = (e) => {
    setTitle(e.target.value)
  };

  const updateContent = (e) => {
    setContent(e.target.value)
  };
  const updateDate = (e) => {
    setDate(e.target.value)

  };
  const updateLevel = (e) => {
    setLevel(e.target.value)
  }
  const updateisLocal = (e) => {
    setIsLocal((prev) => !prev)
  }

  const [viewport, setViewport] = useState({
    latitude: 39.703683999394386,
    longitude: -105.0444,
    zoom: 8
  });


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
              {({ inputProps, focused }) => (

                <input
                  className={'input' + (focused ? ' -focused' : '')}
                  {...inputProps}
                />
              )}
            </DatePicker>

          </div>
          <div className="map-location"> Where
            <ReactMapGL
              onClick={(e) => {
                setLong(e.lngLat[0])
                setLat(e.lngLat[1])
              }}
              {...viewport} width="100%" height="100%"
              mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
              onViewportChange={nextViewport => setViewport(nextViewport)}
            >

              {/* {rides.map((ride, idx) => (
                <Marker key={idx} latitude={ride.latitude} longitude={ride.longitude}>
                  <RoomIcon />
                </Marker>
              ))} */}
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
        </form>
      </div>
    </>
  )
}

export default CreateRide;
