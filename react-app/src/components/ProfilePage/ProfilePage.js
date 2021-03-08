import React, { useState, useEffect, useRef, useCallback } from "react";
import Moment from "react-moment"
import { Modal, useModalContext } from "../../context/Modal"
import { useParams, Link } from "react-router-dom"
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

                  <Link key={idx} to={`/rides/${ride.id}`} className="link">
                    <div className="ride-grid-container">
                      <div className="level-image">image</div>
                      <div className="ride-title">{ride.title}</div>
                      <div className="ride-content">{ride.content}</div>
                      <div className="ride-date"><Moment format="MMM D" date={ride.date} /></div>
                    </div>
                  </Link>
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
