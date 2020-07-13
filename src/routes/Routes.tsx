import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import HomePage from "../components/pages/HomePage";
import SignUpPage from "../components/pages/SignUpPage";

interface RoutesProps {}

const Routes: React.FC<RoutesProps> = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.LANDING}>
        <HomePage />
      </Route>
      <Route exact path={ROUTES.SIGN_UP}>
        <SignUpPage></SignUpPage>
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
export default Routes;
