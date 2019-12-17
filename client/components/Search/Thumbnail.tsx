import React, { ReactElement } from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";

import { Film as FilmInterface } from "../../models/models";

import { clamp } from "./service";

import { useThumbnailStyles } from "./styles";

interface Props {
  film: FilmInterface;
  onClick: Function;
}

const Thumbnail = ({ film, onClick }: Props): ReactElement => {
  const classes = useThumbnailStyles({});

  return (
    <Card className={classes.card} onClick={(): void => onClick()}>
      <CardActionArea>
        <CardHeader
          title={clamp(film.title, 24)}
          className={classes.cardHeader}
        />
        <CardMedia
          className={classes.media}
          image={`https://archive.org/download/${film.identifier}/__ia_thumb.jpg`}
          title={film.title}
        />
      </CardActionArea>
    </Card>
  );
};

export default Thumbnail;
