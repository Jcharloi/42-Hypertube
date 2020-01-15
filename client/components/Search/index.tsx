import React, { ReactElement, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import _ from "lodash";
import InfiniteScroll from "react-infinite-scroller";

import Skeleton from "@material-ui/lab/Skeleton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";
import { Button, Chip } from "@material-ui/core";

import useApi from "../../hooks/useApi";
import { formatQueryUrl } from "./service";

import useSearchStyles from "./styles";

const Search = (): ReactElement => {
  const classes = useSearchStyles({});
  const { formatMessage: _t } = useIntl();
  const [filmList, setFilmList] = useState([]);
  const [block, setBlock] = useState(false);
  const [page, setPage] = useState(1);
  const history = useHistory();
  const location = useLocation();
  const { data, loading, error, setUrl } = useApi(
    formatQueryUrl(location.search, 1)
  );

  useEffect(() => {
    if (!loading && !block) {
      setPage(1);
      setFilmList([]);
      setUrl(formatQueryUrl(location.search, 1));
    }
  }, [location.search]);

  useEffect(() => {
    if (data?.movies) {
      const movies = data.movies as Record<string, unknown>[];

      setFilmList(() => [...filmList, ...movies]);
      setBlock(false);
    }
  }, [data]);

  const loadMore = (): void => {
    if (data.movie_count <= page * 10) {
      return;
    }
    setBlock(true);
    setPage(page + 1);
    setUrl(formatQueryUrl(location.search, page + 1));
  };

  const searchTag = (genre: string): void => {
    console.log(genre);
  };

  if (error) {
    history.push("/error");
  }

  return (
    <Container maxWidth="xl">
      <InfiniteScroll
        className={classes.container}
        initialLoad={false}
        loadMore={loadMore}
        hasMore={data.movie_count > page * 10}
      >
        {filmList.map((movie) => (
          <div className={classes.thumbnailContainer}>
            <img
              src={movie.large_cover_image}
              width={300}
              height={450}
              alt={movie.title_english}
            />
            <div className={classes.thumbnailOverlay}>
              <Typography variant="h5">{movie.title_english}</Typography>
              <Typography variant="h6">{movie.year}</Typography>
              <Typography variant="caption" className={classes.summary}>
                {movie.summary}
              </Typography>
              <div className={classes.metaInfos}>
                <Typography>
                  {movie.genres.map((genre: string) => (
                    <Chip
                      className={classes.tag}
                      label={genre}
                      clickable
                      color="primary"
                      onClick={(): void => searchTag(genre)}
                    />
                  ))}
                </Typography>
                <Typography className={classes.rating}>
                  {movie.rating / 2} <StarIcon className={classes.ratingIcon} />{" "}
                  - {movie.runtime} mins
                </Typography>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={(): void => history.push(`/movie/${movie.movie_id}`)}
                >
                  {_t({ id: "search.film.watch" })}
                </Button>
              </div>
            </div>
          </div>
        ))}
        {loading &&
          _.times(12, () => (
            <div className={classes.thumbnailContainer}>
              <Skeleton
                variant="rect"
                width={300}
                height={450}
                className={classes.skeletonThumbnail}
              />
              <div className={classes.skeletonProgress}>
                <CircularProgress />
              </div>
            </div>
          ))}
      </InfiniteScroll>
    </Container>
  );
};

export default Search;
