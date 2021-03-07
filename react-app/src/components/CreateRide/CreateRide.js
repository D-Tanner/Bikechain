import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { createNewRide } from '../../services/rides';
import { enGB } from 'date-fns/locale'
import { DatePicker, useDateInput } from 'react-nice-dates'

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
    const newRide = await createNewRide(user.id, title, content, date, lat, long, isLocal, level)
    if (newRide.errors) {
      setErrors(newRide.errors)
    } else {
      history.push("/")
    }
  }


  console.log(typeof date)

  const updateTitle = (e) => {
    setTitle(e.target.value)
  };

  const updateContent = (e) => {
    setContent(e.target.value)
  };
  const updateDate = (e) => {
    setDate(e.target.value)

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
        </form>
      </div>
    </>
  )
}

export default CreateRide;
