import React, { ReactElement } from "react";
import moment from "moment";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { useIntl } from "react-intl";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Chip from "@material-ui/core/Chip";

import { Film as FilmInterface } from "../../models/models";

import { useFilmStyles } from "./styles";

interface Props {
  film: FilmInterface;
}

const Film = ({ film }: Props): ReactElement => {
  const classes = useFilmStyles({});
  const history = useHistory();
  const { formatMessage: _t } = useIntl();

  const searchTag = (subj: string): void =>
    history.push({
      state: {
        ...history.location.state,
        query: subj,
        previousHistory: true
      }
    });

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
    <div className={classes.container}>
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
        <div>
          {film.avg_rating || `- ${_t({ id: "search.film.norating" })}`}
        </div>
      </div>
      <span>
        {`${_t(
          { id: "search.film.author" },
          { author: film.creator || _t({ id: "search.film.unknown_author" }) }
        )}`}{" "}
        - {moment(film.date).year()}
      </span>
      <Typography variant="caption" className={classes.descriptionContainer}>
        {film.description}
      </Typography>
      <div>{_t({ id: "search.film.tags" })} : </div>
      <div>{renderTags()}</div>
      <div className={classes.buttonContainer}>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={(): void => history.push(`/movies/${film.identifier}`)}
        >
          {_t({ id: "search.film.watch" })}
        </Button>
      </div>
    </div>
  );
};

export default Film;
