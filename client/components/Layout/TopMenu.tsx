import React, { ReactElement } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";

import { useIntl } from "react-intl";
import useStyles from "./TopMenu.styles";

import history from "../../helpers/history";

import LanguageButton from "./LanguageButton";
import { Locale } from "../../models/models";

const TopMenu = ({ locale, setLocale }: Locale): ReactElement => {
  const { formatMessage: _t } = useIntl();
  const classes = useStyles({});
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl
  ] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const menuId = "primary-search-account-menu";

  const handleProfileMenuOpen = (
    event: React.MouseEvent<HTMLElement>
  ): void => {
    setAnchorEl(event.currentTarget);
  };

  const redirectTitle = (): void => {
    history.push("/");
  };

  const handleMobileMenuClose = (): void => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>{_t({ id: "profile" })}</MenuItem>
      <MenuItem onClick={handleMenuClose}>{_t({ id: "disconnect" })}</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            onClick={(): void => redirectTitle()}
            className={classes.title}
            variant="h6"
            noWrap
          >
            {_t({ id: "title" })}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder={_t({ id: "search" })}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <LanguageButton locale={locale} setLocale={setLocale} />
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <LanguageButton locale={locale} setLocale={setLocale} />
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {/* Empty Toolbar to keep element from going underneath the <AppBar> */}
      <Toolbar />
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default TopMenu;
