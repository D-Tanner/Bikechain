import React, { useState, useEffect } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { login } from "../../services/auth";
import { Modal, useModalContext } from "../../context/Modal"
import { updatePost, deleteImage, deletePost } from "../../services/rides"
import { editUser } from "../../services/auth"
import DeleteIcon from "@material-ui/icons/Delete"
import CloseIcon from '@material-ui/icons/Close';

import csc from "country-state-city";
import "./EditUser.css"

const EditUser = () => {



  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [level, setLevel] = useState("");
  const [errors, setErrors] = useState([]);
  const [profileImage, setProfileImage] = useState(null)
  const [riderImage, setRiderImage] = useState("")

  const {
    user,
    setUser,
    showEditUserModal,
    setShowEditUserModal,
  } = useModalContext();

  const listOfStates = csc.getStatesOfCountry("US");
  const listOfCities = csc.getCitiesOfState("US", stateCode);

  useEffect(() => {
    if (user) {
      if (user.user.profileImage) {
        const name = user.user.profileImage.split(".s3.amazonaws.com/")[1]
        setProfileImage(name);
      }
      setLevel(user.user.level)
    }
  }, []);

  useEffect(() => {
    if (level) {
      if (level === "Novice") setRiderImage("/novice.png")
      if (level === "Intermediate") setRiderImage("/intermediate.png")
      if (level === "Intermediate+") setRiderImage("/intermediate-plus.png")
      if (level === "Advanced") setRiderImage("/advanced.png")
      if (level === "Advanced+") setRiderImage("/advanced-plus.png")
    }
  }, [level])

  const editUserById = async (e) => {
    e.preventDefault();

    const updated = await editUser(user.user.id, city, state, level, profileImage);
    if (!updated.errors) {
      setUser(updated)
      setShowEditUserModal(false);
    } else {
      setErrors(errors);
    }

  };

  const updateState = (e) => {
    setState(e.target.value);
    const stateName = e.target.value;
    let result = "";
    listOfStates.forEach((state) => {
      if (state.name === stateName) {
        result = state.isoCode;
      }
    });
    setStateCode(result);
  };

  const updateCity = (e) => {
    setCity(e.target.value);
  };

  const updateLevel = (e) => {
    setLevel(e.target.value)
  }

  const chooseImage = () => {
    document.getElementById('file').click();
  };

  const updateProfileImage = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(file);
  };

  const deleteImage = (e) => {
    setProfileImage(null)
  }


  return (
    <>
      {showEditUserModal && user && (
        <Modal onClose={() => setShowEditUserModal(false)}>
          <div className="edit-user-modal-container-width">
            <div className="level-rider-image-container">
              {level && <img id="rider-image" src={riderImage}></img>}
            </div>
            <form onSubmit={editUserById} className="create-post-form">
              <div className="edit-user-close-button-container">
                <div>
                  <CloseIcon className="edit-user-close-button-icon" onClick={() => setShowEditUserModal((prev) => !prev)}></CloseIcon>
                </div>
              </div>
              <div>
                {errors.map((error) => (
                  <div className="edit-user-errors">{error}</div>
                ))}
              </div>
              <div>
                {profileImage &&
                  <div className="selecting-images-container">

                    <div
                      onClick={() => deleteImage()}
                      className="delete-image-div"
                    >
                      <DeleteIcon />
                    </div>
                    <div className="selected-image-label">
                      {profileImage.name}
                      {!profileImage.name && profileImage}
                    </div>
                  </div>
                }
                <input className="choose-profile-image" type="button" id="loadFile" value="Choose a Profile Image" onClick={chooseImage} />
                <input placeholder="Choose a Profile Image" className="hide-this-button" id="file" type="file" name="image" onChange={updateProfileImage} />
              </div>
              <div className="location-field-container">
                <select className="location-state" name="state" onChange={updateState} value={state} required>
                  <option value="" disabled selected>
                    State
                </option>
                  {listOfStates.map((state) => (
                    <option key={state.name}>{state.name}</option>
                  ))}
                </select>
                <select className="location-city" name="city" onChange={updateCity} value={city}>
                  <option value="" disabled selected>
                    City
                </option>
                  {stateCode !== "" &&
                    listOfCities.map((city) => (
                      <option key={city.name}>{city.name}</option>
                    ))}
                </select>
              </div>
              <div className="level-of-rider-container-edit">
                <select className="level-of-rider-edit" name="level" onChange={updateLevel} value={level} required>
                  <option value="" disabled selected>Level</option>
                  <option value="Novice">Novice</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Intermediate+">Intermediate+</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Advanced+">Advanced+</option>
                </select>
              </div>
              <div className="edit-user-submit-cancel-container">
                <button className="edit-user-submit-button" type="submit">Update</button>
                <button className="edit-user-cancel-button" onClick={() => setShowEditUserModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  )
}

export default EditUser;
