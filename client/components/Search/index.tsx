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
import Image from "material-ui-image";
import Card from "@material-ui/core/Card";

import useApi from "../../hooks/useApi";
import { formatQueryUrl } from "./service";
import { SearchData } from "../../models/models";

import useSearchStyles from "./styles";

const Search = (): ReactElement => {
  const classes = useSearchStyles({});
  const { formatMessage: _t } = useIntl();
  const [filmList, setFilmList] = useState([]);
  const [block, setBlock] = useState(false);
  const [page, setPage] = useState(1);
  const history = useHistory();
  const location = useLocation();
  const mediaType = location.pathname.includes("movies") ? "movies" : "shows";
  const { data, loading, error, setUrl }: SearchData = (useApi(
    formatQueryUrl(location.search, 1, mediaType)
  ) as unknown) as SearchData;

  useEffect(() => {
    if (!loading && !block) {
      setPage(1);
      setFilmList([]);
      setUrl(formatQueryUrl(location.search, 1, mediaType));
    }
  }, [location.search, location.pathname]);

  useEffect(() => {
    if (data && data.medias?.length) {
      setFilmList(() => [...filmList, ...data.medias]);
      setBlock(false);
    }
  }, [data]);

  const loadMore = (): void => {
    if (!data.nextPage) {
      return;
    }
    setBlock(true);
    setPage(page + 1);
    setUrl(formatQueryUrl(location.search, page + 1, mediaType));
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
        hasMore={data.nextPage}
      >
        {!filmList.length && !loading && (
          <div className={classes.noMediaContainer}>
            <img
              src="http://localhost:8080/public/no-media.png"
              alt="no-media"
              className={classes.noMedia}
            />
            <Typography variant="h5">
              {_t({ id: "search.no_media" })}
            </Typography>
          </div>
        )}
        {filmList.map((media) => (
          <div
            className={classes.thumbnailContainer}
            key={_.uniqueId("media_")}
          >
            <Image
              animationDuration={500}
              src={media.cover}
              color="rgba(0,0,0,0)"
              imageStyle={{ width: 300, height: 450 }}
              style={{ width: 300, height: 450 }}
              disableSpinner
              errorIcon={
                <Card className={classes.altContainer}>
                  <Typography variant="h4">{media.title}</Typography>
                </Card>
              }
            />
            <div className={classes.thumbnailOverlay}>
              <Typography variant="h5">{media.title}</Typography>
              <Typography variant="h6">{media.year}</Typography>
              <Typography variant="caption" className={classes.summary}>
                {media.summary}
              </Typography>
              <div className={classes.metaInfos}>
                {media.genres && (
                  <div>
                    {media.genres.map((genre: string) => (
                      <Chip
                        className={classes.tag}
                        label={genre}
                        clickable
                        color="primary"
                        key={_.uniqueId("mediaGenre_")}
                      />
                    ))}
                  </div>
                )}
                <Typography className={classes.rating}>
                  {media.rating} <StarIcon className={classes.ratingIcon} />
                  {media.runtime && <span>- {media.runtime} mins</span>}
                </Typography>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.watchButton}
                  onClick={(): void =>
                    history.push(`/${mediaType.slice(0, -1)}/${media.id}`)
                  }
                >
                  {_t({
                    id:
                      mediaType === "movies"
                        ? "search.film.watch"
                        : "search.film.watch_show"
                  })}
                </Button>
              </div>
            </div>
          </div>
        ))}
        {loading &&
          _.times(12, () => (
            <div
              className={classes.thumbnailContainer}
              key={_.uniqueId("loading_")}
            >
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
