/* eslint-disable no-nested-ternary */
import { useIntl } from "react-intl";
import React, { ReactElement, useEffect, useState } from "react";

import { Paper } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import useStyles from "./Movie.styles";

import RecommendedMovies from "./MovieRecommended";
import MovieComments from "./MovieComments";
import { MovieInfos, Reviews, Review } from "../../models/models";
import Loading from "../Routes/Loading";
import MoviePlayer from "./MoviePlayer";
import useApi from "../../hooks/useApi";
import socket from "../../helpers/socket";
import Error from "../Error";

const Movie = (): ReactElement => {
  const { formatMessage: _t } = useIntl();
  const [source, setSource] = useState("");
  const movieId = window.location.pathname.split("/")[2];
  const classes = useStyles({});

  const {
    data: { infos, reviews: reviewsData },
    loading,
    error
  } = useApi(`/movie/infos/${movieId}`);

  const movieInfos = infos as MovieInfos;
  const reviews = reviewsData as Reviews;

  const initComments = (reviewReceived: Review): void => {
    let totalStars = reviewReceived.stars;
    reviews.review.forEach((review) => {
      totalStars += review.stars;
    });
    reviews.movieRating = totalStars / (reviews.review.length + 1);
    reviews.review.push(reviewReceived);
  };

  const initSource = (sourcePath: string): void => {
    setSource(sourcePath);
  };

  useEffect(() => {
    return (): void => {
      if (loading || error) {
        return;
      }
      socket.socket.removeListener("Video source", initSource);
      socket.socket.removeListener("New comments", initComments);
      socket.socket.emit("leave-movie-room", movieId);
    };
  });

  if (loading) return <Loading />;
  if (error) return <Error />;

  socket.socket.on("Video source", initSource);
  socket.socket.on("New comments", initComments);
  socket.socket.emit("join-movie-room", movieId);

  return (
    <div className={classes.root}>
      <div className={classes.movieContainer}>
        <Paper className={classes.containerPresentation}>
          <div className={classes.containerMovie}>
            <img
              className={classes.moviePoster}
              src={`https://yts.lt${movieInfos.poster}`}
              alt="Movie thumb"
            />
            <div className={classes.generalInfos}>
              <div className={classes.movieTitle}>{movieInfos?.title}</div>
              {movieInfos?.description && (
                <div className={classes.descriptionMovie}>
                  {movieInfos?.description}
                </div>
              )}
              {/* {movieInfos?.creator && (
                <div>
                  {_t({ id: "movie.creator" })} {movieInfos?.creator}
                </div>
              )} */}
              <span className={classes.dateAndTime}>
                {movieInfos?.prodDate && (
                  <div>
                    {_t({ id: "movie.prodDate" })} {movieInfos?.prodDate}
                  </div>
                )}
                {movieInfos?.runTime && (
                  <div>
                    {_t({ id: "movie.runTime" })} {movieInfos?.runTime} minutes
                  </div>
                )}
              </span>
              {movieInfos.imdbRating && (
                <>
                  {_t({ id: "movie.imdb.rating" })}
                  <Rating
                    value={movieInfos?.imdbRating}
                    readOnly
                    emptyIcon={<StarBorderIcon color="primary" />}
                  />
                </>
              )}
            </div>
          </div>
        </Paper>
        <MoviePlayer movieId={movieId} source={source} />
        <MovieComments movieId={movieId} reviews={reviews} />
      </div>
      <RecommendedMovies />
    </div>
  );
};

export default Movie;
