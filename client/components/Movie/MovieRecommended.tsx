import React, { ReactElement } from "react";

import useStyles from "./MovieRecommended.styles";

interface Props {
  matches: boolean;
}

const RecommendedMovies = ({ matches }: Props): ReactElement => {
  const classes = useStyles({});
  return (
    <div className={matches ? classes.rootResponsive : classes.root}>
      Ceci est une liste de films inspirés de la search
    </div>
  );
};

export default RecommendedMovies;
