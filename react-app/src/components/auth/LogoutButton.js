import React from "react";
import { logout } from "../../services/auth";
import { Modal, useModalContext } from "../../context/Modal"
import { useHistory } from "react-router-dom"
const LogoutButton = () => {
  const history = useHistory();
  const {
    user,
    setUser,
    setAuthenticated,
  } = useModalContext();

  const onLogout = async (e) => {
    await logout();
    setUser(null)
    setAuthenticated(false);
    history.push("/")
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
