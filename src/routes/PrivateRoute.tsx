import React from 'react';

import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { RootState } from '../store/rootReducer';

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
  return (
    <Route
      path={path}
      exact={exact}
      render={
        ({ location }) =>
          isLoaded(auth) && !isEmpty(auth) ? (
            children
          ) : (
            <Redirect to={{ pathname: '/signup', state: { from: location } }} />
          )
        // eslint-disable-next-line react/jsx-curly-newline
      }
    />
  );
};
export default PrivateRoute;
