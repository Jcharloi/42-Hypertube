import React, { ReactElement, useState, useEffect } from "react";
import moment from "moment";
import qs from "qs";
import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import useDebounce from "../../hooks/useDebounce";

import history from "../../helpers/history";

import { useFiltersStyles } from "./styles";

import FiltersSelect from "./Filters.select";

interface Props {
  searchQuery: string;
}

const Filters = ({ searchQuery }: Props): ReactElement => {
  const classes = useFiltersStyles({});
  const location = useLocation();
  const { formatMessage: _t } = useIntl();

  const searchParams = qs.parse(location.search.slice(1));
  const [queryField, setqueryField] = useState(
    searchParams.query || searchQuery
  );
  const [yearRange, setYearRange] = useState([
    Number(searchParams.startYear) || 1900,
    Number(searchParams.endYear) || moment().year()
  ]);
  const [collections, setcollections] = useState(
    searchParams.collections || []
  );
  const [minRating, setMinRating] = useState(
    Number(searchParams.minRating) || 0
  );
  const [maxRating, setMaxRating] = useState(
    Number(searchParams.maxRating) || 5
  );

  const debouncedQueryField = useDebounce(queryField, 500);
  const debouncedYearRange: number[] = useDebounce(yearRange, 500) as number[];
  const debouncedCollections: string[] = useDebounce(
    collections,
    500
  ) as string[];
  const debouncedMinRating = useDebounce(minRating, 500);
  const debouncedMaxRating = useDebounce(maxRating, 500);

  useEffect(() => {
    setqueryField(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const queryParams = qs.stringify({
      query: debouncedQueryField || undefined,
      collections: debouncedCollections.length
        ? debouncedCollections
        : undefined,
      startYear:
        debouncedYearRange?.[0] === 1900 &&
        debouncedYearRange?.[1] === moment().year()
          ? undefined
          : debouncedYearRange?.[0],
      endYear:
        debouncedYearRange?.[0] === 1900 &&
        debouncedYearRange?.[1] === moment().year()
          ? undefined
          : debouncedYearRange?.[1],
      minRating:
        debouncedMinRating === 0 && debouncedMaxRating === 5
          ? undefined
          : debouncedMinRating,
      maxRating:
        debouncedMinRating === 0 && debouncedMaxRating === 5
          ? undefined
          : debouncedMaxRating
    });
    if (history.location.pathname === "/search" || debouncedQueryField) {
      history.push({
        pathname: "/search",
        search: `?${queryParams}`
      });
    }
  }, [
    debouncedCollections,
    debouncedMaxRating,
    debouncedMinRating,
    debouncedQueryField,
    debouncedYearRange
  ]);

  const resetFilter = (): void => {
    setqueryField("");
    setYearRange([1900, moment().year()]);
    setcollections([]);
    setMinRating(0);
    setMaxRating(5);
  };

  return (
    <Paper className={classes.container}>
      <div>
        <Typography className={classes.yearRangeLabel}>
          {_t({ id: "layout.filters.production_year" })}
        </Typography>
        <Slider
          defaultValue={yearRange}
          value={yearRange || [1900, moment().year()]}
          min={1900}
          max={moment().year()}
          onChange={(e, value): void => setYearRange(value as number[])}
          valueLabelDisplay="on"
        />
      </div>
      <div className={classes.collectionsContainer}>
        <Typography>{_t({ id: "layout.filters.collection" })}</Typography>
        <FiltersSelect
          collections={collections}
          setCollections={(value): void => setcollections(value)}
        />
      </div>
      <div className={classes.ratingContainer}>
        <div>
          <Typography>
            {_t({ id: "layout.filters.select.minrating" })}
          </Typography>
          <Rating
            defaultValue={minRating}
            value={minRating || 0}
            onChange={(e, value): void => setMinRating(value)}
            name="ratingmin"
          />
        </div>
        <div>
          <Typography>
            {_t({ id: "layout.filters.select.maxrating" })}
          </Typography>
          <Rating
            name="ratingmax"
            value={maxRating || 5}
            onChange={(e, value): void => setMaxRating(value)}
          />
        </div>
      </div>
      <Button onClick={resetFilter} className={classes.resetFilterButton}>
        {_t({ id: "layout.filters.select.reset" })}
      </Button>
    </Paper>
  );
};

export default Filters;
