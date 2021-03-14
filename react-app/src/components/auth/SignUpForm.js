import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import { Modal, useModalContext } from "../../context/Modal"
import csc from "country-state-city";
import DeleteIcon from "@material-ui/icons/Delete"


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
  const {
    user,
    setUser,
    authenticated,
    setAuthenticated,
    showSignUpModal,
    setShowSignUpModal, } = useModalContext();

  const listOfStates = csc.getStatesOfCountry("US");
  const listOfCities = csc.getCitiesOfState("US", stateCode);


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
          <form onSubmit={onSignUp}>
            <button
              onClick={() => setShowSignUpModal((prev) => !prev)}
            >
              <i id="close-icon" className="far fa-times fa-2x"></i>
            </button>
            <div >
              <ul >
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            </div>
            <div>
              <label>User Name</label>
              <input
                type="text"
                name="username"
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div>
              <label>Email</label>
              <input
                type="text"
                name="email"
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div>
              {profileImage &&
                <div>
                  <span>
                    <span
                      onClick={() => deleteImage()}
                      className="delete-image-div"
                    >
                      <DeleteIcon />
                    </span>
                  </span>
                  {profileImage.name}
                </div>
              }
              <input type="button" id="loadFile" value="Choose a Profile Image" onClick={chooseImage} />
              <input placeholder="Choose a Profile Image" className="hide-this-button" id="file" type="file" name="image" onChange={updateProfileImage} />
            </div>
            <div>
              <select name="state" onChange={updateState} value={state}>
                <option value="" disabled selected>
                  State
                </option>
                {listOfStates.map((state) => (
                  <option key={state.name}>{state.name}</option>
                ))}
              </select>
              <select name="city" onChange={updateCity} value={city}>
                <option value="" disabled selected>
                  City
                </option>
                {stateCode !== "" &&
                  listOfCities.map((city) => (
                    <option key={city.name}>{city.name}</option>
                  ))}
              </select>
            </div>
            <div>
              <select name="level" onChange={updateLevel} value={level}>
                <option value="" disabled selected>Level</option>
                <option value="Novice">Novice</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Intermediate+">Intermediate+</option>
                <option value="Advanced">Advanced</option>
                <option value="Advanced+">Advanced+</option>
              </select>
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div>
              <label>Repeat Password</label>
              <input
                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default SignUpForm;
