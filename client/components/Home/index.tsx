import React, { ReactElement } from "react";
import { useHistory } from "react-router";
import { Typography, Paper, Hidden } from "@material-ui/core";

import useApi from "../../hooks/useApi";

import SignUp from "../Authentication/SignUp";

import { useHomeStyles } from "./styles";

import Feed from "./Feed";
import RecentVideos from "./RecentMedias";
import FeaturedMedia from "./FeaturedMedia";

const Home = (): ReactElement => {
  const history = useHistory();
  const {
    data: { validToken },
    loading,
    error
  } = useApi("/check-token");
  const classes = useHomeStyles({});

  if (error) {
    history.push("/error");
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
        <Hidden xsDown>
          <Typography variant="h1">Welcome Julien</Typography>
          <Typography variant="h2">Start browsing videos</Typography>
        </Hidden>
        <Hidden smUp>
          <Typography variant="h4">Welcome Julien</Typography>
          <Typography variant="h5">Start browsing videos</Typography>
        </Hidden>
      </div>
      <div className={classes.mainContent}>
        <div className={classes.feedContainer}>
          <Feed />
        </div>
        <div className={classes.filmContainer}>
          <FeaturedMedia />
        </div>
      </div>
      <div className={classes.subContent}>
        <div className={classes.recentVideosContainer}>
          <RecentVideos />
        </div>
        <div className={classes.dataContainer}>
          <Paper className={classes.infosContainer}>
            <div>User online</div>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Home;
