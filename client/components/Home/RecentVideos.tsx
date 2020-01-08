import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Paper, Typography } from "@material-ui/core";

import { useRecentMoviesStyle } from "./styles";

const mock = [
  {
    identifier: "FinalFan2001",
    title: "FinalFan2001"
  },
  {
    identifier: "FinalFan2001",
    title: "FinalFan2001"
  },
  {
    identifier: "FinalFan2001",
    title: "FinalFan2001"
  },
  {
    identifier: "FinalFan2001",
    title: "FinalFan2001"
  },
  {
    identifier: "FinalFan2001",
    title: "FinalFan2001"
  },
  {
    identifier: "FinalFan2001",
    title: "FinalFan2001"
  },
  {
    identifier: "FinalFan2001",
    title: "FinalFan2001"
  },
  {
    identifier: "FinalFan2001",
    title: "FinalFan2001"
  }
];

const RecentVideos = (): ReactElement => {
  const classes = useRecentMoviesStyle({});

  return (
    <Paper>
      <div className={classes.recentFilmContainer}>
        {mock.map((recentFilm) => (
          <Link
            to={`/movie/${recentFilm.identifier}`}
            className={classes.recentFilm}
          >
            <img
              src={`https://archive.org/download/${recentFilm.identifier}/__ia_thumb.jpg`}
              alt="thumb"
            />
            <Typography className={classes.recentFilmTitle}>
              {recentFilm.title}
            </Typography>
          </Link>
        ))}
      </div>
    </Paper>
  );
};

export default RecentVideos;
