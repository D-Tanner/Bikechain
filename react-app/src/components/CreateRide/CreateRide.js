import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { createNewRide } from '../../services/rides';
import { enGB } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import MobileTimePicker from '@material-ui/lab/MobileTimePicker';

import 'react-nice-dates/build/style.css'
import "./CreateRide.css"


const CreateRide = ({ user }) => {

  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState("");
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [isLocal, setIsLocal] = useState(false);
  const [level, setLevel] = useState("");
  const [errors, setErrors] = useState([])
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  const postRide = async (e) => {
    e.preventDefault()
    const newRide = await createNewRide(user.id, title, content, startTime, endTime, lat, long, isLocal, level)
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
  const updateStartTime = (e) => {
    setStartTime(e.target.value)
    console.log(startTime)
  };

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
          <div> Start Time
            <DatePicker date={startDate} onDateChange={setStartDate} locale={enGB}>
              {({ inputProps, focused }) => (
                <input
                  className={'input' + (focused ? ' -focused' : '')}
                  {...inputProps}
                />
              )}
            </DatePicker>
            {startDate && <span>

            </span>}
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateRide;
