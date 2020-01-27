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

const Profile = ({
  match: {
    params: { username }
  }
}: RouteComponentProps<UrlParam>): ReactElement => {
  const { data, loading, error, setUrl } = useApi(`/user/${username}`);
  const data2 = useApi(`/user-comments/${username}`);
  // console.log(data2);
  const arrayComments = Object.values(data2.data);
  // console.log(data2.data);
  const classes = useStyles({});
  // const timestampToString = (date: string) => {
  //   const date = new Date(date);
  //   const hours = date.getHours();
  // };
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <div className={classes.containerProfile}>
      <Paper className={classes.containerUser}>
        <div className={classes.containerPicture}>
          <Avatar
            alt="Test"
            src={`${window.location.origin}/api/data/avatar/${data.picture}`}
            className={classes.large}
          />
        </div>
        <div className={classes.containerInfo}>
          <h1>
            {data.firstName} {data.lastName}
          </h1>
          <p>{data.username}</p>

          {/* <p>{data.lastName}</p> */}
        </div>
        <Paper elevation={3} />
      </Paper>
      <Paper className={classes.containerHistory}>
        <h2 className={classes.titleHistory}>Last comments : </h2>
        {arrayComments.map((element: Comment) => {
          const date = new Date(element.date);
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ];
          console.log(date);
          return (
            <div className={classes.containerComment}>
              <div className={classes.containerMovieInfos}>
                <Rating name="read-only" value={element.stars} readOnly />
                <Typography style={{ marginLeft: "8px" }} variant="subtitle1">
                  {element.movieName}
                </Typography>
              </div>
              <Typography className={classes.commentDate} variant="caption">
                {date.getDate()} {monthNames[date.getMonth()]}{" "}
                {date.getFullYear()}
              </Typography>
              <p>{element.body}</p>
            </div>
          );
        })}
      </Paper>
    </div>
  );
};

export default Profile;
