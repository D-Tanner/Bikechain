import React, { useState, useEffect, useRef, useCallback } from "react";
import { Modal, useModalContext } from "../../context/Modal"
import { useParams, Link } from "react-router-dom"
// import { getRideById } from "../../services/rides"
import "./ProfilePage.css"

const ProfilePage = () => {

  const [user, setUser] = useState({});
  const [rides, setRides] = useState();
  const [committedRides, setCommittedRides] = useState()
  const [following, setFollowing] = useState()
  const [ridePage, setRidePage] = useState(true)
  const [commitPage, setCommitPage] = useState(false)
  const [followingPage, setFollowingPage] = useState(false)

  console.log(rides)
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
      setFollowing(user.following);
    })();
  }, [userId]);

  return (
    <>
      { user && <div className="profile-page-container">
        <div className="grid-container">
          <div className="item1" id={ridePage ? "is-selected" : ""}
            onClick={() => {
              setRidePage(true)
              setCommitPage(false)
              setFollowingPage(false)
            }}
          >Your rides</div>
          <div className="item2" id={commitPage ? "is-selected" : ""}
            onClick={() => {
              setRidePage(false)
              setCommitPage(true)
              setFollowingPage(false)
            }}
          >Committments</div>
          <div className="item3" id={followingPage ? "is-selected" : ""}
            onClick={() => {
              setRidePage(false)
              setCommitPage(false)
              setFollowingPage(true)
            }}
          >Following</div>
          <div className="profile-info">Profile</div>
          <div className="main-feed">
            {ridePage && rides && (
              <div className='ride-feed-container'>{
                rides.map((ride, idx) => (
                  <div>{ride.title}</div>
                ))
              }
              </div>
            )}
            {commitPage && (
              <div>Commitments</div>
            )}
            {followingPage && (
              <div>Following</div>
            )}
          </div>
        </div>
      </div>}

    </>
  )
}

export default ProfilePage;
