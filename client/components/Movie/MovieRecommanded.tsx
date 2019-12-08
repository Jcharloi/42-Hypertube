import React from "react";
import useStyles from "./MovieRecommanded.style.";

interface Props {
  matches: boolean;
}

const RecommandedMovies = ({ matches }: Props) => {
  const classes = useStyles({});
  return (
    <div className={matches ? classes.rootResponsive : classes.root}>
      Ceci est une liste de films inspirés de la search
    </div>
  );
};

export default RecommandedMovies;
