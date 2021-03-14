import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import "./Navigation.css"
import LoginForm from "../auth/LoginForm"
import SignUpForm from "../auth/SignUpForm"
import LogoutButton from '../auth/LogoutButton';
import RidePost from "../RidePosts/RidePosts"
import { useModalContext } from "../../context/Modal"
import { authenticate } from '../../services/auth';


const Navigation = () => {

  const history = useHistory();

  const {
    user,
    authenticated,
    setAuthenticated,
    showLoginModal,
    setShowLoginModal,
    showPostModal,
    setShowPostModal,
    showSignUpModal,
    setShowSignUpModal,
    showSearchBarModal,
    setShowSearchBarModal,
  } = useModalContext();

  // console.log(user)
  return (
    <>
      {showLoginModal && <LoginForm />}
      {showSignUpModal && <SignUpForm />}
      <nav>
        <div className="navigation">
          <div className="navigation-first">
            <NavLink to="/" exact={true}
              className="navigation-home"
              onClick={() => {
                setShowSignUpModal(false)
                setShowLoginModal(false)
              }}>
              <div className="logo-image-container">
                <img id="logo-image" src="/logo.png" alt=""></img>
              </div>
            </NavLink>
          </div>
          <div className="navigation-second-fraction">

            <div>
              {!authenticated && (
                <button
                  className="nav-login"
                  onClick={() => {
                    setShowSignUpModal(false);
                    setShowLoginModal((prev) => !prev);
                  }}
                >
                  Login
                </button>
              )}
            </div>
            <div>
              {!authenticated && (
                <button
                  className="nav-signup"
                  onClick={() => {
                    // console.log(showSignUpModal)
                    setShowLoginModal(false);
                    setShowSignUpModal((prev) => !prev);
                  }}
                >
                  Sign Up
                </button>
              )}
            </div>
            {authenticated && <div>
              <LogoutButton
                className="nav-logout"
                setAuthenticated={setAuthenticated} />
            </div>}
            {authenticated && <div>
              <button
                className="nav-your-profile"
                onClick={() => {
                  if (authenticated) {
                    history.push(`/profile/${user.user.id}`)
                  } else {
                    setShowSignUpModal(false)
                    setShowLoginModal((prev) => !prev)
                  }
                }}>Your Profile</button>
            </div>}
            {authenticated && <div className="nav-create-a-ride-container">
              <button
                className="nav-create-a-ride"
                onClick={() => {
                  if (authenticated) {
                    history.push("/new-ride")
                  } else {
                    setShowSignUpModal(false)
                    setShowLoginModal((prev) => !prev)
                  }
                }}>Create a Ride</button>
            </div>}
          </div>
        </div>

      </nav>
    </>
  );
}

export default Navigation;
