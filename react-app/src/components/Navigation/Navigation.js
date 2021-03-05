import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import "./Navigation.css"
import LoginForm from "../auth/LoginForm"
import SignUpForm from "../auth/SignUpForm"
import LogoutButton from '../auth/LogoutButton';
import { useModalContext } from "../../context/Modal"
import { authenticate } from '../../services/auth';


const Navigation = () => {

  const {
    authenticated,
    setAuthenticated,
    showLoginModal,
    setShowLoginModal,
    showSignUpModal,
    setShowSignUpModal,
    showSearchBarModal,
    setShowSearchBarModal,
  } = useModalContext();



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
              Bikechain
          </NavLink>
          </div>
          <div>
            {!authenticated && (

              <button
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
                onClick={() => {
                  console.log(showSignUpModal)
                  setShowLoginModal(false);
                  setShowSignUpModal((prev) => !prev);

                }}
              >
                Sign Up
              </button>
            )}
          </div>
          {/* <li>
          <NavLink to="/users" exact={true} activeClassName="active">
          Users
          </NavLink>
        </li> */}
          <div>
            {authenticated && <LogoutButton setAuthenticated={setAuthenticated} />}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
