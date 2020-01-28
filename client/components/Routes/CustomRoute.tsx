import React, { ReactElement, ElementType } from "react";
import { Redirect, Route } from "react-router";

import useApi from "../../hooks/useApi";
import { Fixture } from "../../models/models";

interface Props {
  exact?: boolean;
  sensitive?: boolean;
  component: ElementType;
  path?: string;
  requireAuth: boolean;
  fixture?: Fixture;
}

const CustomRoute = ({
  component: Component,
  path,
  sensitive,
  exact,
  requireAuth,
  fixture
}: Props): ReactElement => {
  const { data, loading, error } = useApi("/check-token", fixture);

  return (
    <Route
      path={path}
      // sensitive
      exact={exact}
      render={(props): ReactElement => {
        if (error) return <div>Error</div>;
        if (loading) return <div>Loading</div>;
        if (
          (!loading && data?.validToken && requireAuth) ||
          (!data?.validToken && !requireAuth)
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
          (!loading && data?.validToken && !requireAuth) ||
          (!data?.validToken && requireAuth)
        )
          return <Redirect to="/" />;
        return null;
      }}
    />
  );
};

export default CustomRoute;
