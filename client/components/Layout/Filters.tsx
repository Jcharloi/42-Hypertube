import React, { ReactElement, useState, useEffect, ChangeEvent } from "react";
import moment from "moment";
import _ from "lodash";
import qs from "qs";
import { useIntl } from "react-intl";
import { useLocation, useHistory } from "react-router-dom";

import { Button, Paper, Select, MenuItem, InputLabel } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

import FiltersSelect from "./Filters.select";

import useDebounce from "../../hooks/useDebounce";

import { useFiltersStyles } from "./styles";

interface Props {
  searchQuery: string;
  onReset: () => void;
}

const Filters = ({ searchQuery, onReset }: Props): ReactElement => {
  const classes = useFiltersStyles({});
  const location = useLocation();
  const history = useHistory();
  const { formatMessage: _t } = useIntl();

  /**
   * Filters diplayed value
   */
  const searchParams = qs.parse(location.search.slice(1));
  const [year, setYear] = useState<number>(searchParams.year || 0);
  const [collections, setcollections] = useState<string>(
    searchParams.collections || "all"
  );
  const [minRating, setMinRating] = useState<number>(
    searchParams.minRating || null
  );

  /**
   * Filters debonced value
   * (display value with a 500ms, the one we send to the api)
   */
  const debouncedQueryField = useDebounce(searchQuery, 500);
  const debouncedYear = useDebounce(year, 500);
  const debouncedCollections = useDebounce(collections, 500);
  const debouncedMinRating = useDebounce(minRating, 500);

  /**
   * Changing url
   */
  useEffect(() => {
    const queryParams = qs.stringify(
      {
        query: debouncedQueryField,
        collections:
          debouncedCollections !== "all" ? debouncedCollections : undefined,
        year: debouncedYear,
        minRating: debouncedMinRating
      },
      {
        addQueryPrefix: true,
        skipNulls: true,
        filter: (_prefix, value) => value || undefined
      }
    );

    // If we're on a search page or if one filters has been changed
    if (
      history.location.pathname === "/search" ||
      debouncedQueryField ||
      debouncedYear ||
      debouncedCollections !== "all" ||
      debouncedMinRating
    ) {
      history.push({
        pathname: `/search`,
        search: queryParams
      });
    }
  }, [
    debouncedQueryField,
    debouncedYear,
    debouncedCollections,
    debouncedMinRating
  ]);

  const resetFilter = (): void => {
    setYear(0);
    setcollections("all");
    setMinRating(null);
    // Reset all param outside of <Filters>:
    onReset();
  };

  return (
    <Paper className={classes.container}>
      {/* Production year */}
      <div>
        {/* Year */}
        <InputLabel id="production-year">
          {_t({ id: "layout.filters.production_year" })}
        </InputLabel>
        <Select
          labelId="production-year"
          value={year}
          onChange={(e: ChangeEvent<{ value: number }>): void =>
            setYear(e.target.value)
          }
          className={classes.collectionsContainer}
        >
          {/* Default year production */}
          <MenuItem
            className={classes.yearItem}
            id="menuitem-yeardefault"
            value={0}
          >
            {_t({ id: "layout.filters.all" })}
          </MenuItem>
          {/* 1900 to now */}
          {_.rangeRight(1900, moment().year() + 1).map((yearSelect: number) => (
            <MenuItem
              className={classes.yearItem}
              id={`menuitem-year${yearSelect}`}
              value={yearSelect}
              key={`menuitem-year${yearSelect}`}
            >
              {yearSelect}
            </MenuItem>
          ))}
        </Select>
      </div>

      {/* Collection */}
      <div className={classes.collectionsContainer}>
        <InputLabel id="collection">
          {_t({ id: "layout.filters.collection" })}
        </InputLabel>
        <FiltersSelect
          labelid="collection"
          collections={collections}
          setCollections={(value): void => setcollections(value)}
        />
      </div>

      {/* Rating */}
      <div className={classes.ratingContainer}>
        <div>
          <InputLabel id="rating">
            {_t({ id: "layout.filters.select.minrating" })}
          </InputLabel>
          <Rating
            defaultValue={minRating}
            value={minRating || 0}
            onChange={(e, value): void => setMinRating(value)}
            name="ratingmin"
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
