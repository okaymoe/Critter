import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/Profile';
import { authenticate } from './store/session';
import { getCreets } from './store/creets';
import Home from './components/Home';
import Sidebar from './components/Sidebar/Sidebar';
import ProfileCreets from './components/Profile';
import { getUsers } from './store/users';
import EditCreets from './components/Creets/EditCreets';
import ViewCreet from './components/ViewCreet';
import EditComment from './components/Comments/EditComment';
import { getComments } from './store/comments';
import OneComment from './components/Comments/OneComment';
import ViewComment from './components/ViewComment';
import Splash from './components/Splash';



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(getUsers());
      await dispatch(getCreets());
      await dispatch(getComments());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>

      <Switch>
        <Route path="/" exact={true}>
            <Splash />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <ProfileCreets />
        </ProtectedRoute>
        <ProtectedRoute path='/creets/edit/:creetId' exact={true} >
          <EditCreets />
        </ProtectedRoute>
        <ProtectedRoute path='/creets/:creetId' exact={true} >
          <ViewCreet />
        </ProtectedRoute>
        <ProtectedRoute path='/comments/edit/:commentId' exact={true} >
          <EditComment />
        </ProtectedRoute>
        <ProtectedRoute path='/comments/:commentId' exact={true} >
          <ViewComment />
        </ProtectedRoute>
        <ProtectedRoute path='/home' exact={true}>
          <Home/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
