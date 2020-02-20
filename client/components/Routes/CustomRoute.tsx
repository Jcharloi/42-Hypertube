import React, { ReactElement, ElementType } from "react";
import { Redirect, Route } from "react-router";

import useApi from "../../hooks/useApi";
import { Fixture } from "../../models/models";

import Loading from "./Loading";

interface Props {
  exact?: boolean;
  component: ElementType;
  path?: string;
  requireAuth: boolean;
  fixture?: Fixture;
}

const CustomRoute = ({
  component: Component,
  path,
  exact,
  requireAuth,
  fixture
}: Props): ReactElement => {
  const {
    data: { validToken },
    loading,
    error
  } = useApi("/check-token", fixture);

  return (
    <Route
      path={path}
      exact={exact}
      render={(props): ReactElement => {
        if (error) return <div>Error</div>;
        if (loading) return <Loading />;
        if (
          (!loading && validToken && requireAuth) ||
          (!loading && !validToken && !requireAuth)
        )
          return (
            <Component
              history={props.history}
              location={props.location}
              match={props.match}
              staticContext={props.staticContext}
            />
          );
        if (
          (!loading && validToken && !requireAuth) ||
          (!loading && !validToken && requireAuth)
        )
          return <Redirect to="/" />;
        return null;
      }}
    />
  );
};

export default CustomRoute;
