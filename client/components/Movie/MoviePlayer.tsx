import React, { ReactElement, useState } from "react";
import { useIntl } from "react-intl";

import PlayCircleFilledOutlinedIcon from "@material-ui/icons/PlayCircleFilledOutlined";
import useStyles from "./MoviePlayer.styles";

import API from "../../util/api";

interface Props {
  movieId: string;
  source: string;
}

const MoviePlayer = ({ movieId, source }: Props): ReactElement => {
  const { formatMessage: _t } = useIntl();
  const [brokenPlayer, setBrokenPlayer] = useState(false);
  const classes = useStyles({});

  const downloadMovie = (): void => {
    API.get(`/movie/download/${movieId}`).catch((e) => {
      if (e.response.status === 409) {
        setBrokenPlayer(true);
      }
      console.log(e);
    });
  };

  return (
    <div className={classes.containerPlayer}>
      {brokenPlayer && (
        <div className={classes.playerBroken}>{_t({ id: "movie.error" })}</div>
      )}
      {!brokenPlayer && source ? (
        <video
          controls
          playsInline
          id="player"
          className={classes.video}
          src={source}
        >
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
      ) : (
        !brokenPlayer && (
          <div className={classes.playerLoader}>
            <PlayCircleFilledOutlinedIcon
              onClick={downloadMovie}
              className={classes.playerIcon}
            />
          </div>
        )
      )}
    </div>
  );
};

export default MoviePlayer;
