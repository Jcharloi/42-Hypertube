import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Paper, Typography } from "@material-ui/core";
import Image from "material-ui-image";

import useApi from "../../hooks/useApi";

import { useRecentMediasStyle } from "./styles";

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
  }
];

const RecentMedias = (): ReactElement => {
  const classes = useRecentMediasStyle({});
  const { data, loading, error } = useApi("/recents");

  return (
    <Paper className={classes.container}>
      <Typography variant="h4">Watch again</Typography>
      <div className={classes.recentFilmContainer}>
        {mock.map((recentFilm) => (
          <Link
            to={`/movie/${recentFilm.identifier}`}
            className={classes.recentFilm}
          >
            <Image
              src="https://yts.lt/assets/images/movies/dark_waters_2019/large-cover.jpg"
              imageStyle={{ width: 90, height: 135 }}
              color="rgba(0,0,0,0)"
            />
          </Link>
        ))}
      </div>
    </Paper>
  );
};

export default RecentMedias;
