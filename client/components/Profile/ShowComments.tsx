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

interface Comment {
  movieName: string;
  date: number;
  name: string;
  body: string;
  stars: number;
  _id: number;
}

interface Props {
  username: string;
}

const ShowComment = ({ username }: Props): ReactElement => {
  const classes = useStyles({});
  const { data, loading, error, setUrl } = useApi("");
  useEffect(() => {
    if (username !== undefined) {
      setUrl(`/user-comments/${username}`);
    }
  }, [username]);

  if (error) {
    return <Error />;
  }
  return (
    <div>
      <Paper className={classes.containerHistory}>
        <h2 className={classes.titleHistory}>Last comments : </h2>
        {username === undefined || data === null ? (
          <Loading />
        ) : (
          data.map((element: Comment) => {
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
            return (
              <div key={element._id} className={classes.containerComment}>
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
          })
        )}
      </Paper>
    </div>
  );
};

export default ShowComment;
