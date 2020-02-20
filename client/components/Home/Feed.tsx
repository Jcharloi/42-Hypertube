import React, { ReactElement } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Paper, Typography } from "@material-ui/core";

import Rating from "@material-ui/lab/Rating";
import { useFeedStyles } from "./styles";

import { clamp } from "../Search/service";

const mock = [
  {
    updatedAt: moment().format(),
    user: "connard",
    film: {
      identifier: "FinalFan2001",
      title: "nulachier"
    },
    rating: 1,
    review:
      "c dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfg"
  },
  {
    updatedAt: moment().format(),

    user: "connard",
    film: {
      identifier: "FinalFan2001",
      title: "nulachier"
    },
    rating: 2,
    review: "c dla merde"
  },
  {
    updatedAt: moment().format(),

    user: "connard",
    film: {
      identifier: "FinalFan2001",
      title: "nulachier"
    },
    rating: 3,
    review: "c dla merde"
  },
  {
    updatedAt: moment().format(),
    user: "connard",
    film: {
      identifier: "FinalFan2001",
      title: "nulachier"
    },
    rating: 4,
    review: "c dla merde"
  }
];

const Feed = (): ReactElement => {
  const classes = useFeedStyles({});

  return (
    <Paper className={classes.feedContainer}>
      <Typography variant="h4" className={classes.header}>
        Latest activities
      </Typography>
      {mock.map((recentFeed) => (
        <div className={classes.recentFeedContainer}>
          <Link to={`/movie/${recentFeed.film.identifier}`}>
            <img
              src={`https://archive.org/download/${recentFeed.film.identifier}/__ia_thumb.jpg`}
              alt="thumb"
            />
          </Link>
          <div className={classes.infos}>
            <Link to={`/movie/${recentFeed.film.identifier}`}>
              <Typography variant="h5">{recentFeed.film.title}</Typography>
            </Link>
            <Typography>
              <Link to={`user/${recentFeed.user}`}>{recentFeed.user}</Link> left
              a comment {moment(recentFeed.updatedAt).fromNow()}
            </Typography>
            <div>
              <Rating value={recentFeed.rating} readOnly />
            </div>
            <Typography variant="caption">
              {clamp(recentFeed.review, 400)}
            </Typography>
          </div>
        </div>
      ))}
    </Paper>
  );
};

export default Feed;
