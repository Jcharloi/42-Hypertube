import React, { ReactElement, useState, useEffect } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
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
  const [page, setPage] = useState(1);
  const history = useHistory();
  const location = useLocation();
  const { data, loading, error, setUrl }: SearchData = (useApi(
    formatQueryUrl(location.search, 1)
  ) as unknown) as SearchData;

  /**
   * Starting a new search
   */
  useEffect(() => {
    setPage(1);
    setFilmList([]);
    setUrl(formatQueryUrl(location.search, 1));
  }, [location.search, location.pathname]);

  /**
   * New Data receive
   */
  useEffect(() => {
    if (data && data.medias?.length) {
      if (page === 1) {
        setFilmList(data.medias);
      } else {
        setFilmList((oldFilmList) => [...oldFilmList, ...data.medias]);
      }
    }
  }, [data]);

  /**
   * Getting next page
   */
  const loadMore = (): void => {
    if (loading || !data.nextPage) {
      return;
    }
    setPage(page + 1);
    setUrl(formatQueryUrl(location.search, page + 1));
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
        threshold={100}
      >
        {/* No media found */}
        {!filmList.length && !loading && (
          <div className={classes.noMediaContainer}>
            <img
              src={`${window.location.origin}/public/no-media.png`}
              alt="no-media"
              className={classes.noMedia}
            />
            <Typography variant="h5">
              {_t({ id: "search.no_media" })}
            </Typography>
          </div>
        )}

        {/* Medias list */}
        {filmList.map((media) => (
          <div className={classes.thumbnailContainer} key={media.id}>
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
                        key={genre}
                      />
                    ))}
                  </div>
                )}
                <Typography className={classes.rating}>
                  {media.rating} <StarIcon className={classes.ratingIcon} />
                  {media.runtime && <span>- {media.runtime} mins</span>}
                </Typography>
                <Link to={`/movie/${media.id}`} className={classes.watchLink}>
                  <Button color="primary" variant="contained">
                    {_t({ id: "search.film.watch" })}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Fake movies Loading */}
        {loading &&
          _.times(12, (i) => (
            <div className={classes.thumbnailContainer} key={i}>
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
