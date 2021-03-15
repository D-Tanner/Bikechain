import React, { useState, useEffect, useRef, useCallback } from "react";
import Moment from "react-moment"
import { Modal, useModalContext } from "../../context/Modal"
import { useParams, Link } from "react-router-dom"
import "./ProfilePage.css"
import { unFollowRider, followRider } from "../../services/rides"
import EditUser from '../../components/EditUser/EditUser'
import { getLevel, getImage, getDefaultImage } from '../../services/getImages'

const ProfilePage = () => {

  const [currentUser, setCurrentUser] = useState({});
  const [rides, setRides] = useState();
  const [committedRides, setCommittedRides] = useState()
  const [following, setFollowing] = useState()
  const [ridePage, setRidePage] = useState(true)
  const [commitPage, setCommitPage] = useState(false)
  const [followingPage, setFollowingPage] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const { user, setUser, showEditUserModal, setShowEditUserModal, } = useModalContext();
  const [riderImage, setRiderImage] = useState('')

  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const users = await response.json();
      setCurrentUser(users.user);
      setRides(users.rides);
      setCommittedRides(users.committedRides);
      setFollowing(users.following);
      console.log(users)
    })();
  }, [userId, showEditUserModal]);




  useEffect(() => {
    if (currentUser && user) {
      user.following.map((followers) => {
        if (followers.id === currentUser.id) {
          setIsFollowing(true)
        }
      })
    }
    if (currentUser) {
      const result = getLevel(currentUser.level)
      setRiderImage(result)
    }
    // console.log(user)
  }, [currentUser, user])


  return (
    <>
      {showEditUserModal && <EditUser />}
      { currentUser && user.user && <div className="profile-page-container">
        <div className="grid-container">
          <div className="item1" id={ridePage ? "is-selected" : ""}
            onClick={() => {
              setRidePage(true)
              setCommitPage(false)
              setFollowingPage(false)
            }}
          >
            {currentUser.id === user.user.id ? "Your rides" : "Their rides"}
          </div>
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
          <div className="profile-info">
            {<div className="image-profile-page-container">
              {!currentUser.profileImage && <img className="default-profile-image-page" src={"/default-profile-image.png"}></img>}
              {currentUser.profileImage && <img className="profile-image-page" src={currentUser.profileImage}></img>}
            </div>}
            <div className="current-username">
              <div className="username-image-container">
                <img id="username-image" src={riderImage}></img>
              </div>
              <div className="actual-username">
                {currentUser.username}
              </div>
            </div>
            <div className="current-location">{currentUser.city}, {currentUser.state}</div>
            <div className="current-level">{currentUser.level}</div>
            {currentUser && user && (<div>
              {currentUser.id === user.user.id && <button className="edit-a-user"
                onClick={() => setShowEditUserModal(true)}>Edit</button>}
              {currentUser.id !== user.user.id && <div>{isFollowing ?
                <button
                  className="edit-a-user"
                  onClick={async () => {
                    const result = await unFollowRider(user.user.id, currentUser.id)
                    setIsFollowing(false)
                    setUser(result)
                  }}
                >Unfollow</button> :
                <button
                  className="edit-a-user"
                  onClick={async () => {
                    const result = await followRider(user.user.id, currentUser.id)
                    setIsFollowing(true)
                    setUser(result)
                  }}
                >Follow</button>
              }</div>}
            </div>)}
          </div>
          <div className="main-feed">
            {ridePage && rides && (
              <div className='ride-feed-container'>{
                rides.map((ride, idx) => (
                  < Link key={idx} to={`/rides/${ride.id}`} className="link">
                    <div className="ride-grid-container">
                      <div className="level-image-feed">
                        <img id="level-image-feed" src={getImage(ride.level)}></img>
                      </div>
                      <div className="ride-title">{ride.title}</div>
                      {user.user.id === currentUser.id && <div className="ride-content">From You</div>}
                      {user.user.id !== currentUser.id && <div className="ride-content">From {currentUser.username}</div>}
                      <div className="ride-date"><Moment format="MMM D" date={ride.date} /></div>
                    </div>
                  </Link>
                ))
              }
              </div>
            )}
            {commitPage && committedRides && (
              <div className='ride-feed-container'>{
                committedRides.map((ride, idx) => (

                  <Link key={idx} to={`/rides/${ride.id}`} className="link">
                    <div className="ride-grid-container">
                      <div className="level-image-feed">
                        <img id="level-image-feed" src={getImage(ride.level)}></img>
                      </div>
                      <div className="ride-level-image"></div>
                      <div className="ride-title">{ride.title}</div>
                      <div className="ride-content">From {ride.user.username}</div>
                      <div className="ride-date"><Moment format="MMM D" date={ride.date} /></div>
                    </div>
                  </Link>
                ))
              }
              </div>
            )}
            {followingPage && following && (
              <div className='ride-feed-container'>{
                following.map((user, idx) => (

                  <Link key={idx}
                    to={`/profile/${user.id}`}
                    className="link"
                    onClick={() => {
                      setIsFollowing(false)
                      setRidePage(true)
                      setCommitPage(false)
                      setFollowingPage(false)
                    }}
                  >
                    <div className="following-grid-container">
                      {/* <div className="profile-image">

                      </div> */}
                      <div className="user-level">
                        <div className="level-image-feed">
                          <img id="level-image-feed" src={getLevel(user.level)}></img>
                        </div>
                      </div>
                      <div className="user-username">{user.username}</div>
                      <div className="user-location">{user.city}, {user.state}</div>
                    </div>
                  </Link>
                ))
              }
              </div>
            )}
          </div>
        </div>
      </div>}

    </>
  )
}

export default ProfilePage;
