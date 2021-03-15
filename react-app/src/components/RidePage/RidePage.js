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
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Moment from "react-moment"
import lightBlue from '@material-ui/core/colors/lightBlue'


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
              <div className="ride-info-grid">
                <div className="ridepage-level-image-container">
                  <img id="ridepage-level-image" src={getImage(ride.level)}></img>
                </div>
                <div className="ride-info-title">{ride.title}</div>
                <div className="ride-info-content">{ride.content}</div>
                <div className="ride-info-date"><Moment format="MMM D" date={ride.date} /></div>
                <div className="ride-info-local">
                  {ride.isLocal && (
                    <div className="ride-local-check">
                      <div>
                        <CheckCircleIcon style={{ fontsize: 50, color: lightBlue[600] }}></CheckCircleIcon>
                      </div>
                      <div className="ride-local-check-label">
                        Local
                  </div>
                    </div>)}
                </div>
                <div className="ride-info-edit">

                  {ride && user && ride.user.id === user.user.id && (
                    <button
                      className="edit-a-ride-button"
                      onClick={() => history.push(`/rides/${ride.id}/edit`)}
                    >Edit</button>
                  )}
                </div>
              </div>
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
                <div className="post-feed-container">
                  {posts.map((post) => (
                    <div className="each-post-in-feed">

                      <div className="posts-image-profile-page-container">
                        {!post.user.profileImage && <img className="posts-default-profile-image-page" src={"/default-profile-image.png"}></img>}
                        {post.user.profileImage && <img className="posts-profile-image-page" src={post.user.profileImage}></img>}
                      </div>
                      <div className="posts-username">{post.user.username}</div>

                      <div className="posts-content">{post.content}</div>
                      {user && post.user.id === user.user.id && <div className="edit-a-post-button-container"><button
                        className="edit-a-post-button"
                        onClick={() => {
                          setSelectedPost(post)
                          setShowEditPostModal((prev) => !prev)
                        }}>Edit</button></div>}
                      <div className="center-post-images">
                        {post.images.map((image) => (
                          // <div className="center-post-images">
                          <div className="images-in-post-container">
                            <img className="images-in-post" src={image.imageUrl}></img>
                          </div>
                          // </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>}
              {committedFeed && <div>
                {ride.committedRiders.map((rider, idx) => (
                  <div className="give-riders-space">

                    <Link key={idx}
                      to={user !== null && `/profile/${rider.id}`}
                      onClick={() => {
                        if (user === null) {
                          setShowLoginModal(true)
                        }
                      }}
                      className="link"
                    >
                      <div className="committed-riders-grid-container">
                        <div className="user-level">
                          <div className="level-image-feed">
                            <img id="level-image-feed" src={getLevel(rider.level)}></img>
                          </div>
                        </div>
                        <div className="user-username">{rider.username}</div>
                        <div className="user-location">{rider.city}, {rider.state}</div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>}
            </div>
            <div className="ride-location">
              {isCommitted && user &&
                <div>
                  <div>

                    <button
                      className="leave-a-ride-button"
                      onClick={async () => {
                        const result = await unCommitToRide(user.user.id, ride.id)
                        setIsCommitted(false)
                        setRide(result)
                      }}
                    >Leave Ride</button>
                  </div>
                  <div>
                    <button
                      className="leave-a-ride-button"
                      onClick={() => setShowPostModal(prev => !prev)}>Post</button>
                  </div>
                </div>
              }
              {!isCommitted && user &&
                <div>
                  <div>
                    <button
                      className="leave-a-ride-button"
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
