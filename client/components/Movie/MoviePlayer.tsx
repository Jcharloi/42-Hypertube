import React, { ReactElement } from "react";

import useStyles from "./MoviePlayer.styles";

import API from "../../util/api";

interface Props {
  movieId: string;
  extension: string;
}

const MoviePlayer = ({ movieId, extension }: Props): ReactElement => {
  const classes = useStyles({});

  const downloadMovie = (): void => {
    API.get(`/movie/download/${movieId}`).catch((e) => {
      console.log(e);
    });
  };

  return (
    <>
      <div className={classes.containerPlayer}>
        <video
          controls
          //   crossOrigin
          playsInline
          poster={`http://archive.org/19/items/${movieId}/__ia_thumb.jpg`}
          id="player"
          className={classes.player}
          onClick={downloadMovie}
        >
          <source
            src={`http://localhost:8080/api/movie/streaming/${movieId}.${extension}`}
            type={`video/${extension}`}
          />
          <track
            kind="captions"
            label="English"
            srcLang="en"
            src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt"
            default
          />
          <track
            kind="captions"
            label="Français"
            srcLang="fr"
            src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt"
          />
        </video>
      </div>
    </>
  );
};

export default MoviePlayer;
