import React, { ReactElement } from "react";
import { Skeleton, Rating } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import { useIntl } from "react-intl";

import { Button, Typography, Chip, Paper } from "@material-ui/core";
import Image from "material-ui-image";

import { MovieData } from "../../models/models";

import { useFilmStyles } from "./styles";

import useApi from "../../hooks/useApi";

const Film = (): ReactElement => {
  const classes = useFilmStyles({});
  const history = useHistory();
  const { formatMessage: _t } = useIntl();
  const { data: movie, loading, error } = (useApi(
    "/search/latest-movie"
  ) as unknown) as MovieData;

  if (error) {
    return <div>error</div>;
  }

  if (loading) {
    return (
      <Paper className={classes.container}>
        <Typography variant="h4" className={classes.title}>
          {_t({ id: "home.latest_film" })}
        </Typography>
        <div className={classes.posterContainer}>
          <Skeleton variant="rect" height={562.5} width={375} />
        </div>
      </Paper>
    );
  }

  const renderTags = (): ReactElement[] =>
    movie.genres?.map((genre: string) => (
      <Chip
        key={genre}
        className={classes.tag}
        label={genre}
        clickable
        color="primary"
      />
    ));

  return (
    <Paper className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        {_t({ id: "home.latest_film" })}
      </Typography>
      <div className={classes.posterContainer}>
        <Image
          animationDuration={500}
          src={movie.cover}
          imageStyle={{ width: 375, height: 562.5 }}
          style={{ width: 375, height: 562.5 }}
          color="rgba(0,0,0,0)"
        />
      </div>
      <div className={classes.infosOverlay}>
        <Typography variant="h3" className={classes.title}>
          {movie.title}
        </Typography>
        <Typography variant="h4">{movie.year}</Typography>
        <Typography className={classes.descriptionContainer}>
          {movie.summary}
        </Typography>
        <Rating readOnly value={movie.rating} precision={0.1} />
        <div>{renderTags()}</div>
        <div className={classes.buttonContainer}>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={(): void => history.push(`/movie/${movie.id}`)}
          >
            {_t({ id: "search.film.watch" })}
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default Film;
