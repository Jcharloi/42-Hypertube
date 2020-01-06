import React, { ReactElement } from "react";

interface Props {
  source: string;
}

const MoviePlayer = ({ source }: Props): ReactElement => {
  return (
    <>
      <div className="container">
        <video
          controls
          //   crossOrigin
          playsInline
          poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
          id="player"
        >
          <source
            src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
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
