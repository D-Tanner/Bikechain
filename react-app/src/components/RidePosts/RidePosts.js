import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import { Modal, useModalContext } from "../../context/Modal"

const PostForm = () => {

  const {
    showPostModal,
    setShowPostModal, } = useModalContext();

  return (
    <>
      {showPostModal && (
        <Modal onClose={() => setShowPostModal(false)}>
          <div>Hello</div>
        </Modal>
      )}
    </>
  )
}

export default PostForm;
