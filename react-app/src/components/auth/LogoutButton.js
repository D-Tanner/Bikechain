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
    history.push("/")
    setUser(null)
    setAuthenticated(false);
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
