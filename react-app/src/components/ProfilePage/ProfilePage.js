import React, { useState, useEffect, useRef, useCallback } from "react";
import { Modal, useModalContext } from "../../context/Modal"
import { useParams } from "react-router-dom"
// import { getRideById } from "../../services/rides"
import "./ProfilePage.css"

const ProfilePage = () => {

  const [user, setUser] = useState({});
  const [rides, setRides] = useState({});
  const [committedRides, setCommittedRides] = useState({})
  const [ridePage, setRidePage] = useState(true)
  const [commitPage, setCommitPage] = useState(false)
  const [followingPage, setFollowingPage] = useState(false)


  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      console.log(user)
      setUser(user.user);
      setRides(user.rides);
      setCommittedRides(user.committedRides);
    })();
  }, [userId]);

  return (
    <>
      { user && <div className="profile-page-container">
        <div className="grid-container">
          <div className="item1">Your rides</div>
          <div className="item2">Committments</div>
          <div className="item3">Following</div>
          <div className="profile-info">Profile</div>
          <div className="main-feed">Main</div>
        </div>
      </div>}

    </>
  )
}

export default ProfilePage;
