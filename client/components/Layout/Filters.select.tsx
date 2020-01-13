import React, { ReactElement } from "react";

import { useIntl } from "react-intl";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { useFiltersStyles } from "./styles";

interface Props {
  collections: string[];
  setCollections: (value: string[]) => void;
}

const FiltersSelect = ({
  collections,
  setCollections
}: Props): ReactElement => {
  const { formatMessage: _t } = useIntl();
  const classes = useFiltersStyles({});

  return (
    <Select
      defaultValue={collections}
      displayEmpty
      renderValue={(e: string[]): string =>
        _t({ id: "layout.filters.selected_collections" }, { count: e.length })
      }
      onChange={(e): void => setCollections(e.target.value as string[])}
      multiple
      value={collections || []}
      className={classes.filtersComponent}
    >
      <MenuItem value="feature_films" id="menuitem-feature_films">
        {_t({ id: "layout.filters.select_category.feature_films" })}
      </MenuItem>
      <MenuItem value="educationalfilms" id="menuitem-educationalfilms">
        {_t({
          id: "layout.filters.select_category.educationalfilms"
        })}
      </MenuItem>
      <MenuItem value="opensource_movies" id="menuitem-opensource_movies">
        {_t({
          id: "layout.filters.select_category.opensource_movies"
        })}
      </MenuItem>
      <MenuItem value="tvarchive" id="menuitem-tvarchive">
        {_t({ id: "layout.filters.select_category.tvarchive" })}
      </MenuItem>
      <MenuItem value="classic_tv" id="menuitem-classic_tv">
        {_t({ id: "layout.filters.select_category.classic_tv" })}
      </MenuItem>
      <MenuItem value="community_media" id="menuitem-community_media">
        {_t({
          id: "layout.filters.select_category.community_media"
        })}
      </MenuItem>
      <MenuItem value="podcasts" id="menuitem-podcasts">
        {_t({ id: "layout.filters.select_category.podcasts" })}
      </MenuItem>
      <MenuItem value="youtubearchive" id="menuitem-youtubearchive">
        {_t({
          id: "layout.filters.select_category.youtubearchive"
        })}
      </MenuItem>
      <MenuItem
        value="additional_collections_video"
        id="menuitem-additional_collections_video"
      >
        {_t({
          id: "layout.filters.select_category.additional_collections_video"
        })}
      </MenuItem>
    </Select>
  );
};

export default FiltersSelect;
