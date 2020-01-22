import React, { ReactElement } from "react";
import moment from "moment";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { useIntl } from "react-intl";

import { Button, Typography, Chip, Paper } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

import { useFilmStyles } from "./styles";

const film = {
  title: "fee",
  // eslint-disable-next-line
  avg_rating: "4.33",
  date: moment().format(),
  creator: "me",
  subject: ["stuff, stuff, stuff"],
  description:
    "c dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfgc dla merdejkhvouyghuygkjhfviygiuyfg",
  identifier: "FinalFan2001"
};
const Film = (): ReactElement => {
  const classes = useFilmStyles({});
  const history = useHistory();
  const { formatMessage: _t } = useIntl();

  const searchTag = (subj: string): void =>
    history.push(`/search?query=${subj}`);

  const renderTags = (): ReactElement[] =>
    _.flatten(Array(film.subject)).map((subj: string) => (
      <Chip
        key={subj}
        className={classes.tag}
        label={subj}
        clickable
        color="primary"
        onClick={(): void => searchTag(subj)}
      />
    ));

  return (
    <Paper className={classes.container}>
      <Typography variant="h3">{film.title}</Typography>
      <img
        className={classes.thumbnail}
        alt="thumb"
        src={`https://archive.org/download/${film.identifier}/__ia_thumb.jpg`}
      />
      <div className={classes.ratingContainer}>
        <Rating
          name="read-only"
          value={Number(film.avg_rating)}
          precision={0.01}
          readOnly
        />
        <Typography>
          {film.avg_rating || `- ${_t({ id: "search.film.norating" })}`}
        </Typography>
      </div>
      <Typography>
        {`${_t(
          { id: "search.film.author" },
          { author: film.creator || _t({ id: "search.film.unknown_author" }) }
        )}`}{" "}
        - {moment(film.date).year()}
      </Typography>
      <Typography variant="caption" className={classes.descriptionContainer}>
        {film.description}
      </Typography>
      <Typography>{_t({ id: "search.film.tags" })} : </Typography>
      <div>{renderTags()}</div>
      <div className={classes.buttonContainer}>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={(): void => history.push(`/movie/${film.identifier}`)}
        >
          {_t({ id: "search.film.watch" })}
        </Button>
      </div>
    </Paper>
  );
};

export default Film;
