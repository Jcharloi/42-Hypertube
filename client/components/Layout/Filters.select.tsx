import React, { ReactElement, ChangeEvent } from "react";
import { useIntl } from "react-intl";

import { MenuItem, Select } from "@material-ui/core";

import { useFiltersStyles } from "./styles";

interface Props {
  collections: string;
  setCollections: (value: string) => void;
  labelid: string;
}

const FiltersSelect = ({
  collections,
  setCollections,
  labelid
}: Props): ReactElement => {
  const { formatMessage: _t } = useIntl();
  const classes = useFiltersStyles({});

  return (
    <Select
      labelId={labelid}
      defaultValue={collections}
      onChange={(e: ChangeEvent<{ value: string }>): void =>
        setCollections(e.target.value)
      }
      value={collections}
      className={classes.filtersComponent}
    >
      <MenuItem value="all" id="menuitem-default">
        {_t({ id: "layout.filters.all" })}
      </MenuItem>

      <MenuItem value="Action" id="menuitem-action">
        {_t({ id: "layout.filters.select_category.action" })}
      </MenuItem>
      <MenuItem value="Adventure" id="menuitem-adventure">
        {_t({ id: "layout.filters.select_category.adventure" })}
      </MenuItem>
      <MenuItem value="Animation" id="menuitem-animation">
        {_t({ id: "layout.filters.select_category.animation" })}
      </MenuItem>
      <MenuItem value="Biography" id="menuitem-biography">
        {_t({ id: "layout.filters.select_category.biography" })}
      </MenuItem>
      <MenuItem value="Comedy" id="menuitem-comedy">
        {_t({ id: "layout.filters.select_category.comedy" })}
      </MenuItem>
      <MenuItem value="Crime" id="menuitem-crime">
        {_t({ id: "layout.filters.select_category.crime" })}
      </MenuItem>
      <MenuItem value="Documentary" id="menuitem-documentary">
        {_t({ id: "layout.filters.select_category.documentary" })}
      </MenuItem>
      <MenuItem value="Drama" id="menuitem-drama">
        {_t({ id: "layout.filters.select_category.drama" })}
      </MenuItem>
      <MenuItem value="Family" id="menuitem-family">
        {_t({ id: "layout.filters.select_category.family" })}
      </MenuItem>
      <MenuItem value="Fantasy" id="menuitem-fantasy">
        {_t({ id: "layout.filters.select_category.fantasy" })}
      </MenuItem>
      <MenuItem value="History" id="menuitem-history">
        {_t({ id: "layout.filters.select_category.history" })}
      </MenuItem>
      <MenuItem value="Horror" id="menuitem-horror">
        {_t({ id: "layout.filters.select_category.horror" })}
      </MenuItem>
      <MenuItem value="Music" id="menuitem-music">
        {_t({ id: "layout.filters.select_category.music" })}
      </MenuItem>
      <MenuItem value="Musical" id="menuitem-musical">
        {_t({ id: "layout.filters.select_category.musical" })}
      </MenuItem>
      <MenuItem value="Mystery" id="menuitem-mystery">
        {_t({ id: "layout.filters.select_category.action" })}
      </MenuItem>
      <MenuItem value="Romance" id="menuitem-romance">
        {_t({ id: "layout.filters.select_category.romance" })}
      </MenuItem>
      <MenuItem value="Sci-Fi" id="menuitem-scifi">
        {_t({ id: "layout.filters.select_category.scifi" })}
      </MenuItem>
      <MenuItem value="Sport" id="menuitem-sport">
        {_t({ id: "layout.filters.select_category.sport" })}
      </MenuItem>
      <MenuItem value="Thriller" id="menuitem-thriller">
        {_t({ id: "layout.filters.select_category.thriller" })}
      </MenuItem>
      <MenuItem value="War" id="menuitem-war">
        {_t({ id: "layout.filters.select_category.war" })}
      </MenuItem>
      <MenuItem value="Western" id="menuitem-western">
        {_t({ id: "layout.filters.select_category.western" })}
      </MenuItem>
    </Select>
  );
};

export default FiltersSelect;
