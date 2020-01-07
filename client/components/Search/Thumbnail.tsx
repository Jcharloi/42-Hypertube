import React, { ReactElement } from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";

import moment from "moment";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { useIntl } from "react-intl";

import Container from "@material-ui/core/Container";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Chip from "@material-ui/core/Chip";
import { clamp } from "./service";
import { useThumbnailStyles, useFilmStyles } from "./styles";
import { Film as FilmInterface } from "../../models/models";

interface Props {
  film: FilmInterface;
  onClick: () => void;
}

const Thumbnail = ({ film, onClick }: Props): ReactElement => {
  const classes = useThumbnailStyles({});
  const { formatMessage: _t } = useIntl();

  return (
    <Container className={classes.container} onClick={onClick}>
      <div>
        <img
          src={`https://archive.org/download/${film.identifier}/__ia_thumb.jpg`}
          alt="thumb"
        />
      </div>
      <div className={classes.content}>
        <Typography variant="h5">{film.title}</Typography>
        <Typography className={classes.filmInfo}>
          <span>
            {`${_t(
              { id: "search.film.author" },
              {
                author: film.creator || _t({ id: "search.film.unknown_author" })
              }
            )}`}{" "}
            - {moment(film.date).year()}{" "}
          </span>
          <Rating
            name="read-only"
            value={Number(film.avg_rating)}
            precision={0.01}
            readOnly
          />
        </Typography>
        <Typography variant="caption">
          {clamp(film.description, 400)}
        </Typography>
      </div>
    </Container>
  );
};

export default Thumbnail;
