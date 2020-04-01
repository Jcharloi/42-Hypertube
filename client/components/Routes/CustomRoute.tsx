import React, { ReactElement, ElementType, useEffect } from "react";
import { Redirect, Route, useHistory } from "react-router";

import useApi from "../../hooks/useApi";
import { ApiAuthResponse } from "../../models/models";

import Loading from "./Loading";

interface Props {
  authComponent?: ElementType;
  notAuthComponent?: ElementType;
  exact?: boolean;
  sensitive?: boolean;
  path?: string;
}

const CustomRoute = ({
  authComponent: AuthComponent,
  notAuthComponent: NotAuthComponent,
  path,
  sensitive,
  exact
}: Props): ReactElement => {
  const { callApi, resData, error, cancelAllRequests } = useApi<
    ApiAuthResponse,
    ApiAuthResponse
  >("/check-auth", {
    validateStatus: (status) => status >= 200 && status < 500 // 4xx is valid (2xx - 4xx)
  });
  const history = useHistory();

  useEffect(() => {
    // At each route change, we check te token validity
    const res = history.listen(() => {
      callApi();
    });
    callApi();

    return (): void => {
      res();
      cancelAllRequests();
    };
  }, []);

  return (
    <Route
      path={path}
      sensitive={sensitive}
      exact={exact}
      render={({
        history: routeHistory,
        location,
        match,
        staticContext
      }): ReactElement => {
        if (error) return <div>Error</div>;
        if (!resData) return <Loading />;

        if (AuthComponent && resData.validToken)
          return (
            <AuthComponent
              history={routeHistory}
              location={location}
              match={match}
              staticContext={staticContext}
            />
          );

        if (NotAuthComponent && !resData.validToken)
          return (
            <NotAuthComponent
              history={routeHistory}
              location={location}
              match={match}
              staticContext={staticContext}
            />
          );

        return <Redirect to={{ pathname: "/", state: { from: location } }} />;
      }}
    />
  );
};

export default CustomRoute;
