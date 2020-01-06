import React, { ReactElement, useState, useEffect, ChangeEvent } from "react";
import { useIntl } from "react-intl";
import Scroll from "react-scroll";

import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Paper
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import AccountCircle from "@material-ui/icons/AccountCircle";
import useStyles from "./MovieComments.styles";

import API from "../../util/api";
import { Review } from "../../models/models";
import checkInvalidCommentOrStars from "./MovieComments.service";

interface Props {
  movieId: string;
  movieRating: number;
  reviews: Array<Review>;
}

const MovieComments = ({
  movieId,
  movieRating,
  reviews
}: Props): ReactElement => {
  const { formatMessage: _t } = useIntl();
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState({
    name: "",
    date: null,
    body: ""
  });
  const [error, setError] = useState({ comment: false, stars: false });
  const scroll = Scroll.animateScroll;
  const classes = useStyles({});

  const scrollToBottom = (): void => {
    scroll.scrollToBottom({
      containerId: "scrollComment"
    });
  };

  useEffect(() => {
    scrollToBottom();
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: string
  ): void => {
    if (index === "rating") {
      setStars(parseInt(e.target.value, 10));
    } else {
      setComment({
        name: "toto",
        date: Date.now(),
        body: e.target.value
      });
    }
    setError({
      comment: comment.body.length === 0 && index !== "comment",
      stars: stars === 0 && index !== "rating"
    });
  };

  const sendComment = (): void => {
    const ret = checkInvalidCommentOrStars(stars, comment.body);
    if (!ret.comment && !ret.stars) {
      const body = {
        movieId,
        ...comment,
        stars
      };
      API.post("/movie/review", body)
        .then(() => {
          setComment({
            name: "",
            date: null,
            body: ""
          });
          setStars(0);
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      setError(ret);
    }
  };

  return (
    <div className={classes.containerRatingAndComment}>
      <Box component="fieldset" borderColor="transparent">
        <div className={classes.movieRating}>{_t({ id: "movie.rating" })}</div>
        <Rating
          value={movieRating}
          readOnly
          emptyIcon={<StarBorderIcon color="primary" />}
        />
      </Box>
      <span className={classes.commentTitle}>
        {_t({ id: "movie.comment.title" })}
      </span>
      <Paper className={classes.containerComment}>
        {reviews.length > 0 ? (
          <div className={classes.containerPeople} id="scrollComment">
            {reviews.map(({ id, name, date, stars: nbStars, body }) => (
              <div key={id} className={classes.comment}>
                <span style={{ fontSize: "1.1rem" }}>
                  {name} - {date} -{" "}
                </span>
                <Rating
                  size="small"
                  value={nbStars}
                  readOnly
                  emptyIcon={
                    <StarBorderIcon
                      style={{ fontSize: "1.1rem" }}
                      color="primary"
                    />
                  }
                />
                <div className={classes.commentText}>{body}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className={classes.comment}>
            {_t({ id: "movie.comment.none" })}
          </div>
        )}
        <div className={classes.personalCommentContainer}>
          <TextField
            error={error.comment}
            helperText={
              error.comment &&
              _t({ id: "authentication.signUp.error.required" })
            }
            className={classes.textField}
            multiline
            label={_t({ id: "movie.comment.label" })}
            inputProps={{
              maxLength: 1000
            }}
            // eslint-disable-next-line
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              )
            }}
            value={comment.body}
            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
              handleChange(e, "comment")
            }
          />
          <div className={classes.rateAndSendButton}>
            <div className={classes.rateIt}>
              <span className={classes.askRating}>
                {_t({ id: "movie.comment.askRating" })}
              </span>
              <Rating
                name="simple-controlled"
                value={stars}
                onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                  handleChange(e, "rating")
                }
                emptyIcon={<StarBorderIcon color="primary" />}
              />
              {error.stars && (
                <span className={classes.rateRequired}>
                  {_t({ id: "authentication.signUp.error.required" })}
                </span>
              )}
            </div>
            <Button variant="contained" onClick={sendComment} color="primary">
              {_t({ id: "movie.comment.send" })}
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default MovieComments;
