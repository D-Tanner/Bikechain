import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import { Modal, useModalContext } from "../../context/Modal"


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
      setAuthenticated(true);
      setUser(user)
      setShowLoginModal(false);
    } else {
      setErrors(user.errors);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const demoEmail = "demo@aa.io";
    const demoPassword = "password";
    const user = await login(demoEmail, demoPassword);
    console.log(user)
    setAuthenticated(true);
    setUser(user)
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
          <form onSubmit={onLogin}>
            <button
              onClick={() => setShowLoginModal((prev) => !prev)}
            >
              <i id="close-icon" className="far fa-times fa-2x"></i>
            </button>
            <div>
              {errors.map((error) => (
                <div>{error}</div>
              ))}
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
              />
              <button type="submit">Login</button>
              <button onClick={demoLogin}>
                Login as Demo
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default LoginForm;
