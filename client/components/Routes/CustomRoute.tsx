import React, { ReactElement, ElementType } from "react";
import { Redirect, Route } from "react-router";

import useApi from "../../hooks/useApi";
import { Fixture, ApiAuthResponse } from "../../models/models";

import Loading from "./Loading";

interface Props {
  authComponent?: ElementType;
  notAuthComponent?: ElementType;
  exact?: boolean;
  path?: string;
  fixture?: Fixture;
}

const CustomRoute = ({
  authComponent: AuthComponent,
  notAuthComponent: NotAuthComponent,
  path,
  exact,
  fixture
}: Props): ReactElement => {
  const { data, loading, error } = useApi<ApiAuthResponse, ApiAuthResponse>(
    "/check-auth",
    fixture
  );

  return (
    <Route
      path={path}
      exact={exact}
      render={(): ReactElement => {
        if (error?.response?.status >= 500 && error.response.status <= 599)
          return <div>Error</div>;
        if (loading) return <Loading />;

        if (AuthComponent && data?.validToken) return <AuthComponent />;
        if (NotAuthComponent && !data?.validToken) return <NotAuthComponent />;
        if (!loading) return <Redirect to="/" />;

        return null;
      }}
    />
  );
};

export default CustomRoute;
