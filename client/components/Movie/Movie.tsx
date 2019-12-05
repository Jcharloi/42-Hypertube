import React, { ReactElement, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import useApi from "../../hooks/useApi";

import useStyles from "./Movie.styles";
import { useMediaQuery } from "@material-ui/core";
import RecommandedMovies from "./RecommandedMovies";

const Movie = (): ReactElement => {
  const { formatMessage: _t } = useIntl();
  const movie = window.location.pathname.split("/")[2];
  const { data, loading, error } = useApi(
    `https://archive.org/metadata/${movie}`
  );
  const [movieInfos, setMovieInfos] = useState({
    title: "",
    description: "",
    creator: "",
    prodDate: "",
    runTime: "",
    stars: 0
  });
  const matches = useMediaQuery("(max-width:1200px)");
  const classes = useStyles({});

  useEffect(() => {
    if (!loading && Object.entries(data).length > 0) {
      let totalStars = 0;
      if (data.reviews)
        data.reviews.forEach((review: { stars: string }) => {
          totalStars += parseInt(review.stars, 10);
        });
      const infos = {
        title: data.metadata.title,
        description: data.metadata.description,
        creator: data.metadata.creator,
        prodDate: data.metadata.date,
        runTime: data.metadata.runtime,
        stars:
          data.reviews && data.reviews.length > 0
            ? Math.floor(totalStars / data.reviews.length)
            : -42 // What if there is no reviews ?
      };
      setMovieInfos(infos);
    }
  }, [data, loading]);

  return (
    <div className={matches ? classes.rootResponsive : classes.root}>
      {!loading &&
        !error &&
        (movieInfos.title ? (
          <div
            className={
              matches
                ? classes.movieContainerResponsive
                : classes.movieContainer
            }
          >
            le titre: {movieInfos.title}
            <br />
            le résumé : {movieInfos.description}
            <br />
            le casting (au moins producteur, réalisateur, acteurs principaux,
            etc...) : {movieInfos.creator}
            <br />
            l’année de production: {movieInfos.prodDate} <br /> la durée:{" "}
            {movieInfos.runTime} <br /> la note : {movieInfos.stars}/5 <br />
          </div>
        ) : (
          <div
            className={
              matches
                ? classes.movieDoesNotExistsResponsive
                : classes.movieDoesNotExists
            }
          >
            {_t({ id: "movie.error.invalid" })}
          </div>
        ))}
      <RecommandedMovies matches={matches} />
    </div>
  );
};
export default Movie;
