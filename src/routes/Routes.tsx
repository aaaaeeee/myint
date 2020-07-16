import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import HomePage from '../components/pages/HomePage';
import SignUpPage from '../components/pages/SignUpPage';
import PrivateRoute from './PrivateRoute';
import SignInPage from '../components/pages/SignInPage';
import ProfilePage from '../components/pages/ProfilePage';

interface RoutesProps {}

const Routes: React.FC<RoutesProps> = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.HOME}>
        <HomePage />
      </Route>
      <Route exact path={ROUTES.SIGN_IN}>
        <SignInPage />
      </Route>
      <Route exact path={ROUTES.SIGN_UP}>
        <SignUpPage />
      </Route>
      <PrivateRoute exact path="/">
        <div>Protected content</div>
      </PrivateRoute>
      <PrivateRoute exact path="/profile">
        <ProfilePage />
      </PrivateRoute>
      <Redirect to="/" />
    </Switch>
  );
};
export default Routes;
