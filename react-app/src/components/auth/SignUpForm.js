import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import { Modal, useModalContext } from "../../context/Modal"
import csc from "country-state-city";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [state, setState] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [city, setCity] = useState("");

  const {
    authenticated,
    setAuthenticated,
    showSignUpModal,
    setShowSignUpModal, } = useModalContext();

  const listOfStates = csc.getStatesOfCountry("US");
  const listOfCities = csc.getCitiesOfState("US", stateCode);


  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password);
      if (!user.errors) {
        setAuthenticated(true);
        setShowSignUpModal(false);
      }
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

  // const chooseImage = () => {
  //   document.getElementById('file').click();
  // };

  // const updateProfileImage = (e) => {
  //   const file = e.target.files[0];
  //   if (file) setProfileImage(file);
  // };

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
