import React, { ReactElement } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { useIntl } from "react-intl";

import useStyles from "./LanguageButton.style";

import { Locale } from "../../models/models";

const LanguageButton = ({ locale, setLocale }: Locale): ReactElement => {
  const classes = useStyles({});
  const { formatMessage: _t } = useIntl();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (language: string): void => {
    setAnchorEl(null);
    if (typeof language === "string") {
      setLocale(language);
    }
  };

  return (
    <div>
      <Button
        className={classes.languageToggleButton}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {locale === "fr" ? (
          <img src="http://localhost:8080/public/fr.png" alt="fr flag"></img>
        ) : (
          <img src="http://localhost:8080/public/en.png" alt="en flag"></img>
        )}
        {console.log(locale)}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          className={classes.languageMenu}
          onClick={(): void => handleClose("fr")}
        >
          <span role="img" aria-label="france flag">
            {_t({ id: "language.fr" })}
          </span>
        </MenuItem>
        <MenuItem
          className={classes.languageMenu}
          onClick={(): void => handleClose("en")}
        >
          <span role="img" aria-label="english flag">
            {_t({ id: "language.en" })}
          </span>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default LanguageButton;
