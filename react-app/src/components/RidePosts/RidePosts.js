import React, { useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { login } from "../../services/auth";
import { Modal, useModalContext } from "../../context/Modal"
import { createPost, getRideById } from "../../services/rides"
import DeleteIcon from "@material-ui/icons/Delete"

const PostForm = ({ rideId }) => {

  const [content, setContent] = useState()
  const [description, setDescription] = useState("")

  const [images, setAdditionalImages] = useState([])
  const [errors, setErrors] = useState([]);

  const {
    user,
    showPostModal,
    setShowPostModal, } = useModalContext();

  const postNewPost = async (e) => {
    e.preventDefault()
    const newPost = await createPost(user.user.id, rideId, content, images)
    console.log(newPost)
    if (newPost.errors) {
      setErrors(newPost.errors)
    } else {
      (async () => {
        const ride = await getRideById(rideId)
        console.log(ride)
        console.log(user)
      })();
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
      result.push(newFile);
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
          <form onSubmit={postNewPost} className="create-post-form">
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
                    <div>
                      <span>
                        <span
                          onClick={() => deleteImageByName(image.name)}
                          className="delete-image-div"
                        >
                          <DeleteIcon />
                        </span>
                      </span>
                      {image.name}
                    </div>
                  ))
                )}
              <input className="choose-image" type="button" id="loadFile" value="Choose a Additional Images" onClick={chooseAdditionalImage} />
              {/* <label for="image">   {additionalImages}</label> */}
              <input className="hide-this-button" placeholder="Choose a Thumbnail Image" multiple="true" id="additionalFile" type="file" name="image" onChange={updateAdditionalImages} />
            </div>

            <div className="submit-cancel-container">
              <button className="submit-button" type="submit">Post</button>
              <button className="cancel-button" type="submit" onClick={() => setShowPostModal(false)}>Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  )
}

export default PostForm;
