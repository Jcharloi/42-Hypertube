import React, { ReactElement } from "react";

import useStyles from "./MoviePlayer.styles";

interface Props {
  movieId: string;
  source: string;
}

const MoviePlayer = ({ movieId, source }: Props): ReactElement => {
  const classes = useStyles({});

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
        >
          <source
            src={`http://archive.org/19/items/${movieId}/${source}`}
            // type="video/mp4"
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
