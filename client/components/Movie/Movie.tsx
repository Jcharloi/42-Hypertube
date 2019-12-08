import React, { ReactElement, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import useApi from "../../hooks/useApi";

import RecommandedMovies from "./MovieRecommanded";
import MovieComments from "./MovieComments";
import { Review } from "../../models/models";

import useStyles from "./Movie.styles";
import { useMediaQuery, Container } from "@material-ui/core";

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
    stars: null
  });
  const [reviews, setReviews] = useState([
    { id: "", name: "", date: "", stars: null, body: "" }
  ]);
  const matches = useMediaQuery("(max-width:1200px)");
  const classes = useStyles({});

  useEffect(() => {
    if (!loading && Object.entries(data).length > 0) {
      let totalStars = 0;
      if (data.reviews) {
        let reviewsTab: Array<Review> = [];
        data.reviews.map(
          (review: {
            review_id: string;
            reviewer: string;
            reviewdate: string;
            stars: string;
            reviewbody: string;
          }) => {
            totalStars += parseInt(review.stars, 10);
            reviewsTab.push({
              id: review.review_id,
              name: review.reviewer,
              date: review.reviewdate,
              stars: parseInt(review.stars),
              body: review.reviewbody
            });
          }
        );
        setReviews(reviewsTab);
      }
      const infos = {
        title: data.metadata.title,
        description: data.metadata.description,
        creator: data.metadata.creator,
        prodDate: data.metadata.date,
        runTime: data.metadata.runtime,
        stars:
          data.reviews && data.reviews.length > 0
            ? Math.floor(totalStars / data.reviews.length)
            : null
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
            <img
              className={classes.backgroundMovie}
              src="http://localhost:8080/public/background-movie.jpg"
            />
            {/*Presentation part*/}
            <Container className={classes.containerPresentation}>
              <div className={classes.containerMovie}>
                <div className={classes.labelMovie}>{movieInfos.title}</div>
                {movieInfos.creator && (
                  <div className={classes.labelMovie}>
                    {_t({ id: "movie.creator" })} {movieInfos.creator}
                  </div>
                )}
                {movieInfos.description && (
                  <div className={classes.labelMovie}>
                    {_t({ id: "movie.description" })} {movieInfos.description}
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      movieInfos.prodDate && movieInfos.runTime
                        ? "space-between"
                        : "center",
                    width: "80%",
                    fontSize: "1rem"
                  }}
                >
                  {movieInfos.prodDate && (
                    <span>
                      {_t({ id: "movie.prodDate" })} {movieInfos.prodDate}{" "}
                    </span>
                  )}
                  {movieInfos.runTime && (
                    <span>
                      {_t({ id: "movie.runTime" })} {movieInfos.runTime}{" "}
                    </span>
                  )}
                </div>
              </div>
            </Container>
            {/*Movie part OMG*/}
            {/* <Container /> */}
            {/*Comments part*/}
            <MovieComments movieRating={movieInfos.stars} reviews={reviews} />
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
