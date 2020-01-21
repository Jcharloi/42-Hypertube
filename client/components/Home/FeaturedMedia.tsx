import React, { ReactElement } from "react";
import { Skeleton, Rating } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import { useIntl } from "react-intl";
import {
  Button,
  Typography,
  Chip,
  Paper,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import Image from "material-ui-image";

import { MovieData } from "../../models/models";

import { getPictureSize } from "./service";
import { useFilmStyles } from "./styles";

import useApi from "../../hooks/useApi";

const FeaturedMedia = (): ReactElement => {
  const classes = useFilmStyles({});
  const history = useHistory();
  const { formatMessage: _t } = useIntl();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const { data: media, loading, error } = (useApi(
    "/search/latest-movie"
  ) as unknown) as MovieData;

  if (error) {
    history.push("/error");
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
    media.genres?.map((genre: string) => (
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
          src={media.cover}
          imageStyle={getPictureSize(isXs)}
          style={getPictureSize(isXs)}
          color="rgba(0,0,0,0)"
        />
      </div>
      <div className={classes.infosOverlay}>
        <Typography variant="h3" className={classes.title}>
          {media.title}
        </Typography>
        <Typography variant="h4">{media.year}</Typography>
        <Typography className={classes.descriptionContainer}>
          {media.summary}
        </Typography>
        <Rating readOnly value={media.rating} precision={0.1} />
        <div>{renderTags()}</div>
        <div className={classes.buttonContainer}>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={(): void => history.push(`/movie/${media.id}`)}
          >
            {_t({ id: "search.film.watch" })}
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default FeaturedMedia;
