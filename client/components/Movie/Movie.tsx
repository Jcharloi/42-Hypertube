import React, { ReactElement, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { socket } from "../../helpers/socket";
import API from "../../util/api";

import RecommandedMovies from "./MovieRecommanded";
import MovieComments from "./MovieComments";
import { Review } from "../../models/models";

import useStyles from "./Movie.styles";
import { useMediaQuery, Container } from "@material-ui/core";

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
    { name: "", month: "", day: "", year: "", stars: 0, body: "" }
  ]);
  const matches = useMediaQuery("(max-width:1200px)");
  const classes = useStyles({});

  const initComments = (reviewReceived: Review): void => {
    setReviews(reviews => [...reviews, reviewReceived]);
  };

  useEffect(() => {
    if (loading) {
      API.get(`/movie/infos/${movieId}`)
        .then(({ data: { infos, reviews } }) => {
          setMovieInfos(infos);
          setReviews(reviews);
          setLoading(false);
          socket.emit("join-movie-room", movieId);
          socket.on("New comments", initComments);
        })
        .catch(e => {
          console.error(e);
        });
    }
    return () => {
      socket.emit("leave-movie-room", movieId);
      socket.removeListener("New comments", initComments);
    };
  });

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
