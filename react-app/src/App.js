import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import Navigation from "./components/Navigation/Navigation";
import CreateRide from "./components/CreateRide/CreateRide"
import RidePage from "./components/RidePage/RidePage"
import HomePage from "./components/HomePage/HomePage"
import EditRide from "./components/EditRide/EditRide"
import ProfilePage from "./components/ProfilePage/ProfilePage"
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./services/auth";
import { useModalContext } from "./context/Modal";

function App() {
  const { authenticated, setAuthenticated, user, setUser } = useModalContext();
  const [loaded, setLoaded] = useState(false);
  // const [user, setUser] = useState({})

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setUser(user)
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, []);


  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Navigation setAuthenticated={setAuthenticated} />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/rides/:rideId" exact={true}>
          <RidePage />
        </Route>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <ProtectedRoute path="/profile/:userId" exact={true} authenticated={authenticated}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/new-ride" exact={true} authenticated={authenticated}>
          <CreateRide user={user} />
        </ProtectedRoute>
        <ProtectedRoute path="/ride/:rideId/edit" exact={true} authenticated={authenticated}>
          <EditRide user={user} />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
