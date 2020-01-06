import React, { ReactElement } from "react";

import useApi from "../../hooks/useApi";

import SignUp from "../Authentication/SignUp";

const Home = (): ReactElement => {
  const {
    data: { validToken },
    loading,
    error
  } = useApi("/check-token");

  if (error) {
    return <div>Error</div>;
  }
  if (loading) {
    return <div>Loading</div>;
  }
  if (!validToken) {
    return <SignUp />;
  }

  return <div>Home sweet home;</div>;
};

export default Home;
