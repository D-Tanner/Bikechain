import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import { Modal, useModalContext } from "../../context/Modal"
import csc from "country-state-city";
import DeleteIcon from "@material-ui/icons/Delete"
import CloseIcon from '@material-ui/icons/Close';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import "./SignUpForm.css"

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [level, setLevel] = useState("");
  const [errors, setErrors] = useState([]);
  const [profileImage, setProfileImage] = useState(null)
  const [riderImage, setRiderImage] = useState("")
  const {
    user,
    setUser,
    authenticated,
    setAuthenticated,
    showSignUpModal,
    setShowSignUpModal, } = useModalContext();

  const listOfStates = csc.getStatesOfCountry("US");
  const listOfCities = csc.getCitiesOfState("US", stateCode);


  useEffect(() => {
    if (level) {
      if (level === "Novice") setRiderImage("/novice.png")
      if (level === "Intermediate") setRiderImage("/intermediate.png")
      if (level === "Intermediate+") setRiderImage("/intermediate-plus.png")
      if (level === "Advanced") setRiderImage("/advanced.png")
      if (level === "Advanced+") setRiderImage("/advanced-plus.png")
    }
  }, [level])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password, city, state, level, profileImage);
      if (!user.errors) {
        setUser(user)
        setAuthenticated(true);
        setShowSignUpModal(false);
      } else {
        const errors = user.errors.map(error => error.split(' : ')[1]);
        setErrors(errors);
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };


  const updateState = (e) => {
    setState(e.target.value);
    const stateName = e.target.value;
    let result = "";
    listOfStates.forEach((state) => {
      if (state.name === stateName) {
        result = state.isoCode;
      }
    });
    setStateCode(result);
  };

  const updateCity = (e) => {
    setCity(e.target.value);
  };

  const updateLevel = (e) => {
    setLevel(e.target.value)
  }

  const chooseImage = () => {
    document.getElementById('file').click();
  };

  const updateProfileImage = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(file);
  };

  const deleteImage = (e) => {
    setProfileImage(null)
  }

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {showSignUpModal && (
        <Modal onClose={() => setShowSignUpModal(false)}>
          <div className="signup-modal-container-width">
            <div className="level-rider-image-container">
              {level && <img id="rider-image" src={riderImage}></img>}
            </div>
            <form onSubmit={onSignUp}>
              <div className="close-button-container">
                <div>
                  <CloseIcon className="close-button-icon" onClick={() => setShowSignUpModal((prev) => !prev)}></CloseIcon>
                </div>
              </div>
              <div >
                <div >
                  {errors.map((error, idx) => (
                    <div className="signup-errors">{error}</div>
                  ))}
                </div>
              </div>
              <div>
                <input
                  className="signup-input-username"
                  placeholder="Username"
                  type="text"
                  name="username"
                  onChange={updateUsername}
                  value={username}
                ></input>
              </div>
              <div>

                <input
                  className="signup-input-email"
                  placeholder="Email"
                  type="text"
                  name="email"
                  onChange={updateEmail}
                  value={email}
                ></input>
              </div>
              <div>
                {profileImage &&
                  <div className="selecting-images-container">

                    <div
                      onClick={() => deleteImage()}
                      className="delete-image-div"
                    >
                      <DeleteIcon />
                    </div>
                    <div className="selected-image-label">
                      {profileImage.name}
                    </div>
                  </div>
                }
                <input className="choose-profile-image" type="button" id="loadFile" value="Choose a Profile Image" onClick={chooseImage} />
                <input placeholder="Choose a Profile Image" className="hide-this-button" id="file" type="file" name="image" onChange={updateProfileImage} />
              </div>
              <div className="location-field-container">
                <select className="location-state" name="state" onChange={updateState} value={state}>
                  <option value="" disabled selected>
                    State
                </option>
                  {listOfStates.map((state) => (
                    <option key={state.name}>{state.name}</option>
                  ))}
                </select>
                <select className="location-city" name="city" onChange={updateCity} value={city}>
                  <option value="" disabled selected>
                    City
                </option>
                  {stateCode !== "" &&
                    listOfCities.map((city) => (
                      <option key={city.name}>{city.name}</option>
                    ))}
                </select>
              </div>
              <div className="level-of-rider-container">
                <select className="level-of-rider" name="level" onChange={updateLevel} value={level}>
                  <option value="" disabled selected>Level</option>
                  <option value="Novice">Novice</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Intermediate+">Intermediate+</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Advanced+">Advanced+</option>
                </select>
                {/* <div className="level-rider-image-container">
                  <img id="rider-image" src="/advanced.png"></img>
                </div> */}
              </div>
              <div>

                <input
                  className="signup-input-password"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={updatePassword}
                  value={password}
                ></input>
              </div>
              <div>

                <input
                  className="signup-input-repeat-password"
                  placeholder="Repeat Password"
                  type="password"
                  name="repeat_password"
                  onChange={updateRepeatPassword}
                  value={repeatPassword}
                  required={true}
                ></input>
              </div>
              <button className="signup-submit-button" type="submit">Sign Up</button>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default SignUpForm;
