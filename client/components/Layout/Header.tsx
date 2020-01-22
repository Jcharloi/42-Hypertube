import React, { useState, ReactElement } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import {
  AppBar,
  Typography,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  OutlinedInput
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";

import { useHeaderStyles } from "./styles";

interface Props {
  locale: string;
  setLocale: (locale: string) => void;
  onExpand: () => void;
  onSearchChange: (query: string) => void;
}

const Header = ({
  locale,
  setLocale,
  onExpand,
  onSearchChange
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

  return (
    <AppBar color="inherit" position="sticky">
      <Toolbar>
        <Typography className={classes.title} variant="h6">
          <Link className={classes.titleLink} to="/">
            {_t({ id: "title" })}
          </Link>
        </Typography>
        <div className={classes.headerContent}>
          <OutlinedInput
            onChange={(e): void => onSearchChange(e.target.value)}
            onClick={onExpand}
            placeholder={_t({ id: "layout.filters.search" })}
            className={classes.searchInput}
            startAdornment={<SearchIcon className={classes.inputLabel} />}
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
