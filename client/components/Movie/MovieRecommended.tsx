import React, { ReactElement } from "react";

import useStyles from "./MovieRecommended.styles";

const RecommendedMovies = (): ReactElement => {
  const classes = useStyles({});

  return (
    <div className={classes.containerRecommended}>
      Ceci est une liste de films inspirés de la search
    </div>
  );
};

export default RecommendedMovies;
