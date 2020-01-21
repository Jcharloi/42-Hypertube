import React, { ReactElement } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Paper, Typography, Hidden } from "@material-ui/core";
import Image from "material-ui-image";
import Rating from "@material-ui/lab/Rating";

import useApi from "../../hooks/useApi";

import { useFeedStyles } from "./styles";

import { clamp } from "../Search/service";

const Feed = (): ReactElement => {
  const classes = useFeedStyles({});
  const { data, loading, error } = useApi("/feed");

  if (error) {
    return <div>error</div>;
  }

  return (
    <Paper className={classes.feedContainer}>
      <Typography variant="h4" className={classes.header}>
        Latest activities
      </Typography>
      {loading ? (
        <div>loading</div>
      ) : (
        data.map((recentFeed) => (
          <div className={classes.recentFeedContainer}>
            <Hidden xsDown>
              <Link
                to={`/movie/${recentFeed.movieId}`}
                className={classes.link}
              >
                <div className={classes.thumbnail}>
                  <Image
                    src="https://yts.lt/assets/images/movies/dark_waters_2019/large-cover.jpg"
                    imageStyle={{ width: 90, height: 135 }}
                    color="rgba(0,0,0,0)"
                  />
                </div>
              </Link>
            </Hidden>
            <div className={classes.infos}>
              <Link
                to={`/movie/${recentFeed.movieId}`}
                className={classes.link}
              >
                <Typography variant="h5">{recentFeed.movieName}</Typography>
              </Link>
              <Typography>
                <Link to={`user/${recentFeed.name}`} className={classes.link}>
                  {recentFeed.name}
                </Link>{" "}
                left a comment {moment(recentFeed.date).fromNow()}
              </Typography>
              <div>
                <Rating value={recentFeed.stars} readOnly />
              </div>
              <Typography variant="caption">
                {clamp(recentFeed.body, 400)}
              </Typography>
            </div>
          </div>
        ))
      )}
    </Paper>
  );
};

export default Feed;
