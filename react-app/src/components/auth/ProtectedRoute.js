import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useModalContext } from '../../context/Modal'

const ProtectedRoute = props => {

  const { setShowLoginModal } = useModalContext();

  return (
    <Route {...props}>
      {(props.authenticated) ? props.children : <Redirect to="/" />}
      {/* {(props.authenticated) ? props.children : setShowLoginModal(true)} */}
    </Route>
  )
};


export default ProtectedRoute;
