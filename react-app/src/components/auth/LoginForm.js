import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import { Modal, useModalContext } from "../../context/Modal"
import CloseIcon from '@material-ui/icons/Close';
import "./LoginForm.css"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    user,
    setUser,
    authenticated,
    setAuthenticated,
    showLoginModal,
    setShowLoginModal, } = useModalContext();

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setUser(user)
      setAuthenticated(true);
      setShowLoginModal(false);
    } else {
      setErrors(user.errors);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const demoEmail = "demo@aa.io";
    const demoPassword = "password";
    const users = await login(demoEmail, demoPassword);
    setUser(users)
    setAuthenticated(true);
    setShowLoginModal(false);
  };



  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <div className="login-modal-container-width">
            <form onSubmit={onLogin}>
              <div className="close-button-container">
                <CloseIcon className="close-button-icon" onClick={() => setShowLoginModal((prev) => !prev)}></CloseIcon>
              </div>
              <div>
                {errors.map((error) => (
                  <div className="login-errors">{error}</div>
                ))}
              </div>
              <div>

                <input
                  className="login-input-email"
                  name="email"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={updateEmail}
                />
              </div>
              <div>

                <input
                  className="login-input-password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={updatePassword}
                />
              </div>
              <div className="login-button-container">
                <button className="login-submit-button" type="submit">Login</button>
                <button className="login-demo-submit-button" onClick={demoLogin}>
                  Login as Demo
              </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default LoginForm;
