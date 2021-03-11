import React, { useState, useEffect, useRef, useCallback } from "react";
import { Modal, useModalContext } from "../../context/Modal"
import { useParams } from "react-router-dom"
import { getRideById } from "../../services/rides"
import "./RidePage.css"

const RidePage = () => {

  const { rideId } = useParams();

  const [ride, setRide] = useState();
  const [postFeed, setPostFeed] = useState(true);
  const [committedFeed, setCommittedFeed] = useState(false);

  useEffect(() => {
    (async () => {
      const ride = await getRideById(rideId)
      setRide(ride)
      console.log(ride)
    })();
  }, [])

  return (
    <>
      { ride &&

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
            <div className="ride-location">location</div>
            <div className="ride-commit-button">Commit</div>
          </div>
        </div>
      }


    </>
  )
}

export default RidePage;
