import React, { useState } from "react";
import { Modal, useModalContext } from "../../context/Modal"

const HomePage = () => {


  const {
    authenticated,
    setAuthenticated,
  } = useModalContext();

  return (
    <h1>
      Home Page
    </h1>
  )
}


export default HomePage;
