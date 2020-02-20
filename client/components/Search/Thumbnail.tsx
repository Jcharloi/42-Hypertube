import React, { ReactElement } from "react";
import StarIcon from "@material-ui/icons/Star";
import moment from "moment";
import { useIntl } from "react-intl";

import Container from "@material-ui/core/Container";

import Typography from "@material-ui/core/Typography";
import { clamp } from "./service";
import { useThumbnailStyles } from "./styles";
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
            - {moment(film.date).year()} - <StarIcon />
            {Number(film.avg_rating)}
          </span>
        </Typography>
        <Typography variant="caption">
          {clamp(film.description, 400)}
        </Typography>
      </div>
    </Container>
  );
};

export default Thumbnail;
