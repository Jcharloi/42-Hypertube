import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import CardHeader from "@material-ui/core/CardHeader";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    width: 345,
    margin: 20
  },
  cardHeader: {
    textAlign: "center"
  },
  media: {
    height: 140
  },
  cardContent: {
    height: 110
  }
});

const clamp = (str: string, maxLength: number) => {
  return str
    ? `${str.slice(0, maxLength)}${str.length <= maxLength ? "" : "..."}`
    : "";
};

const Thumbnail = ({ film, onClick }) => {
  const classes = useStyles();

  const displayFilm = () => {
    console.log("film");
  };

  return (
    <Card className={classes.card} onClick={onClick}>
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
