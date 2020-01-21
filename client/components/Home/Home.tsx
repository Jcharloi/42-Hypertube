import React, { ReactElement } from "react";

import useApi from "../../hooks/useApi";

import Loading from "../Routes/Loading";
import Authentication from "../Authentication/Authentication";

const Home = (): ReactElement => {
  const {
    data: { validToken },
    loading,
    error
  } = useApi("/check-auth");

  if (error) {
    return <div>Error</div>;
  }
  if (loading) {
    return <Loading />;
  }
  if (!validToken) {
    return <Authentication />;
  }

  return <div>Home sweet home;</div>;
};

export default Home;
