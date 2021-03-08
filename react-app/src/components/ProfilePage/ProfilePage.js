import React, { useState, useEffect, useRef, useCallback } from "react";
import { Modal, useModalContext } from "../../context/Modal"
import { useParams } from "react-router-dom"
// import { getRideById } from "../../services/rides"
import "./ProfilePage.css"

const ProfilePage = () => {

  const [user, setUser] = useState({});
  const [rides, setRides] = useState({});
  const [committedRides, setCommittedRides] = useState({})



  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user.user);
      setRides(user.rides);
      setCommittedRides(user.committedRides);
    })();
  }, [userId]);

  return (
    <>
      { user && <div className="profile-page-container">
        <h1>
          Welcome, {user.username}
        </h1>
      </div>}


    </>
  )
}

export default ProfilePage;
