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
        <div class="grid-container">
          <div class="item1">Your rides</div>
          <div class="item2">Committments</div>
          <div class="item3">Following</div>
          <div class="item4">Profile</div>
          <div class="item5">Main</div>
          {/* <div class="item6">Right</div> */}
          {/* <div class="item7">Left</div> */}
          <div class="item8">Footer</div>
        </div>
      </div>}

    </>
  )
}

export default ProfilePage;
