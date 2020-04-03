/* eslint-disable prettier/prettier */
import React, { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useHomeStyles } from "./styles";

const Home = (): ReactElement => {
  const classes = useHomeStyles({});
  const [item, setItem] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [itemReady, setItemReady] = useState(false);

  const getRecommendation = (): void => {
    const list: Array<object> = [];
    for (let index = 0; index < 4; index++) {
      Axios(`https://tv-v2.api-fetch.website/movies/1`).then((res) => {
        const id = Math.round(Math.random() * 50);
        console.log(id);
        list.push({
          title: res.data[id].title,
          img: res.data[id].images.poster,
          imdbId: res.data[id].imdb_id,
          genres: res.data[id].genres,
          src: `http://localhost:8080/movie/${res.data[id].imdbId}`
        });
        setItem(list);
        if (index === 3) {
          setItemReady(true);
        }
      });
    }
  };

  if (refresh) {
    setRefresh(false);
    getRecommendation();
  }

  return (
    <div className={classes.mainPoster}>
      {itemReady ? (
        <div className={classes.boxContent}>
          <Link className={classes.miniaturePoster} to={item[0].src}>
            <img
              className={classes.miniatureImage}
              src={item[0].img}
              alt="Movie poster"
            />
            <h2 className={classes.movieTitle}>{item[0].title}</h2>
            <h3 className={classes.genre}>({item[0].genres[0]})</h3>
          </Link>
          <Link className={classes.miniaturePoster} to={item[1].src}>
            <img
              className={classes.miniatureImage}
              src={item[1].img}
              alt="Movie poster"
            />
            <h2 className={classes.movieTitle}>{item[1].title}</h2>
            <h3 className={classes.genre}>({item[1].genres[0]})</h3>
          </Link>
          <Link className={classes.miniaturePoster} to={item[2].src}>
            <img
              className={classes.miniatureImage}
              src={item[2].img}
              alt="Movie poster"
            />
            <h2 className={classes.movieTitle}>{item[2].title}</h2>
            <h3 className={classes.genre}>({item[2].genres[0]})</h3>
          </Link>
          <Link className={classes.miniaturePoster} to={item[3].src}>
            <img
              className={classes.miniatureImage}
              src={item[3].img}
              alt="Movie poster"
            />
            <h2 className={classes.movieTitle}>{item[3].title}</h2>
            <h3 className={classes.genre}>({item[3].genres[0]})</h3>
          </Link>
        </div>
      ) : (
          ""
        )}
    </div>
  );
};

export default Home;
