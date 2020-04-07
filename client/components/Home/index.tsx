import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useHomeStyles } from "./styles";
import useApi from "../../hooks/useApi";
import { Movies } from "../../models/models";

const Home = (): ReactElement => {
  const classes = useHomeStyles({});
  const { resData } = useApi<{ list: Movies[] }, void>("/movies/recommended", {
    hotReload: true
  });

  return (
    <div className={classes.mainPoster}>
      {resData && (
        <div className={classes.boxContent}>
          {console.log(resData)}
          {resData.list.map((movie) => (
            <Link
              key={movie.imdbId}
              className={classes.miniaturePoster}
              to={`/movie/${movie.imdbId}`}
            >
              <img
                className={classes.miniatureImage}
                src={movie.img}
                alt="Movie poster"
              />

              <h2 className={classes.movieTitle}>{movie.title}</h2>

              <h3 className={classes.genre}>({movie.genre})</h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
