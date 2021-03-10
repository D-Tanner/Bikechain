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
    })();
  }, [])

  return (
    <>
      { ride &&

        <div className="ride-page-container">
          <div class="ride-page-grid-container">
            <div class="ride-info">Ride Info</div>
            <div class="ride-posts" id={postFeed ? "feed-selected" : ""}
              onClick={() => {
                setCommittedFeed(false)
                setPostFeed(true)
              }}
            >Posts</div>
            <div class="ride-committed" id={committedFeed ? "feed-selected" : ""}
              onClick={() => {
                setCommittedFeed(true)
                setPostFeed(false)
              }}
            >Committed Riders</div>
            <div class="ride-main-feed">
              {postFeed && <div>Posts</div>}
              {committedFeed && <div>Committed</div>}
            </div>
            <div class="ride-location">location</div>
          </div>
        </div>
      }


    </>
  )
}

export default RidePage;
