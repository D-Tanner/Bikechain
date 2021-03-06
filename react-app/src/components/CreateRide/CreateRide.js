import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { createNewRide } from '../../services/rides';
import "./CreateRide.css"


const CreateRide = ({ user }) => {

  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [isLocal, setIsLocal] = useState(false);
  const [level, setLevel] = useState("");
  const [errors, setErrors] = useState([])

  const postRide = async (e) => {
    e.preventDefault()
    const newRide = await createNewRide(user.id, title, content, startTime, endTime, lat, long, isLocal, level)
    if (newRide.errors) {
      setErrors(newRide.errors)
    } else {
      history.push("/")
    }
  }

  return (
    <div className="container">
      Create Ride
    </div>
  )
}

export default CreateRide;
