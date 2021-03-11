import React, { useState, useEffect, useRef, useCallback } from "react";
import { Modal, useModalContext } from "../../context/Modal"
import { useParams, Link } from "react-router-dom"
import { getRideById } from "../../services/rides"
import { unCommitToRide, commitToRide } from "../../services/rides"
import RidePost from "../RidePosts/RidePosts"
import "./RidePage.css"
import "../ProfilePage/ProfilePage.css"
const RidePage = () => {

  const { rideId } = useParams();
  const { user, showPostModal, setShowPostModal } = useModalContext();
  const [ride, setRide] = useState();
  const [postFeed, setPostFeed] = useState(true);
  const [committedFeed, setCommittedFeed] = useState(false);
  const [isCommitted, setIsCommitted] = useState(false)

  useEffect(() => {
    (async () => {
      const ride = await getRideById(rideId)
      setRide(ride)
      console.log(ride)
      console.log(user)
    })();
  }, [])

  useEffect(() => {
    if (ride) {
      ride.committedRiders.map((committed) => {
        if (committed.id === user.user.id) {
          setIsCommitted(true)
        }
      })
    }
  }, [ride])


  return (
    <>
      { ride && user &&

        <div className="ride-page-container">
          <div className="ride-page-grid-container">
            <div className="ride-info">
              <div>{ride.title}</div>
              <div>{ride.content}</div>
            </div>
            <div className="ride-posts" id={postFeed ? "feed-selected" : ""}
              onClick={() => {
                setCommittedFeed(false)
                setPostFeed(true)
              }}
            >Posts</div>
            <div className="ride-committed" id={committedFeed ? "feed-selected" : ""}
              onClick={() => {
                setCommittedFeed(true)
                setPostFeed(false)
              }}
            >Committed Riders</div>
            <div className="ride-main-feed">
              {postFeed &&
                <div>
                  {ride.posts.map((post) => (
                    <div>
                      <div>{post.content}</div>
                      <div>From {post.user.username}</div>
                    </div>
                  ))}
                </div>}
              {committedFeed && <div>
                {ride.committedRiders.map((rider, idx) => (
                  <Link key={idx}
                    to={`/profile/${rider.id}`}
                    className="link"
                  >
                    <div className="following-grid-container">
                      <div className="profile-image"></div>
                      <div className="user-level">{rider.level}</div>
                      <div className="user-username">{rider.username}</div>
                      <div className="user-location">{rider.city}, {rider.state}</div>
                    </div>
                  </Link>
                ))}
              </div>}
            </div>
            <div className="ride-location">
              {isCommitted &&
                <div>
                  <div>

                    <button
                      onClick={async () => {
                        const result = await unCommitToRide(user.user.id, ride.id)
                        setIsCommitted(false)
                        setRide(result)
                      }}
                    >Leave Ride</button>
                  </div>
                  <div>
                    <button onClick={() => setShowPostModal(prev => !prev)}>Post</button>
                  </div>
                </div>
              }
              {!isCommitted &&
                <div>
                  <div>
                    <button
                      onClick={async () => {
                        const result = await commitToRide(user.user.id, ride.id)
                        setIsCommitted(true)
                        setRide(result)
                      }}
                    >Commit</button>
                  </div>
                  <div>
                  </div>
                </div>}
            </div>
          </div>
        </div>
      }


    </>
  )
}

export default RidePage;
