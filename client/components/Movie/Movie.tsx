/* eslint-disable no-nested-ternary */
import { useIntl } from "react-intl";
import React, { ReactElement, useState, useEffect } from "react";

import { Paper } from "@material-ui/core";
import useStyles from "./Movie.styles";

import socket from "../../helpers/socket";
import API from "../../util/api";
import RecommendedMovies from "./MovieRecommended";
import MovieComments from "./MovieComments";
import { Review } from "../../models/models";
import Loading from "../Routes/Loading";
import MoviePlayer from "./MoviePlayer";

const Movie = (): ReactElement => {
  const { formatMessage: _t } = useIntl();
  const [movieId] = useState(window.location.pathname.split("/")[2]);
  const [loading, setLoading] = useState(true);
  const [movieInfos, setMovieInfos] = useState({
    title: "",
    description: "",
    creator: "",
    prodDate: "",
    runTime: "",
    stars: 0,
    extension: ""
  });
  const [reviews, setReviews] = useState([
    { id: "", name: "", date: null, stars: 0, body: "" }
  ]);
  const [dataDone, setDataDone] = useState(false);
  const classes = useStyles({});

  useEffect(() => {
    const initComments = (reviewReceived: Review): void => {
      let totalStars = reviewReceived.stars;
      let reviewsLength = 1;
      setReviews((reviewsHook) => {
        totalStars = reviewsHook.reduce((acc, review) => {
          if (review.stars > 0) reviewsLength += 1;
          return acc + review.stars;
        }, reviewReceived.stars);
        return [...reviewsHook, reviewReceived];
      });
      setMovieInfos((movieInfosHook) => {
        return {
          ...movieInfosHook,
          stars: Math.floor(totalStars / reviewsLength)
        };
      });
    };
    if (loading) {
      API.get(`/movie/infos/${movieId}`)
        .then(({ data: { infos, reviews: allReviews } }) => {
          setMovieInfos(infos);
          setReviews(allReviews);
          setDataDone(true);
          socket.socket.emit("join-movie-room", movieId);
          socket.socket.on("New comments", initComments);
        })
        .catch((e) => {
          console.error(e);
          setDataDone(true);
        });
      setLoading(false);
    }
    return (): void => {
      socket.socket.removeListener("New comments", initComments);
      socket.socket.emit("leave-movie-room", movieId);
    };
  }, [loading, movieId]);

  return (
    <div className={classes.root}>
      {!dataDone ? (
        <Loading />
      ) : movieInfos.title ? (
        <div className={classes.movieContainer}>
          <Paper className={classes.containerPresentation}>
            <div className={classes.containerMovie}>
              <div className={classes.movieTitleImage}>
                <div className={classes.labelMovie}>{movieInfos.title}</div>
                <img
                  alt="Movie thumb"
                  src={`http://archive.org/19/items/${movieId}/__ia_thumb.jpg`}
                />
              </div>
              {movieInfos.creator && (
                <div className={classes.labelMovie}>
                  {_t({ id: "movie.creator" })} {movieInfos.creator}
                </div>
              )}
              {movieInfos.description && (
                <div className={classes.labelMovie && classes.descriptionMovie}>
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
          </Paper>
          <MoviePlayer movieId={movieId} extension={movieInfos.extension} />
          <MovieComments
            movieId={movieId}
            movieRating={movieInfos.stars}
            reviews={reviews}
          />
        </div>
      ) : (
        <div className={classes.movieDoesNotExists}>
          {_t({ id: "movie.error.invalid" })}
        </div>
      )}
      <RecommendedMovies />
    </div>
  );
};

export default Movie;
