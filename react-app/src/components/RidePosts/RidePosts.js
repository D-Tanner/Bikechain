import React, { useState } from "react";
import { Modal, useModalContext } from "../../context/Modal"
import { createPost } from "../../services/rides"
import DeleteIcon from "@material-ui/icons/Delete"
import CloseIcon from '@material-ui/icons/Close';

import "./RidePosts.css"

const PostForm = ({ rideId }) => {
  const [content, setContent] = useState()

  const [images, setAdditionalImages] = useState([])
  const [errors, setErrors] = useState([]);
  const {
    user,
    showPostModal,
    setShowPostModal, } = useModalContext();

  const postNewPost = async (e) => {
    e.preventDefault()
    const newPost = await createPost(user.user.id, rideId, content, images)

    if (newPost.errors) {
      setErrors(newPost.errors)
    } else {
      setShowPostModal(false)
    }
  };

  const deleteImageByName = (name) => {
    let result = [];
    images.forEach((Filelist) => {
      let file = Filelist;
      let newFile = [];
      for (let key in file) {
        let number = Number(key);
        if (number || number === 0) {
          if (file[key].name !== name) {
            newFile.push(file[key]);
          }
        }
      }
      if (newFile.length > 0) result.push(newFile);
    });
    setAdditionalImages(result);
  };

  const updateContent = (e) => {
    setContent(e.target.value)
  };

  const chooseAdditionalImage = () => {
    document.getElementById('additionalFile').click();
  };

  const updateAdditionalImages = (e) => {
    const file = e.target.files;
    if (file) setAdditionalImages((prev) => [...prev, file]);
  };

  return (
    <>
      {showPostModal && (
        <Modal onClose={() => setShowPostModal(false)}>
          <div className="post-modal-container-width">

            <form onSubmit={postNewPost} className="create-post-form">
              <div className="post-close-button-container">
                <div>
                  <CloseIcon className="close-button-icon" onClick={() => setShowPostModal((prev) => !prev)}></CloseIcon>
                </div>
              </div>
              <div>
                {errors.map((error, idx) => (
                  <ul className="errors" key={idx}>{error}</ul>
                ))}
              </div>
              <div>
                <textarea
                  type='text'
                  className="input-text-create-post"
                  rows="10"
                  name='description'
                  placeholder="Get ready to ride!"
                  onChange={updateContent}
                  required
                ></textarea>
              </div>
              <div>
                {images &&
                  images.map((fileList) =>
                    Array.from(fileList).map((image) => (

                      <div className="selecting-images-container">
                        <div
                          onClick={() => deleteImageByName(image.name)}
                          className="delete-image-div"
                        >
                          <DeleteIcon />
                        </div>
                        <div classname="selected-image-label">
                          {image.name}
                        </div>
                      </div>

                    ))
                  )}
                <input className="post-choose-additional-image-button" type="button" id="loadFile" value="Choose a Additional Images" onClick={chooseAdditionalImage} />
                {/* <label for="image">   {additionalImages}</label> */}
                <input className="hide-this-button" placeholder="Choose a Thumbnail Image" multiple="true" id="additionalFile" type="file" name="image" onChange={updateAdditionalImages} />
              </div>

              <div className="post-cancel-container">
                <button className="post-submit-button" type="submit">Post</button>
                <button className="post-cancel-button" onClick={() => setShowPostModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  )
}

export default PostForm;
