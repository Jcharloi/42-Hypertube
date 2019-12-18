import React, { ReactElement, useState, useEffect, ChangeEvent } from "react";
import { useIntl } from "react-intl";
import Scroll from "react-scroll";

import {
  Box,
  Container,
  TextField,
  InputAdornment,
  Button
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import AccountCircle from "@material-ui/icons/AccountCircle";
import useStyles from "./MovieComments.styles";

import API from "../../util/api";
import { Review } from "../../models/models";
import checkInvalidComment from "./MovieComments.service";

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
  const [error, setError] = useState(false);
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
      setError(false);
    }
  };

  const sendComment = (): void => {
    if (!checkInvalidComment(stars, comment.body)) {
      setError(true);
    } else {
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
      <Container fixed className={classes.containerComment}>
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
                <div style={{ marginRight: "0.5rem" }}>{body}</div>
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
            error={error}
            helperText={
              error && _t({ id: "authentication.signUp.error.required" })
            }
            className={classes.textField}
            multiline
            label={_t({ id: "movie.comment.label" })}
            inputProps={{
              maxLength: 1000
            }}
            InputProps={{
              maxLength: 1000,
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
              <span style={{ marginRight: "0.2rem" }}>
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
            </div>
            <Button variant="contained" onClick={sendComment}>
              {_t({ id: "movie.comment.send" })}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MovieComments;
