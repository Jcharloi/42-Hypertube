import React, { useState, ReactElement } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import {
  Box,
  AppBar,
  Typography,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  OutlinedInput,
  Switch,
  Hidden
} from "@material-ui/core";
import { Search, AccountCircle, Movie, Tv } from "@material-ui/icons";

import { useHeaderStyles } from "./styles";

interface Props {
  locale: string;
  setLocale: (locale: string) => void;
  onExpand: () => void;
  onSearchChange: (query: string) => void;
  onMediaTypeChange: (newMediaType: string) => void;
  mediaType: string;
  searchQuery: string;
}

const Header = ({
  locale,
  setLocale,
  onExpand,
  onSearchChange,
  onMediaTypeChange,
  mediaType,
  searchQuery
}: Props): ReactElement => {
  const classes = useHeaderStyles({});
  const { formatMessage: _t } = useIntl();
  const [localeAnchorEl, setLocaleAnchor] = useState(undefined);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(undefined);

  const setNewLocale = (newLocale: string): void => {
    setLocale(newLocale);
    setLocaleAnchor(undefined);
  };

  const onMenuProfile = (): void => {
    setProfileMenuAnchor(undefined);
  };

  const onToggleSwitch = (): void => {
    if (mediaType === "movies") onMediaTypeChange("shows");
    else onMediaTypeChange("movies");
  };

  return (
    <AppBar color="inherit" position="sticky" className={classes.appBar}>
      <Toolbar>
        <div className={classes.linksContainer}>
          <Typography className={classes.title} variant="h6">
            <Link className={classes.titleLink} to="/">
              <Hidden smDown>{_t({ id: "title" })}</Hidden>
              <Hidden mdUp>{_t({ id: "title_short" })}</Hidden>
            </Link>
          </Typography>
          <Hidden smDown>
            <Typography className={classes.linkMedia} variant="subtitle2">
              <Link className={classes.titleLink} to="/movies">
                {_t({ id: "header.trending_movies" })}
              </Link>
            </Typography>
            <Typography className={classes.linkMedia} variant="subtitle2">
              <Link className={classes.titleLink} to="/shows">
                {_t({ id: "header.trending_shows" })}
              </Link>
            </Typography>
          </Hidden>
        </div>
        <div className={classes.headerContent}>
          <Box className={classes.toggleContent} onClick={onToggleSwitch}>
            <Hidden xsDown>
              <Tv />
              <Switch
                color="default"
                checked={mediaType === "movies"}
                classes={{
                  thumb:
                    mediaType === "movies"
                      ? classes.switchMovies
                      : classes.switchShows,
                  track:
                    mediaType === "movies"
                      ? classes.switchMovies
                      : classes.switchShows
                }}
              />
              <Movie />
            </Hidden>
            <Hidden smUp>{mediaType === "movies" ? <Movie /> : <Tv />}</Hidden>
          </Box>
          <OutlinedInput
            value={searchQuery}
            onChange={(e): void => onSearchChange(e.target.value)}
            onClick={onExpand}
            placeholder={_t({ id: "layout.filters.search" })}
            className={classes.searchInput}
            startAdornment={<Search className={classes.inputLabel} />}
            labelWidth={0}
            id="menuitem-search"
          />
          <div className={classes.buttonsMenu}>
            <IconButton
              className={classes.headerButtons}
              onClick={(e): void => setLocaleAnchor(e.currentTarget)}
            >
              <span className={classes.flagIcon}>
                {_t({ id: `language.${locale}` })}
              </span>
            </IconButton>
            <Menu
              keepMounted
              anchorEl={localeAnchorEl}
              open={!!localeAnchorEl}
              onClose={(): void => setLocaleAnchor(undefined)}
            >
              <MenuItem onClick={(): void => setNewLocale("fr")}>
                {_t({ id: "language.fr" })}
              </MenuItem>
              <MenuItem onClick={(): void => setNewLocale("en")}>
                {_t({ id: "language.en" })}
              </MenuItem>
            </Menu>
            <IconButton
              className={classes.headerButtons}
              onClick={(e): void => setProfileMenuAnchor(e.currentTarget)}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              keepMounted
              anchorEl={profileMenuAnchor}
              open={!!profileMenuAnchor}
              onClose={(): void => setProfileMenuAnchor(undefined)}
            >
              <MenuItem onClick={onMenuProfile}>
                {_t({ id: "profile" })}
              </MenuItem>
              <MenuItem onClick={onMenuProfile}>
                {_t({ id: "disconnect" })}
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
