import React, { ReactElement, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import Scroll from "react-scroll";

import { Review } from "../../models/models";

import {
  Box,
  Container,
  TextField,
  InputAdornment,
  Divider
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
  const [months] = useState([
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
  ]);
  const scroll = Scroll.animateScroll;
  const classes = useStyles({});

  const scrollToBottom = () => {
    scroll.scrollToBottom({
      containerId: "scrollComment"
    });
  };

  useEffect(() => {
    scrollToBottom();
  });

  return (
    <div className={classes.containerRatingAndComment}>
      <Box component="fieldset" borderColor="transparent">
        <div className={classes.movieRating}>{_t({ id: "movie.rating" })}</div>
        <Rating
          value={movieRating}
          readOnly
          style={{ display: "flex", justifyContent: "center" }}
          emptyIcon={<StarBorderIcon color="secondary" />}
        />
      </Box>
      <span className={classes.commentTitle}>
        {_t({ id: "movie.comment.title" })}
      </span>
      <Container fixed className={classes.containerComment}>
        {reviews.length > 0 ? (
          <div className={classes.containerPeople} id="scrollComment">
            {reviews.map(({ id, name, date, stars, body }) => (
              <div key={id} className={classes.comment}>
                <span style={{ fontSize: "1.1rem" }}>{name} </span>-{" "}
                {months[parseInt(date.split("-")[1]) - 1]},{" "}
                {date.split("-")[2].split(" ")[0]}, {date.split("-")[0]} -{" "}
                <Rating size="small" value={stars} readOnly />
                <div style={{ marginRight: "0.5rem" }}>{body}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ margin: "1rem 0" }}>
            {_t({ id: "movie.comment.none" })}
          </div>
        )}
        {/* <Divider style={{ backgroundColor: "white !important" }} /> */}
        <TextField
          style={{ width: "90%" }}
          multiline
          label="Write your comment here"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            )
          }}
        />
      </Container>
    </div>
  );
};

export default MovieComments;
