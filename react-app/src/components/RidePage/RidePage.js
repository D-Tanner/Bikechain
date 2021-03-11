import React, { useState, useEffect, useRef, useCallback } from "react";
import { Modal, useModalContext } from "../../context/Modal"
import { useParams } from "react-router-dom"
import { getRideById } from "../../services/rides"
import { unCommitToRide, commitToRide } from "../../services/rides"

import "./RidePage.css"

const RidePage = () => {

  const { rideId } = useParams();
  const { user } = useModalContext();
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
        if (committed.id === user.id) {
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
              {postFeed && <div>Posts</div>}
              {committedFeed && <div>Committed</div>}
            </div>
            <div className="ride-location">
              {isCommitted && <button
                onClick={async () => {
                  const result = await unCommitToRide(user.user.id, ride.id)
                  setIsCommitted(false)
                  setRide(result)
                }}
              >Leave Ride</button>}
              {!isCommitted && <button
                onClick={async () => {
                  const result = await commitToRide(user.user.id, ride.id)
                  setIsCommitted(true)
                  setRide(result)
                }}
              >Commit</button>}
            </div>
            {/* <div className="ride-commit-button">Commit</div> */}
          </div>
        </div>
      }


    </>
  )
}

export default RidePage;
