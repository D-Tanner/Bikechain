import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import "./CreateRide.css"


const CreateRide = () => {

  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [isLocal, setIsLocal] = useState(false);
  const [level, setIsLevel] = useState("");

  return (
    <div className="container">CreateRide</div>
  )
}

export default CreateRide;
