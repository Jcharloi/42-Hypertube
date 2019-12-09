import React, { ReactElement, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import useApi from "../../hooks/useApi";
import { socket } from "../../helpers/socket";

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
    { name: "", month: "", day: "", year: "", stars: null, body: "" }
  ]);
  const months = [
    _t({ id: "month.january" }),
    _t({ id: "month.february" }),
    _t({ id: "month.march" }),
    _t({ id: "month.april" }),
    _t({ id: "month.may" }),
    _t({ id: "month.june" }),
    _t({ id: "month.july" }),
    _t({ id: "month.august" }),
    _t({ id: "month.september" }),
    _t({ id: "month.october" }),
    _t({ id: "month.november" }),
    _t({ id: "month.december" })
  ];
  const matches = useMediaQuery("(max-width:1200px)");
  const classes = useStyles({});

  // const initComments = (reviewsReceived: Array<Review>): void => {
  //   setReviews(reviewsReceived);
  // };

  useEffect(() => {
    if (!loading && Object.entries(data).length > 0) {
      let totalStars = 0;
      if (data.reviews) {
        let reviewsTab: Array<Review> = [];
        data.reviews.map(
          (review: {
            reviewer: string;
            reviewdate: string;
            stars: string;
            reviewbody: string;
          }) => {
            totalStars += parseInt(review.stars, 10);
            reviewsTab.push({
              name: review.reviewer,
              month: months[parseInt(review.reviewdate.split("-")[1]) - 1],
              day: review.reviewdate.split("-")[2].split(" ")[0],
              year: review.reviewdate.split("-")[0],
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
      // socket.on("New comments", initComments);
    }
    // return () => socket.removeListener("New comments", initComments);
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
