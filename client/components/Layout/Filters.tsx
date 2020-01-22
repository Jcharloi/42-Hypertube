import React, { ReactElement, useState, useEffect } from "react";
import moment from "moment";
import _ from "lodash";
import qs from "qs";
import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";

import { Button, Typography, Paper, Select, MenuItem } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

import FiltersSelect from "./Filters.select";

import useDebounce from "../../hooks/useDebounce";
import history from "../../helpers/history";

import { useFiltersStyles } from "./styles";

interface Props {
  searchQuery: string;
  mediaType: string;
  onReset: () => void;
}

const Filters = ({ searchQuery, mediaType, onReset }: Props): ReactElement => {
  const classes = useFiltersStyles({});
  const location = useLocation();
  const { formatMessage: _t } = useIntl();

  const searchParams = qs.parse(location.search.slice(1));
  const [queryField, setqueryField] = useState(
    searchParams.query || searchQuery || ""
  );
  const [year, setYear] = useState(searchParams.year || "");
  const [collections, setcollections] = useState(
    searchParams.collections || []
  );
  const [minRating, setMinRating] = useState(
    Number(searchParams.minRating) || 0
  );

  const debouncedMediaType = useDebounce(mediaType, 500);
  const debouncedQueryField = useDebounce(queryField, 500);
  const debouncedYear: number = useDebounce(year, 500) as number;
  const debouncedCollections: string[] = useDebounce(
    collections,
    500
  ) as string[];
  const debouncedMinRating = useDebounce(minRating, 500);

  useEffect(() => {
    setqueryField(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const queryParams = qs.stringify({
      query: debouncedQueryField || undefined,
      collections: debouncedCollections.length
        ? debouncedCollections
        : undefined,
      year: year || undefined,
      minRating: debouncedMinRating === 0 ? undefined : debouncedMinRating
    });

    if (
      history.location.pathname === "/shows" ||
      history.location.pathname === "/movies" ||
      debouncedQueryField
    ) {
      history.push({
        pathname: `/${debouncedMediaType}`,
        search: `?${queryParams}`
      });
    }
  }, [
    debouncedMediaType,
    debouncedCollections,
    debouncedMinRating,
    debouncedQueryField,
    debouncedYear
  ]);

  const resetFilter = (): void => {
    setqueryField("");
    setYear("");
    setcollections([]);
    setMinRating(0);
    onReset();
  };

  return (
    <Paper className={classes.container}>
      {mediaType === "movies" && (
        <div>
          <Typography>
            {_t({ id: "layout.filters.production_year" })}
          </Typography>
          <Select
            value={year}
            onChange={(e): void => setYear(e.target.value)}
            className={classes.collectionsContainer}
          >
            <MenuItem
              className={classes.yearItem}
              id="menuitem-yeardefault"
              value=""
            >
              {_t({ id: "layout.filters.all" })}
            </MenuItem>
            {_.rangeRight(1900, moment().year()).map((yearSelect: number) => (
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
      )}
      <div className={classes.collectionsContainer}>
        <Typography>{_t({ id: "layout.filters.collection" })}</Typography>
        <FiltersSelect
          collections={collections}
          setCollections={(value): void => setcollections(value)}
        />
      </div>
      {mediaType === "movies" && (
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
        </div>
      )}
      <Button onClick={resetFilter} className={classes.resetFilterButton}>
        {_t({ id: "layout.filters.select.reset" })}
      </Button>
    </Paper>
  );
};

export default Filters;
