import React, { ReactElement, useState, useEffect, ChangeEvent } from "react";
import { useIntl } from "react-intl";
import Scroll from "react-scroll";
import API from "../../util/api";

import { Review } from "../../models/models";

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

interface Props {
  movieRating: number;
  reviews: Array<Review>;
}

const MovieComments = ({ movieRating, reviews }: Props): ReactElement => {
  const { formatMessage: _t } = useIntl();
  const [ourRating, setRating] = useState(null);
  const [comment, setComment] = useState({
    name: "",
    month: "",
    day: "",
    year: "",
    body: ""
  });
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
    const today = new Date();
    index === "rating"
      ? setRating(parseInt(e.target.value))
      : setComment({
          name: "toto",
          month: String(today.getMonth() + 1).padStart(2, "0"),
          day: String(today.getDate()).padStart(2, "0"),
          year: String(today.getFullYear()),
          body: e.target.value
        });
  };

  const sendComment = (): void => {
    console.log(ourRating, comment);
    // check everything, even stars
    const body = { comment, ourRating };
    API.put("/movie/send-comment", body)
      .then(() => {})
      .catch(e => {
        console.error(e);
      });
  };

  return (
    <div className={classes.containerRatingAndComment}>
      <Box component="fieldset" borderColor="transparent">
        <div className={classes.movieRating}>{_t({ id: "movie.rating" })}</div>
        <Rating
          value={movieRating}
          readOnly
          emptyIcon={<StarBorderIcon color="secondary" />}
        />
      </Box>
      <span className={classes.commentTitle}>
        {_t({ id: "movie.comment.title" })}
      </span>
      <Container fixed className={classes.containerComment}>
        {reviews.length > 0 ? (
          <div className={classes.containerPeople} id="scrollComment">
            {reviews.map(({ name, month, day, year, stars, body }, index) => (
              <div key={index} className={classes.comment}>
                <span style={{ fontSize: "1.1rem" }}>{name} </span>- {month},{" "}
                {day}, {year} - <Rating size="small" value={stars} readOnly />
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
            className={classes.textField}
            multiline
            label={_t({ id: "movie.comment.label" })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              )
            }}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
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
                value={ourRating}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
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
