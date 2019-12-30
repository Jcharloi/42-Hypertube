import React, { ReactElement, useState, useEffect } from "react";
import moment from "moment";
import qs from "qs";
import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";

import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputBase from "@material-ui/core/InputBase";
import Rating from "@material-ui/lab/Rating";
import SearchIcon from "@material-ui/icons/Search";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import { Popper } from "@material-ui/core";
import useDebounce from "../../hooks/useDebounce";

import history from "../../helpers/history";

import { ClickAwayEventTarget } from "../../models/models";

import { useFiltersStyles } from "./styles";

import FiltersSelect from "./Filters.select";

const Filters = (): ReactElement => {
  const classes = useFiltersStyles({});
  const location = useLocation();
  const { formatMessage: _t } = useIntl();

  const searchParams = qs.parse(location.search.slice(1));
  const [queryField, setqueryField] = useState(searchParams.query || "");
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
  const [showFilters, setShowFilters] = useState(undefined);

  const debouncedQueryField = useDebounce(queryField, 500);
  const debouncedYearRange: number[] = useDebounce(yearRange, 500) as number[];
  const debouncedCollections: string[] = useDebounce(
    collections,
    500
  ) as string[];
  const debouncedMinRating = useDebounce(minRating, 500);
  const debouncedMaxRating = useDebounce(maxRating, 500);

  useEffect(() => {
    const timeout = setTimeout((): void => {
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

      history.push({
        search: `?${queryParams}`
      });
    }, 500);

    return (): void => {
      clearTimeout(timeout);
    };
  }, [queryField, yearRange, collections, minRating, maxRating]);

  const resetFilter = (): void => {
    setqueryField("");
    setYearRange([1900, moment().year()]);
    setcollections([]);
    setMinRating(0);
    setMaxRating(5);
    history.push({
      search: ""
    });
  };

  return (
    <div>
      <ClickAwayListener
        onClickAway={(e): void => {
          const {
            target: { id }
          } = (e as unknown) as ClickAwayEventTarget;
          if (!String(id).includes("menuitem")) {
            setShowFilters(undefined);
          }
        }}
      >
        <div>
          <InputBase
            defaultValue={queryField}
            aria-owns={showFilters ? "filter-popover" : undefined}
            aria-haspopup="true"
            onClick={(e): void => setShowFilters(e.currentTarget)}
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
          <Popper
            disablePortal
            anchorEl={showFilters}
            id="filter-popover"
            placement="right-end"
            open={!!showFilters}
          >
            <Paper className={classes.filterContainerTop}>
              <div>
                <Typography id="year-slider" className={classes.yearRangeLabel}>
                  {_t({ id: "layout.filters.production_year" })}
                </Typography>
                <Slider
                  defaultValue={yearRange}
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
                <FiltersSelect
                  collections={collections}
                  setCollections={(value): void => setcollections(value)}
                />
              </div>
              <div className={classes.filterContainer}>
                <Typography id="rating-min">
                  {_t({ id: "layout.filters.select.minrating" })}
                </Typography>
                <Rating
                  defaultValue={minRating}
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
                  defaultValue={maxRating}
                  name="maxRating"
                  value={maxRating || 5}
                  precision={0.5}
                  aria-labelledby="rating-max"
                  onChange={(e, value): void => setMaxRating(value)}
                />
              </div>
              <Button
                onClick={resetFilter}
                className={classes.resetFilterButton}
              >
                {_t({ id: "layout.filters.select.reset" })}
              </Button>
            </Paper>
          </Popper>
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default Filters;
