import { useIntl } from "react-intl";
import React, { ReactElement, useState, useEffect } from "react";

import { useMediaQuery, Container } from "@material-ui/core";
import useStyles from "./Movie.styles";

import socket from "../../helpers/socket";
import API from "../../util/api";
import RecommandedMovies from "./MovieRecommanded";
import MovieComments from "./MovieComments";
import { Review } from "../../models/models";
import newMovieRating from "./MovieComments.service";

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
    stars: 0
  });
  const [reviews, setReviews] = useState([
    { id: "", name: "", date: null, stars: 0, body: "" }
  ]);
  const matches = useMediaQuery("(max-width:1200px)");
  const classes = useStyles({});

  useEffect(() => {
    const initComments = (reviewReceived: Review): void => {
      // newMovieRating(movieInfos.stars);
      setReviews((reviewsHook) => [...reviewsHook, reviewReceived]);
    };
    if (loading) {
      API.get(`/movie/infos/${movieId}`)
        .then(({ data: { infos, reviews: allReviews } }) => {
          setMovieInfos(infos);
          setReviews(allReviews);
          socket.socket.emit("join-movie-room", movieId);
          socket.socket.on("New comments", initComments);
        })
        .catch((e) => {
          console.error(e);
        });
      setLoading(false);
    }
    return (): void => {
      socket.socket.emit("leave-movie-room", movieId);
      socket.socket.removeListener("New comments", initComments);
    };
  }, [loading, movieId, movieInfos.stars]);

  return (
    <div className={matches ? classes.rootResponsive : classes.root}>
      {!loading &&
        (movieInfos.title ? (
          <div
            className={
              matches
                ? classes.movieContainerResponsive
                : classes.movieContainer
            }
          >
            <img
              alt="backgroundMovie"
              className={classes.backgroundMovie}
              src="http://localhost:8080/public/background-movie.jpg"
            />
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
            <MovieComments
              movieId={movieId}
              movieRating={movieInfos.stars}
              reviews={reviews}
            />
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
