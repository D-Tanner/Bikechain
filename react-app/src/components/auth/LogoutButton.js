import React from "react";
import { logout } from "../../services/auth";
import { useModalContext } from "../../context/Modal"
import { useHistory } from "react-router-dom"
const LogoutButton = () => {
  const history = useHistory();
  const {
    setUser,
    setAuthenticated,
  } = useModalContext();

  const onLogout = async (e) => {
    await logout();
    history.push("/")
    setUser(null)
    setAuthenticated(false);
  };

  return <button className="nav-logout" onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
