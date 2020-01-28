import React, { ReactElement, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";

import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import API from "../../util/api";
import useApi from "../../hooks/useApi";
import Loading from "../Routes/Loading";
import Error from "../Error";
import useStyles from "./Profile.styles";
import ShowComments from "./ShowComments";

interface UrlParam {
  username: string;
}
interface Comment {
  movieName: string;
  date: number;
  name: string;
  body: string;
  stars: number;
  _id: number;
}

interface User {
  username: string;
  firstName: string;
  email: string;
  lastName: string;
  picture: string;
}

const MyProfile = (): ReactElement => {
  const userId = "5deef4dc80a440152717dbcf";
  const body = {
    userId
  };

  const { data } = useApi<User>(`/user/`);
  const { username } = data || {};
  console.log(username);
  const classes = useStyles({});
  return (
    <div className={classes.containerProfile}>
      <Paper className={classes.containerUser}>
        <div className={classes.containerPicture}>
          <Avatar
            alt="Test"
            src={`${window.location.origin}/api/data/avatar/${data?.picture}`}
            className={classes.large}
          />
        </div>
        <div className={classes.containerInfo}>
          <h1>
            {data?.firstName} {data?.lastName}
          </h1>
          <p>{data?.username}</p>
        </div>
        <Paper elevation={3} />
      </Paper>
      <ShowComments username={username} />
    </div>
  );
};

export default MyProfile;
