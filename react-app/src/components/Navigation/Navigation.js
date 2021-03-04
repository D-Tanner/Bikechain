import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import LoginForm from "../auth/LoginForm"
import SignUpForm from "../auth/SignUpForm"
import LogoutButton from '../auth/LogoutButton';
import { useModalContext } from "../../context/Modal"


const Navigation = ({ setAuthenticated }) => {

  const {
    showLoginModal,
    setShowLoginModal,
    showSignUpModal,
    setShowSignUpModal,
    showSearchBarModal,
    setShowSearchBarModal,
  } = useModalContext();


  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          {/* <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink> */}

          <button
            onClick={() => {
              setShowSignUpModal(false);
              setShowLoginModal((prev) => !prev);
            }}
          >
            Login
              </button>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
