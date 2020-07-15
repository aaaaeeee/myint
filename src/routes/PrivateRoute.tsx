import React from 'react';

import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty, useFirebase } from 'react-redux-firebase';
import { RootState } from '../store/rootReducer';
import * as ROUTES from '../constants/routes';

interface PrivateRouteProps {
  path: string;
  exact: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  path,
  exact,
}) => {
  const auth = useSelector((state: RootState) => state.firebase.auth);
  const firebase = useFirebase();

  firebase.auth().onAuthStateChanged(async (authUser) => {
    console.log('*****authUser', authUser);
  });
  return (
    <Route
      path={path}
      exact={exact}
      render={
        ({ location }) =>
          isLoaded(auth) && !isEmpty(auth) ? (
            children
          ) : (
            <Redirect
              to={{ pathname: ROUTES.HOME, state: { from: location } }}
            />
          )
        // eslint-disable-next-line react/jsx-curly-newline
      }
    />
  );
};
export default PrivateRoute;
