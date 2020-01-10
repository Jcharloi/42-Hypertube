import React, { ReactElement, useState, useEffect } from "react";

import useStyles from "./MoviePlayer.styles";

import API from "../../util/api";

interface Props {
  movieId: string;
  extension: string;
  size: number;
}

const MoviePlayer = ({ movieId, extension, size }: Props): ReactElement => {
  const [controlVideo, setControlVideo] = useState(false);
  const [sourceVideo, setSourceVideo] = useState("");
  const [goSource, setGoSource] = useState(true);
  const classes = useStyles({});

  const downloadMovie = (): void => {
    API.get(`/movie/download/${movieId}`)
      .then(() => {
        if (!controlVideo) {
          setControlVideo(true);
        }
        setGoSource(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (goSource) {
      setSourceVideo(
        `http://localhost:8080/api/movie/streaming/${movieId}.${extension}/${size}`
      );
      const audioPlayer: any = document.getElementById("player");
      audioPlayer.play();
      setGoSource(false);
    }
  });

  return (
    <>
      <div className={classes.containerPlayer}>
        <video
          controls={controlVideo}
          playsInline
          poster={`http://archive.org/19/items/${movieId}/__ia_thumb.jpg`}
          id="player"
          className={classes.player}
          onClick={downloadMovie}
        >
          <source src={sourceVideo} type={`video/${extension}`} />
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
