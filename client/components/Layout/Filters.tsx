import React, { ReactElement, useState, useEffect, useRef } from "react";
import moment from "moment";
import { useIntl } from "react-intl";

import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";
import Card from "@material-ui/core/Card";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Rating from "@material-ui/lab/Rating";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

import useDebounce from "../../hooks/useDebounce";

import history from "../../helpers/history";

import { useFiltersStyles } from "./styles";

const Filters = (): ReactElement => {
  const node = useRef();
  const classes = useFiltersStyles({});
  const { formatMessage: _t } = useIntl();
  const [queryField, setqueryField] = useState("");
  const [yearRange, setYearRange] = useState([1900, moment().year()]);
  const [collections, setcollections] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [maxRating, setMaxRating] = useState(5);
  const [showFilters, setShowFilters] = useState(false);
  const debouncedQueryField = useDebounce(queryField, 500);
  const debouncedYearRange = useDebounce(yearRange, 500);
  const debouncedcollections = useDebounce(collections, 500);
  const debouncedMinRating = useDebounce(minRating, 500);
  const debouncedMaxRating = useDebounce(maxRating, 500);

  const handleClick = (e: Event): void => {
    const { tagName } = e.target as HTMLElement;

    if (
      (node.current as Node)?.contains(e.target as Node) ||
      tagName === "LI"
    ) {
      return;
    }
    setShowFilters(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return (): void => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  useEffect(() => {
    if (
      debouncedQueryField ||
      debouncedYearRange ||
      debouncedcollections ||
      debouncedMinRating ||
      debouncedMaxRating
    ) {
      history.replace({
        state: {
          query: queryField,
          startYear: yearRange?.[0],
          endYear: yearRange?.[1],
          collections,
          minRating,
          maxRating,
          previousHistory: !!history.location.state
        }
      });
    }
  }, [
    debouncedQueryField,
    debouncedYearRange,
    debouncedcollections,
    debouncedMinRating,
    debouncedMaxRating
  ]);

  const resetFilter = (): void => {
    setqueryField("");
    setYearRange([1900, moment().year()]);
    setcollections([]);
    setMinRating(0);
    setMaxRating(5);
  };

  return (
    <>
      <InputBase
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        onChange={(e): void => setqueryField(e.target.value)}
        placeholder={_t({ id: "layout.filters.search" })}
        className={classes.input}
        inputProps={{ "aria-label": "search" }}
      />
      {showFilters ? (
        <Card className={classes.filterContainerTop} ref={node}>
          <CancelIcon
            className={classes.cancel}
            onClick={(): void => setShowFilters(false)}
          />
          <div className={classes.filterContainer}>
            <Typography id="year-slider" className={classes.yearRangeLabel}>
              {_t({ id: "layout.filters.production_year" })}
            </Typography>
            <Slider
              value={yearRange || [1900, moment().year()]}
              min={1900}
              max={moment().year()}
              onChange={(e, value): void => setYearRange(value as number[])}
              valueLabelDisplay="on"
              aria-labelledby="year-slider"
            />
          </div>
          <div
            className={`${classes.filterContainer} ${classes.collectionsSelect}`}
          >
            <Typography id="collection-select">
              {_t({ id: "layout.filters.collection" })}
            </Typography>
            <Select
              displayEmpty
              renderValue={(e: string[]): string =>
                _t(
                  { id: "layout.filters.selected_collections" },
                  { count: e.length }
                )
              }
              autoWidth
              onChange={(e): void => setcollections(e.target.value as string[])}
              aria-labelledby="collection-select"
              multiple
              value={collections || []}
              className={classes.collectionsSelectComponent}
            >
              <MenuItem value="" disabled>
                {_t({ id: "layout.filters.select_collection" })}
              </MenuItem>
              <MenuItem value="feature_films">
                {_t({ id: "layout.filters.select_category.feature_films" })}
              </MenuItem>
              <MenuItem value="educationalfilms">
                {_t({ id: "layout.filters.select_category.educationalfilms" })}
              </MenuItem>
              <MenuItem value="opensource_movies">
                {_t({ id: "layout.filters.select_category.opensource_movies" })}
              </MenuItem>
              <MenuItem value="tvarchive">
                {_t({ id: "layout.filters.select_category.tvarchive" })}
              </MenuItem>
              <MenuItem value="classic_tv">
                {_t({ id: "layout.filters.select_category.classic_tv" })}
              </MenuItem>
              <MenuItem value="community_media">
                {_t({ id: "layout.filters.select_category.community_media" })}
              </MenuItem>
              <MenuItem value="podcasts">
                {_t({ id: "layout.filters.select_category.podcasts" })}
              </MenuItem>
              <MenuItem value="youtubearchive">
                {_t({ id: "layout.filters.select_category.youtubearchive" })}
              </MenuItem>
              <MenuItem value="additional_collections_video">
                {_t({
                  id:
                    "layout.filters.select_category.additional_collections_video"
                })}
              </MenuItem>
            </Select>
          </div>
          <div className={classes.filterContainer}>
            <Typography id="rating-min">
              {_t({ id: "layout.filters.select.minrating" })}
            </Typography>
            <Rating
              name="minRating"
              value={minRating || 0}
              precision={0.5}
              aria-labelledby="rating-min"
              onChange={(e, value): void => setMinRating(value)}
            />
            <Typography id="rating-min">
              {_t({ id: "layout.filters.select.maxrating" })}
            </Typography>
            <Rating
              name="maxRating"
              value={maxRating || 5}
              precision={0.5}
              aria-labelledby="rating-max"
              onChange={(e, value): void => setMaxRating(value)}
            />
          </div>
          <Button onClick={resetFilter} className={classes.resetFilterButton}>
            {_t({ id: "layout.filters.select.reset" })}
          </Button>
        </Card>
      ) : (
        <div className={classes.noFiltersHolder}>
          <ExpandMoreIcon onClick={(): void => setShowFilters(true)} />
        </div>
      )}
    </>
  );
};

export default Filters;
