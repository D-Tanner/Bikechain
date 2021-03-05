import React from "react";
import { logout } from "../../services/auth";
import { Modal, useModalContext } from "../../context/Modal"

const LogoutButton = () => {

  const {

    setAuthenticated,
  } = useModalContext();

  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
