import React, { useState, useEffect, useRef, useCallback } from "react";
import { Modal, useModalContext } from "../../context/Modal"
import { useParams, Link, useHistory } from "react-router-dom"
import { unCommitToRide, commitToRide, getRideById } from "../../services/rides"
import "./RidePage.css"
import "../ProfilePage/ProfilePage.css"
import RidePost from "../RidePosts/RidePosts"
import EditPost from "../EditPost/EditPost"
import LoginForm from "../auth/LoginForm"
import { getLevel, getImage, getDefaultImage } from '../../services/getImages'

const RidePage = () => {

  const { rideId } = useParams();
  const history = useHistory();
  const { user,
    showPostModal,
    setShowPostModal,
    showLoginModal,
    setShowLoginModal,
    showEditPostModal,
    setShowEditPostModal,
  } = useModalContext();

  const [ride, setRide] = useState();
  const [posts, setPosts] = useState();
  const [postFeed, setPostFeed] = useState(true);
  const [committedFeed, setCommittedFeed] = useState(false);
  const [isCommitted, setIsCommitted] = useState(false)
  const [selectedPost, setSelectedPost] = useState()

  useEffect(() => {
    (async () => {
      const ride = await getRideById(rideId)
      setRide(ride)
    })();
  }, [showPostModal, showEditPostModal])

  useEffect(() => {
    if (ride) {
      ride.committedRiders.map((committed) => {
        if (user && committed.id === user.user.id) {
          setIsCommitted(true)
        }
      })
      const sortedPosts = ride.posts.slice();
      setPosts(
        sortedPosts.sort((postOne, postTwo) => {
          return postTwo.id - postOne.id;
        })
      );
    }
  }, [ride])


  return (
    <>
      {showPostModal && <RidePost rideId={rideId} />}
      {showEditPostModal && <EditPost post={selectedPost} />}

      { ride &&
        <div className="ride-page-container">
          <div className="ride-page-grid-container">
            <div className="ride-info">
              <div>{ride.title}</div>
              <div>{ride.content}</div>
              {ride && user && ride.user.id === user.user.id && (
                <button
                  onClick={() => history.push(`/rides/${ride.id}/edit`)}
                >Edit</button>
              )}
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
            >Committed Riders ({ride.committedRiders.length})</div>
            <div className="ride-main-feed">
              {postFeed && posts &&
                <div>
                  {posts.map((post) => (
                    <div>
                      <div>{post.content}</div>
                      <div>From {post.user.username}</div>
                      {user && <span>{post.user.id === user.user.id && <button onClick={() => {
                        setSelectedPost(post)
                        setShowEditPostModal((prev) => !prev)
                      }}>Edit</button>}</span>}
                    </div>
                  ))}
                </div>}
              {committedFeed && <div>
                {ride.committedRiders.map((rider, idx) => (
                  <Link key={idx}
                    to={user !== null && `/profile/${rider.id}`}
                    onClick={() => {
                      if (user === null) {
                        setShowLoginModal(true)
                      }
                    }}
                    className="link"
                  >
                    {/* <div className="following-grid-container">
                      <div className="profile-image"></div>
                      <div className="user-level">{rider.level}</div>
                      <div className="user-username">{rider.username}</div>
                      <div className="user-location">{rider.city}, {rider.state}</div>
                    </div> */}
                    <div className="committed-riders-grid-container">
                      {/* <div className="profile-image">

                      </div> */}
                      <div className="user-level">
                        <div className="level-image-feed">
                          <img id="level-image-feed" src={getLevel(rider.level)}></img>
                        </div>
                      </div>
                      <div className="user-username">{rider.username}</div>
                      <div className="user-location">{rider.city}, {rider.state}</div>
                    </div>
                  </Link>
                ))}
              </div>}
            </div>
            <div className="ride-location">
              {isCommitted && user &&
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
              {!isCommitted && user &&
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
