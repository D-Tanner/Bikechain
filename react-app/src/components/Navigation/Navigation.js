import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

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
        <ul>
          <li>
            <NavLink to="/" exact={true}
              className="active"
              onClick={() => {
                setShowSignUpModal(false)
                setShowLoginModal(false)
              }}>
              Bikechain
          </NavLink>
          </li>
          <li>
            {/* <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink> */}
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
          </li>
          <li>
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
          </li>
          {/* <li>
          <NavLink to="/users" exact={true} activeClassName="active">
          Users
          </NavLink>
        </li> */}
          <li>
            {authenticated && <LogoutButton setAuthenticated={setAuthenticated} />}
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
