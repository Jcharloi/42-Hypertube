import React, { ReactElement } from "react";

import Typography from "@material-ui/core/Typography";

import useApi from "../../hooks/useApi";

import SignUp from "../Authentication/SignUp";

import { useHomeStyles } from "./styles";

import Feed from "./Feed";
import RecentVideos from "./RecentVideos";
import Film from "./FeaturedMovie";

const Home = (): ReactElement => {
  const {
    data: { validToken },
    loading,
    error
  } = useApi("/check-token");
  const classes = useHomeStyles({});

  if (error) {
    return <div>Error</div>;
  }
  if (loading) {
    return <div>Loading</div>;
  }
  if (!validToken) {
    return <SignUp />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography variant="h1">Welcome Julien</Typography>
        <Typography variant="h2">Start browsing videos</Typography>
      </div>
      <div className={classes.mainContent}>
        <div className={classes.feedContainer}>
          <Feed />
        </div>
        <div className={classes.filmContainer}>
          <Film />
        </div>
      </div>
      <div>
        <RecentVideos />
      </div>
    </div>
  );
};

export default Home;
